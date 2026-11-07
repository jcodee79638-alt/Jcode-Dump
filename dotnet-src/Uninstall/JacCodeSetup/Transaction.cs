using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Diagnostics;
using System.IO;
using System.IO.Compression;
using System.Linq;
using System.Runtime.InteropServices;
using System.Security.Cryptography;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading;
using System.Web.Script.Serialization;
using System.Xml;
using Microsoft.Win32;

namespace JacCodeSetup;

internal static class Transaction
{
	internal const string JournalName = ".jac-transaction.json";

	private static readonly JavaScriptSerializer Json = new JavaScriptSerializer
	{
		MaxJsonLength = 1048576
	};

	[DllImport("kernel32.dll", CharSet = CharSet.Unicode, SetLastError = true)]
	private static extern bool MoveFileEx(string existing, string replacement, uint flags);

	internal static void Checkpoint(string phase)
	{
	}

	internal static T Locked<T>(string directory, Func<T> action)
	{
		using Mutex mutex = new Mutex(initiallyOwned: false, "Global\\JacCode.Install." + Core.RegistryName(directory));
		bool flag = false;
		try
		{
			try
			{
				flag = mutex.WaitOne(TimeSpan.FromSeconds(90.0));
			}
			catch (AbandonedMutexException)
			{
				flag = true;
			}
			if (!flag)
			{
				throw new IOException("Another Jac Code installation is running. Wait for it to finish and try again.");
			}
			return action();
		}
		finally
		{
			if (flag)
			{
				mutex.ReleaseMutex();
			}
		}
	}

	internal static void AtomicWrite(string filename, byte[] bytes)
	{
		Core.ValidateDirectory(Path.GetDirectoryName(filename));
		if (File.Exists(filename) && (File.GetAttributes(filename) & FileAttributes.ReparsePoint) != 0)
		{
			throw new IOException("An owned program file became a link.");
		}
		Directory.CreateDirectory(Path.GetDirectoryName(filename));
		string text = filename + "." + Guid.NewGuid().ToString("N") + ".tmp";
		try
		{
			using (FileStream fileStream = new FileStream(text, FileMode.CreateNew, FileAccess.Write, FileShare.None, 4096, FileOptions.WriteThrough))
			{
				fileStream.Write(bytes, 0, bytes.Length);
				fileStream.Flush(flushToDisk: true);
			}
			Checkpoint("atomic:" + filename);
			int num = 0;
			while (!MoveFileEx(text, filename, 9u))
			{
				int lastWin32Error = Marshal.GetLastWin32Error();
				if (File.Exists(text) || !File.Exists(filename) || !File.ReadAllBytes(filename).SequenceEqual(bytes))
				{
					if (num >= 10 || !new int[6] { 5, 32, 33, 1175, 1176, 1177 }.Contains(lastWin32Error))
					{
						throw new IOException("An application file could not be replaced safely. Save your work, close Jac Code windows and retry the installer. Your existing files are kept for repair.", new Win32Exception(lastWin32Error));
					}
					Thread.Sleep(Math.Min(50 << Math.Min(num, 4), 800));
					num++;
					continue;
				}
				break;
			}
		}
		finally
		{
			if (File.Exists(text))
			{
				File.Delete(text);
			}
		}
	}

	internal static void Preflight(string root, IEnumerable<string> files)
	{
		foreach (string item in files.Distinct(StringComparer.OrdinalIgnoreCase))
		{
			string path = Core.SafeFile(root, item);
			Core.ValidateDirectory(Path.GetDirectoryName(path));
			if (!File.Exists(path))
			{
				continue;
			}
			if ((File.GetAttributes(path) & FileAttributes.ReparsePoint) != 0)
			{
				throw new IOException("An installed file is a link. No files were changed.");
			}
			try
			{
				using (File.Open(path, FileMode.Open, FileAccess.ReadWrite, FileShare.None))
				{
				}
			}
			catch (IOException)
			{
				throw new IOException("Jac Code is still open or an application file is in use. Save your work, close Jac Code windows and terminals, then try again. No running process was closed.");
			}
		}
	}

	private static string ShortcutSnapshot(string file)
	{
		if (!File.Exists(file))
		{
			return null;
		}
		if ((File.GetAttributes(file) & FileAttributes.ReparsePoint) != 0 || new FileInfo(file).Length > 65536)
		{
			throw new IOException("The existing shortcut cannot be safely backed up.");
		}
		return Convert.ToBase64String(File.ReadAllBytes(file));
	}

	private static InstallJournal Capture(string directory)
	{
		InstallJournal installJournal = new InstallJournal();
		installJournal.Directory = directory;
		installJournal.Id = Guid.NewGuid().ToString("N");
		installJournal.StartShortcut = ShortcutSnapshot(Core.ShortcutPath(directory));
		installJournal.DesktopShortcut = ShortcutSnapshot(Core.DesktopPath(directory));
		InstallJournal installJournal2 = installJournal;
		using (RegistryKey registryKey = Registry.CurrentUser.OpenSubKey(Core.RegistrationRoot + Core.RegistryName(directory)))
		{
			if (registryKey != null)
			{
				string[] valueNames = registryKey.GetValueNames();
				foreach (string name in valueNames)
				{
					RegistryValueKind valueKind = registryKey.GetValueKind(name);
					if (valueKind != RegistryValueKind.String && valueKind != RegistryValueKind.ExpandString && valueKind != RegistryValueKind.DWord)
					{
						throw new IOException("An uninstall registration value has an unsupported type.");
					}
					installJournal2.Registration.Add(new ShellValue
					{
						Name = name,
						Value = Convert.ToString(registryKey.GetValue(name, null, RegistryValueOptions.DoNotExpandEnvironmentNames)),
						Kind = (int)valueKind
					});
				}
			}
		}
		using (RegistryKey registryKey2 = Registry.CurrentUser.OpenSubKey(Core.RunRoot))
		{
			string name2 = Core.RegistryName(directory);
			object obj = registryKey2?.GetValue(name2, null, RegistryValueOptions.DoNotExpandEnvironmentNames);
			if (obj != null)
			{
				installJournal2.StartupKind = (int)registryKey2.GetValueKind(name2);
				if (installJournal2.StartupKind != 1 && installJournal2.StartupKind != 2)
				{
					throw new IOException("The startup entry has an unsupported type.");
				}
				installJournal2.Startup = (string)obj;
			}
		}
		return installJournal2;
	}

	private static void Save(InstallJournal journal)
	{
		AtomicWrite(Path.Combine(journal.Directory, ".jac-transaction.json"), Encoding.UTF8.GetBytes(Json.Serialize(journal)));
	}

	private static string BackupRelative(InstallJournal journal, string relative)
	{
		using SHA256 sHA = SHA256.Create();
		return ".jac-backups\\" + journal.Id + "\\" + BitConverter.ToString(sHA.ComputeHash(Encoding.UTF8.GetBytes(relative.ToUpperInvariant()))).Replace("-", "").Substring(0, 32) + ".bak";
	}

	private static string Backup(InstallJournal journal, string relative)
	{
		return Core.SafeFile(journal.Directory, BackupRelative(journal, relative));
	}

	private static void Write(InstallJournal journal, string relative, byte[] bytes)
	{
		string text = Core.SafeFile(journal.Directory, relative);
		bool flag = File.Exists(text);
		if (!flag || !File.ReadAllBytes(text).SequenceEqual(bytes))
		{
			if (flag)
			{
				AtomicWrite(Backup(journal, relative), File.ReadAllBytes(text));
			}
			DirectoryInfo directoryInfo = new DirectoryInfo(Path.GetDirectoryName(text));
			while (directoryInfo != null && !string.Equals(directoryInfo.FullName, journal.Directory, StringComparison.OrdinalIgnoreCase) && !directoryInfo.Exists)
			{
				journal.CreatedDirectories.Add(directoryInfo.FullName.Substring(journal.Directory.Length + 1));
				directoryInfo = directoryInfo.Parent;
			}
			journal.Changed.Add(new FileChange
			{
				Name = relative,
				Existed = flag
			});
			Save(journal);
			AtomicWrite(text, bytes);
			Checkpoint("write:" + relative);
		}
	}

	private static void RestoreShortcut(string filename, string value)
	{
		if (value == null)
		{
			if (File.Exists(filename))
			{
				File.Delete(filename);
			}
		}
		else
		{
			AtomicWrite(filename, Convert.FromBase64String(value));
		}
	}

	internal static void Recover(string directory)
	{
		string text = Path.Combine(directory, ".jac-transaction.json");
		if (!File.Exists(text))
		{
			RemoveTemporaryFiles(directory, null);
			return;
		}
		if ((File.GetAttributes(text) & FileAttributes.ReparsePoint) != 0 || new FileInfo(text).Length > 1048576)
		{
			throw new InvalidDataException("The installation recovery record is invalid. Keep this folder for repair.");
		}
		InstallJournal installJournal = Json.Deserialize<InstallJournal>(File.ReadAllText(text));
		if (installJournal == null || !string.Equals(installJournal.Directory, directory, StringComparison.OrdinalIgnoreCase) || !Regex.IsMatch(installJournal.Id ?? "", "\\A[a-f0-9]{32}\\z"))
		{
			throw new InvalidDataException("The recovery record belongs to another installation.");
		}
		if (installJournal.Preserved == null || installJournal.Preserved.Count > 256 || installJournal.Preserved.Distinct(StringComparer.OrdinalIgnoreCase).Count() != installJournal.Preserved.Count)
		{
			throw new InvalidDataException("Invalid preserved runtime record.");
		}
		foreach (string item in installJournal.Preserved)
		{
			Core.SafeFile(directory, item);
			Core.SafeFile(directory, PreservedRelative(installJournal, item));
		}
		RemoveTemporaryFiles(directory, installJournal);
		if (installJournal.Status == "rollback-complete" || installJournal.Status == "uninstall-complete" || installJournal.Status == "install-complete")
		{
			DeleteOwnedTree(directory, ".jac-staging\\" + installJournal.Id);
			DeleteOwnedTree(directory, ".jac-backups\\" + installJournal.Id);
			RemoveCreatedDirectories(installJournal);
			if (installJournal.Status == "install-complete")
			{
				RemoveEmptyProgramDirectories(installJournal);
			}
			File.Delete(text);
			return;
		}
		Preflight(directory, installJournal.Changed.Select((FileChange file) => file.Name));
		foreach (FileChange item2 in installJournal.Changed.AsEnumerable().Reverse())
		{
			string text2 = Core.SafeFile(directory, item2.Name);
			if (item2.Existed)
			{
				string path = Backup(installJournal, item2.Name);
				Core.ValidateDirectory(Path.GetDirectoryName(path));
				if (!File.Exists(path) || (File.GetAttributes(path) & FileAttributes.ReparsePoint) != 0)
				{
					throw new IOException("An installation backup is missing. Keep the recovery record and try repair again.");
				}
				AtomicWrite(text2, File.ReadAllBytes(path));
			}
			if (!item2.Existed && File.Exists(text2))
			{
				File.Delete(text2);
			}
		}
		foreach (string item3 in installJournal.Preserved.AsEnumerable().Reverse())
		{
			string text3 = Core.SafeFile(directory, PreservedRelative(installJournal, item3));
			string text4 = Core.SafeFile(directory, item3);
			Core.ValidateDirectory(Path.GetDirectoryName(text3));
			Core.ValidateDirectory(Path.GetDirectoryName(text4));
			if (!File.Exists(text3))
			{
				if (!File.Exists(text4))
				{
					throw new IOException("A preserved repair file is missing. Keep this folder for recovery.");
				}
				continue;
			}
			if ((File.GetAttributes(text3) & FileAttributes.ReparsePoint) != 0 || File.Exists(text4))
			{
				throw new IOException("A preserved file cannot be safely restored. Keep this folder for recovery.");
			}
			Directory.CreateDirectory(Path.GetDirectoryName(text4));
			if (!MoveFileEx(text3, text4, 8u))
			{
				throw new IOException("A preserved file could not be restored safely.");
			}
		}
		if (installJournal.ShellStarted)
		{
			if (installJournal.PathPlanned)
			{
				InstallState installState = new InstallState();
				installState.Directory = directory;
				installState.PathAdded = true;
				installState.Token = directory;
				installState.PathWasMissing = installJournal.PathWasMissing;
				installState.SeparatorAdded = installJournal.SeparatorAdded;
				Core.RemovePath(installState);
			}
			if (installJournal.PathRemoved)
			{
				InstallState installState2 = new InstallState();
				installState2.Directory = directory;
				Core.AddPath(installState2, null);
			}
			Core.Unregister(directory);
			if (installJournal.Registration.Count > 0)
			{
				using RegistryKey registryKey = Registry.CurrentUser.CreateSubKey(Core.RegistrationRoot + Core.RegistryName(directory));
				foreach (ShellValue item4 in installJournal.Registration)
				{
					registryKey.SetValue(item4.Name, (item4.Kind == 4) ? ((object)int.Parse(item4.Value)) : item4.Value, (RegistryValueKind)item4.Kind);
				}
			}
			if (installJournal.Startup == null)
			{
				Core.SetStartup(directory, enabled: false);
			}
			else
			{
				using RegistryKey registryKey2 = Registry.CurrentUser.CreateSubKey(Core.RunRoot);
				registryKey2.SetValue(Core.RegistryName(directory), installJournal.Startup, (RegistryValueKind)installJournal.StartupKind);
			}
			RestoreShortcut(Core.ShortcutPath(directory), installJournal.StartShortcut);
			RestoreShortcut(Core.DesktopPath(directory), installJournal.DesktopShortcut);
		}
		installJournal.Status = "rollback-complete";
		Save(installJournal);
		DeleteOwnedTree(directory, ".jac-staging\\" + installJournal.Id);
		DeleteOwnedTree(directory, ".jac-backups\\" + installJournal.Id);
		RemoveCreatedDirectories(installJournal);
		File.Delete(text);
	}

	private static void RemoveTemporaryFiles(string directory, InstallJournal journal)
	{
		string[] reserved = new string[3] { ".jac-transaction.json", ".jac-install.xml", ".jac-current.xml" };
		IEnumerable<string> enumerable = ((journal == null) ? new string[1] { ".jac-transaction.json" } : reserved.Concat(from change in journal.Changed
			select change.Name into name
			where Allowed(name.Replace('\\', '/')) || reserved.Contains(name, StringComparer.OrdinalIgnoreCase)
			select name)).Distinct(StringComparer.OrdinalIgnoreCase);
		List<string> list = new List<string>();
		foreach (string item in enumerable)
		{
			string path = Core.SafeFile(directory, item);
			string path2 = Core.ValidateDirectory(Path.GetDirectoryName(path));
			if (!Directory.Exists(path2))
			{
				continue;
			}
			string pattern = "\\A" + Regex.Escape(Path.GetFileName(path)) + "\\.[a-f0-9]{32}\\.tmp\\z";
			foreach (string item2 in Directory.EnumerateFiles(path2, Path.GetFileName(path) + ".*.tmp"))
			{
				if (!Regex.IsMatch(Path.GetFileName(item2), pattern))
				{
					continue;
				}
				if ((File.GetAttributes(item2) & FileAttributes.ReparsePoint) != 0)
				{
					throw new IOException("An incomplete application file became a link. It was kept for safe repair.");
				}
				if (journal != null || OwnedInitialJournal(item2, directory))
				{
					list.Add(item2);
					if (list.Count > 128)
					{
						throw new IOException("Too many incomplete application files were found. They were kept for safe repair.");
					}
				}
			}
		}
		foreach (string item3 in list)
		{
			using (File.Open(item3, FileMode.Open, FileAccess.ReadWrite, FileShare.None))
			{
			}
		}
		foreach (string item4 in list)
		{
			File.Delete(item4);
		}
	}

	private static bool OwnedInitialJournal(string filename, string directory)
	{
		if (new FileInfo(filename).Length > 1048576)
		{
			return false;
		}
		try
		{
			InstallJournal installJournal = Json.Deserialize<InstallJournal>(File.ReadAllText(filename));
			return installJournal != null && string.Equals(installJournal.Directory, directory, StringComparison.OrdinalIgnoreCase) && Regex.IsMatch(installJournal.Id ?? "", "\\A[a-f0-9]{32}\\z") && installJournal.Changed != null && installJournal.Changed.Count <= 256 && installJournal.Changed.All((FileChange change) => change != null && change.Name != null && (Allowed(change.Name.Replace('\\', '/')) || change.Name == ".jac-install.xml" || change.Name == ".jac-current.xml"));
		}
		catch (ArgumentException)
		{
			return false;
		}
		catch (InvalidOperationException)
		{
			return false;
		}
	}

	private static void RemoveCreatedDirectories(InstallJournal journal)
	{
		foreach (string item in from name in journal.CreatedDirectories.Distinct(StringComparer.OrdinalIgnoreCase)
			orderby name.Length descending
			select name)
		{
			string text = Core.SafeFile(journal.Directory, item);
			Core.ValidateDirectory(text);
			if (Directory.Exists(text) && !Directory.EnumerateFileSystemEntries(text).Any())
			{
				Directory.Delete(text);
			}
		}
	}

	private static bool EmptyTree(string directory)
	{
		Core.ValidateDirectory(directory);
		if (Directory.EnumerateFiles(directory).Any())
		{
			return false;
		}
		return Directory.EnumerateDirectories(directory).All(EmptyTree);
	}

	private static bool RetiredProgramFile(string name)
	{
		string text = name.Replace('\\', '/');
		if (Regex.IsMatch(text, "\\A\\.jac-backups/[a-f0-9]{32}/[A-F0-9]{32}\\.bak\\z"))
		{
			return true;
		}
		string[] array = text.Split('/');
		if (array.Length < 3 || array[0] != "versions" || !Regex.IsMatch(array[1], "\\A(0|[1-9][0-9]*)\\.(0|[1-9][0-9]*)\\.(0|[1-9][0-9]*)\\z"))
		{
			return false;
		}
		return Allowed("versions/6.3.15/" + string.Join("/", array.Skip(2)));
	}

	private static void RemoveRetiredProgramFile(InstallJournal journal, string relative)
	{
		string path = Core.SafeFile(journal.Directory, relative);
		Core.ValidateDirectory(Path.GetDirectoryName(path));
		if (File.Exists(path))
		{
			if ((File.GetAttributes(path) & FileAttributes.ReparsePoint) != 0)
			{
				throw new IOException("An old application file became a link. It was kept for safe repair.");
			}
			AtomicWrite(Backup(journal, relative), File.ReadAllBytes(path));
			journal.Changed.Add(new FileChange
			{
				Name = relative,
				Existed = true
			});
			Save(journal);
			File.Delete(path);
			Checkpoint("remove:" + relative);
		}
	}

	private static void RemoveEmptyProgramDirectories(InstallJournal journal)
	{
		HashSet<string> hashSet = new HashSet<string>(StringComparer.OrdinalIgnoreCase);
		foreach (string item in journal.Changed.Select((FileChange change) => change.Name).Concat(new string[1] { ".jac-backups\\" + journal.Id + "\\cleanup" }))
		{
			DirectoryInfo directoryInfo = new DirectoryInfo(Path.GetDirectoryName(Core.SafeFile(journal.Directory, item)));
			while (directoryInfo != null && !string.Equals(directoryInfo.FullName, journal.Directory, StringComparison.OrdinalIgnoreCase))
			{
				hashSet.Add(directoryInfo.FullName);
				directoryInfo = directoryInfo.Parent;
			}
		}
		foreach (string item2 in hashSet.OrderByDescending((string name) => name.Length))
		{
			Core.ValidateDirectory(item2);
			if (Directory.Exists(item2) && !Directory.EnumerateFileSystemEntries(item2).Any())
			{
				Directory.Delete(item2);
			}
		}
	}

	internal static void DeleteOwnedTree(string directory, string relative)
	{
		string text = Core.SafeFile(directory, relative);
		Core.ValidateDirectory(text);
		if (!Directory.Exists(text))
		{
			return;
		}
		foreach (string item in Directory.EnumerateDirectories(text))
		{
			DeleteOwnedTree(directory, item.Substring(directory.Length + 1));
		}
		foreach (string item2 in Directory.EnumerateFiles(text))
		{
			if ((File.GetAttributes(item2) & FileAttributes.ReparsePoint) != 0)
			{
				throw new IOException("A linked file was kept during cleanup.");
			}
			File.Delete(item2);
		}
		Directory.Delete(text);
	}

	private static string PreservedRelative(InstallJournal journal, string relative)
	{
		if (string.IsNullOrEmpty(relative) || relative.Length > 1024 || relative.Contains("/") || relative.Contains(":") || relative.Split('\\').Any((string part) => part.Length == 0 || part == "." || part == ".." || part.EndsWith(".") || part.EndsWith(" ")) || !Regex.IsMatch(relative, "\\Aversions\\\\[0-9]{1,5}\\.[0-9]{1,5}\\.[0-9]{1,5}\\\\.+\\z"))
		{
			throw new InvalidDataException("Invalid preserved runtime path.");
		}
		return ".jac-preserved\\" + journal.Id + "\\" + relative;
	}

	private static List<string> UnexpectedRuntimeFiles(string directory, Dictionary<string, byte[]> files)
	{
		List<string> result = new List<string>();
		int visited = 0;
		Action<string, int> visit = null;
		visit = delegate(string relative, int depth)
		{
			string text = Core.SafeFile(directory, relative);
			Core.ValidateDirectory(text);
			if (!Directory.Exists(text))
			{
				return;
			}
			foreach (string item in Directory.EnumerateFileSystemEntries(text))
			{
				if (++visited > 256 || depth > 12)
				{
					throw new IOException("Too many unexpected runtime files. Keep this folder and contact Jac for repair.");
				}
				FileAttributes attributes = File.GetAttributes(item);
				if ((attributes & FileAttributes.ReparsePoint) != 0)
				{
					throw new IOException("A runtime file is a link. No files were changed.");
				}
				string text2 = relative + "\\" + Path.GetFileName(item);
				if ((attributes & FileAttributes.Directory) != 0)
				{
					visit(text2, depth + 1);
				}
				else if (!files.ContainsKey(text2))
				{
					result.Add(text2);
				}
			}
		};
		visit("versions\\6.3.15", 0);
		return result;
	}

	private static void PreserveUnexpected(InstallJournal journal, string relative)
	{
		string text = Core.SafeFile(journal.Directory, relative);
		string text2 = Core.SafeFile(journal.Directory, PreservedRelative(journal, relative));
		Core.ValidateDirectory(Path.GetDirectoryName(text));
		Core.ValidateDirectory(Path.GetDirectoryName(text2));
		if ((File.GetAttributes(text) & FileAttributes.ReparsePoint) != 0)
		{
			throw new IOException("A runtime file became a link. It was kept for safe repair.");
		}
		DirectoryInfo directoryInfo = new DirectoryInfo(Path.GetDirectoryName(text2));
		while (directoryInfo != null && !string.Equals(directoryInfo.FullName, journal.Directory, StringComparison.OrdinalIgnoreCase) && !directoryInfo.Exists)
		{
			journal.CreatedDirectories.Add(directoryInfo.FullName.Substring(journal.Directory.Length + 1));
			directoryInfo = directoryInfo.Parent;
		}
		Directory.CreateDirectory(Path.GetDirectoryName(text2));
		journal.Preserved.Add(relative);
		Save(journal);
		if (!MoveFileEx(text, text2, 8u))
		{
			throw new IOException("An unexpected runtime file is in use. Close Jac Code and retry repair.");
		}
		Checkpoint("preserve:" + relative);
	}

	internal static void Install(string requested, Stream payload, bool? desktop, bool? startup, Action<int, string> progress)
	{
		string directory = Core.ValidateDirectory(requested);
		Locked(directory, delegate
		{
			Recover(directory);
			InstallState installState = InstallState.Load(Path.Combine(directory, ".jac-install.xml"), directory);
			if (File.Exists(Path.Combine(directory, "jac.exe")) && Version.TryParse(FileVersionInfo.GetVersionInfo(Path.Combine(directory, "jac.exe")).FileVersion, out var result) && result > new Version("6.3.15.0"))
			{
				throw new IOException("A newer Jac Code version is installed. This installer cannot downgrade it.");
			}
			if (installState == null && Directory.Exists(directory) && !EmptyTree(directory))
			{
				throw new IOException("Choose an empty folder or an existing Jac Code installation.");
			}
			StartupPolicy startupPolicy = ((!startup.HasValue) ? Core.DefaultStartup(directory, installState) : (startup.Value ? StartupPolicy.Enabled : StartupPolicy.Disabled));
			InstallState state = new InstallState
			{
				Directory = directory,
				Legacy = false,
				Desktop = (desktop ?? (installState == null || installState.Legacy || installState.Desktop)),
				Startup = (startupPolicy == StartupPolicy.Enabled)
			};
			Dictionary<string, byte[]> files = ReadPayload(payload);
			List<string> list = UnexpectedRuntimeFiles(directory, files);
			string[] retired = ((installState == null) ? new string[0] : installState.Files.Where((string file) => !files.ContainsKey(file) && RetiredProgramFile(file)).Distinct(StringComparer.OrdinalIgnoreCase).ToArray());
			Preflight(directory, files.Keys.Concat((installState == null) ? Enumerable.Empty<string>() : installState.Files.AsEnumerable()).Concat(list).Concat(new string[2] { ".jac-install.xml", ".jac-current.xml" }));
			Directory.CreateDirectory(directory);
			InstallJournal installJournal = Capture(directory);
			Save(installJournal);
			try
			{
				progress(12, "Preparing your desktop workspace");
				foreach (string item in list)
				{
					PreserveUnexpected(installJournal, item);
				}
				foreach (KeyValuePair<string, byte[]> item2 in files)
				{
					Write(installJournal, item2.Key, item2.Value);
				}
				string[] array = retired;
				foreach (string relative in array)
				{
					RemoveRetiredProgramFile(installJournal, relative);
				}
				progress(70, "Keeping your command and shortcuts ready");
				using (RegistryKey registryKey = Registry.CurrentUser.OpenSubKey(Core.EnvironmentRoot))
				{
					RegistryValueKind kind;
					bool missing;
					string text = ((registryKey == null) ? "" : Core.ReadPath(registryKey, out kind, out missing));
					installJournal.PathPlanned = !text.Split(';').Any((string token) => string.Equals(Environment.ExpandEnvironmentVariables(token.Trim().Trim('"')).TrimEnd('\\'), directory, StringComparison.OrdinalIgnoreCase));
					installJournal.PathWasMissing = registryKey == null || !registryKey.GetValueNames().Contains("Path", StringComparer.OrdinalIgnoreCase);
					installJournal.SeparatorAdded = text.Length > 0 && !text.EndsWith(";", StringComparison.Ordinal);
				}
				installJournal.ShellStarted = true;
				Save(installJournal);
				Core.AddPath(state, installState);
				Core.Register(directory);
				Core.CreateShortcut(directory);
				if (state.Desktop)
				{
					Core.CreateShortcut(directory, Core.DesktopPath(directory));
				}
				if (!state.Desktop && installState != null && installState.Desktop && Core.OwnsShortcut(directory, Core.DesktopPath(directory)))
				{
					File.Delete(Core.DesktopPath(directory));
				}
				Core.SetStartupPolicy(directory, startupPolicy);
				Checkpoint("shell");
				state.Files.AddRange(files.Keys);
				if (installState != null)
				{
					state.Files.AddRange(installState.Files.Where((string file) => !state.Files.Contains(file, StringComparer.OrdinalIgnoreCase) && !retired.Contains(file, StringComparer.OrdinalIgnoreCase)));
				}
				if (!state.Files.Contains(".jac-current.xml", StringComparer.OrdinalIgnoreCase))
				{
					state.Files.Add(".jac-current.xml");
				}
				byte[] bytes = Encoding.UTF8.GetBytes("<JacCodeCurrent version=\"6.3.15\" />");
				Write(installJournal, ".jac-current.xml", bytes);
				Write(installJournal, ".jac-install.xml", state.Bytes());
				Checkpoint("published");
				installJournal.Status = "install-complete";
				Save(installJournal);
				Checkpoint("committed");
				Recover(directory);
				Core.RepairPinnedShortcuts(directory);
				progress(100, "Jac Code is ready");
			}
			catch
			{
				Recover(directory);
				throw;
			}
			return true;
		});
	}

	internal static void Uninstall(string requested)
	{
		string directory = Core.ValidateDirectory(requested);
		Locked(directory, delegate
		{
			Recover(directory);
			InstallState installState = InstallState.Load(Path.Combine(directory, ".jac-install.xml"), directory);
			if (installState == null)
			{
				throw new IOException("No installation record was found. No program files were removed.");
			}
			string[] array = installState.Files.Where((string file) => !file.Equals("Uninstall.exe", StringComparison.OrdinalIgnoreCase)).Distinct(StringComparer.OrdinalIgnoreCase).ToArray();
			Preflight(directory, array.Concat(new string[1] { ".jac-install.xml" }));
			InstallJournal installJournal = Capture(directory);
			Save(installJournal);
			try
			{
				string[] array2 = array;
				foreach (string text in array2)
				{
					string path = Core.SafeFile(directory, text);
					if (File.Exists(path))
					{
						AtomicWrite(Backup(installJournal, text), File.ReadAllBytes(path));
						installJournal.Changed.Add(new FileChange
						{
							Name = text,
							Existed = true
						});
						Save(installJournal);
						File.Delete(path);
						Checkpoint("remove:" + text);
					}
				}
				using (RegistryKey registryKey = Registry.CurrentUser.OpenSubKey(Core.EnvironmentRoot))
				{
					installJournal.PathRemoved = installState.PathAdded && registryKey != null && Core.ReadPath(registryKey, out var _, out var _).Split(';').Contains(installState.Token, StringComparer.Ordinal);
				}
				installJournal.ShellStarted = true;
				Save(installJournal);
				Core.RemovePath(installState);
				Core.SetStartup(directory, enabled: false);
				Core.Unregister(directory);
				string[] array3 = new string[2]
				{
					Core.ShortcutPath(directory),
					Core.DesktopPath(directory)
				};
				foreach (string text2 in array3)
				{
					if (Core.OwnsShortcut(directory, text2))
					{
						File.Delete(text2);
					}
				}
				InstallState installState2 = new InstallState
				{
					Directory = directory,
					Legacy = false,
					Desktop = false,
					Startup = false
				};
				installState2.Files.Add("Uninstall.exe");
				Write(installJournal, ".jac-install.xml", installState2.Bytes());
				Checkpoint("uninstalled");
				installJournal.Status = "uninstall-complete";
				Save(installJournal);
				DeleteOwnedTree(directory, ".jac-backups\\" + installJournal.Id);
				File.Delete(Path.Combine(directory, ".jac-transaction.json"));
				foreach (string item in from text3 in array.Select((string file) => Path.GetDirectoryName(Core.SafeFile(directory, file))).Distinct()
					orderby text3.Length descending
					select text3)
				{
					if (Directory.Exists(item) && !Directory.EnumerateFileSystemEntries(item).Any())
					{
						Directory.Delete(item);
					}
				}
			}
			catch
			{
				Recover(directory);
				throw;
			}
			return true;
		});
	}

	private static Dictionary<string, byte[]> ReadPayload(Stream payload)
	{
		Dictionary<string, byte[]> dictionary = new Dictionary<string, byte[]>(StringComparer.OrdinalIgnoreCase);
		using (ZipArchive zipArchive = new ZipArchive(payload, ZipArchiveMode.Read))
		{
			ZipArchiveEntry entry = zipArchive.GetEntry("payload-manifest.xml");
			if (entry == null || entry.Length > 1048576)
			{
				throw new InvalidDataException("The public payload manifest is missing.");
			}
			XmlDocument xmlDocument = new XmlDocument();
			using (Stream input = entry.Open())
			{
				using XmlReader reader = XmlReader.Create(input, new XmlReaderSettings
				{
					DtdProcessing = DtdProcessing.Prohibit,
					XmlResolver = null
				});
				xmlDocument.Load(reader);
			}
			if (xmlDocument.DocumentElement == null || xmlDocument.DocumentElement.Name != "JacCodePayload" || xmlDocument.DocumentElement.GetAttribute("version") != "6.3.15")
			{
				throw new InvalidDataException("The payload version is invalid.");
			}
			long num = 0L;
			foreach (XmlElement item in xmlDocument.DocumentElement.SelectNodes("File"))
			{
				string attribute = item.GetAttribute("path");
				if (!Allowed(attribute) || dictionary.ContainsKey(attribute))
				{
					throw new InvalidDataException("The package contains an unexpected or duplicate public path.");
				}
				ZipArchiveEntry entry2 = zipArchive.GetEntry(attribute);
				if (!long.TryParse(item.GetAttribute("size"), out var result) || result < 0 || result > 536870912 || entry2 == null || entry2.Length != result)
				{
					throw new InvalidDataException("A package file has an invalid size.");
				}
				num += result;
				if (num > 1073741824)
				{
					throw new InvalidDataException("The expanded package is too large.");
				}
				using Stream stream = entry2.Open();
				using MemoryStream memoryStream = new MemoryStream();
				stream.CopyTo(memoryStream);
				byte[] array = memoryStream.ToArray();
				using (SHA256 sHA = SHA256.Create())
				{
					if (BitConverter.ToString(sHA.ComputeHash(array)).Replace("-", "").ToLowerInvariant() != item.GetAttribute("sha256"))
					{
						throw new InvalidDataException("A public payload file failed verification.");
					}
				}
				dictionary.Add(attribute.Replace('/', '\\'), array);
			}
			if (zipArchive.Entries.Count != dictionary.Count + 1 || zipArchive.Entries.Select((ZipArchiveEntry zipArchiveEntry) => zipArchiveEntry.FullName).Distinct(StringComparer.OrdinalIgnoreCase).Count() != zipArchive.Entries.Count)
			{
				throw new InvalidDataException("Unexpected or duplicate archive entries.");
			}
		}
		string[] array2 = new string[15]
		{
			"jac.exe", "JacAuth.exe", "Uninstall.exe", "jac.ico", "versions\\6.3.15\\Jac Code.exe", "versions\\6.3.15\\resources\\app.asar", "versions\\6.3.15\\resources\\jac-engine.exe", "versions\\6.3.15\\resources\\JacAuth.exe", "versions\\6.3.15\\resources\\JacDesktopLock.exe", "versions\\6.3.15\\resources\\JacDesktopUpdate.exe",
			"versions\\6.3.15\\resources\\JacAttachmentGuard.exe", "versions\\6.3.15\\resources\\JacProjectRun.exe", "legal\\OpenCode-LICENSE.txt", "legal\\attachments\\PDFJS-LICENSE.txt", "legal\\attachments\\FFLATE-LICENSE.txt"
		};
		foreach (string text in array2)
		{
			if (!dictionary.ContainsKey(text))
			{
				throw new InvalidDataException("A required application file is missing: " + text);
			}
		}
		return dictionary;
	}

	internal static bool Allowed(string name)
	{
		if (string.IsNullOrWhiteSpace(name) || name.Contains("\\") || name.Contains(":") || name.Split('/').Any((string part) => part == ".." || part == "." || part.Length == 0 || part.StartsWith(".")))
		{
			return false;
		}
		if (new string[11]
		{
			"jac.exe", "JacAuth.exe", "Uninstall.exe", "jac.ico", "GETTING-STARTED.txt", "legal/OpenCode-LICENSE.txt", "legal/NOTICE.txt", "legal/THIRD-PARTY-NOTICES.txt", "legal/DEPENDENCIES.json", "legal/attachments/PDFJS-LICENSE.txt",
			"legal/attachments/FFLATE-LICENSE.txt"
		}.Contains(name, StringComparer.Ordinal))
		{
			return true;
		}
		string text = "versions/6.3.15/";
		if (!name.StartsWith(text, StringComparison.Ordinal))
		{
			return false;
		}
		string text2 = name.Substring(text.Length);
		switch (text2)
		{
		case "resources/client-integrity.json":
		case "resources/app.asar":
		case "resources/jac-engine.exe":
		case "resources/JacAuth.exe":
		case "resources/JacDesktopLock.exe":
		case "resources/JacDesktopUpdate.exe":
		case "resources/JacAttachmentGuard.exe":
		case "resources/JacProjectRun.exe":
			return true;
		default:
			if (text2.StartsWith("resources/app.asar.unpacked/", StringComparison.Ordinal))
			{
				return false;
			}
			if (text2.StartsWith("locales/", StringComparison.Ordinal))
			{
				return Regex.IsMatch(text2, "\\Alocales/[A-Za-z0-9_-]+\\.pak\\z");
			}
			return new string[20]
			{
				"Jac Code.exe", "chrome_100_percent.pak", "chrome_200_percent.pak", "d3dcompiler_47.dll", "dxcompiler.dll", "dxil.dll", "electron_wer.dll", "ffmpeg.dll", "icudtl.dat", "libEGL.dll",
				"libGLESv2.dll", "LICENSE", "LICENSES.chromium.html", "resources.pak", "snapshot_blob.bin", "v8_context_snapshot.bin", "version", "vk_swiftshader.dll", "vk_swiftshader_icd.json", "vulkan-1.dll"
			}.Contains(text2, StringComparer.Ordinal);
		}
	}
}
