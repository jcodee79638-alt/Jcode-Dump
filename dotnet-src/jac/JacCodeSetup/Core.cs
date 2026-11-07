using System;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Runtime.InteropServices;
using System.Security.Cryptography;
using System.Security.Principal;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading;
using Microsoft.Win32;

namespace JacCodeSetup;

internal static class Core
{
	internal const string StateName = ".jac-install.xml";

	internal const string Version = "6.3.15";

	internal const string PointerName = ".jac-current.xml";

	private const string UninstallRoot = "Software\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\";

	private const string StartupPolicyName = "JacCodeStartupPolicy";

	internal static string RegistrationRoot => "Software\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\";

	internal static string RunRoot => "Software\\Microsoft\\Windows\\CurrentVersion\\Run";

	internal static string EnvironmentRoot => "Environment";

	internal static string PinnedDirectory => Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData), "Microsoft\\Internet Explorer\\Quick Launch\\User Pinned\\TaskBar");

	[DllImport("user32.dll", CharSet = CharSet.Unicode, SetLastError = true)]
	private static extern IntPtr SendMessageTimeout(IntPtr window, uint message, IntPtr wParam, string lParam, uint flags, uint timeout, out IntPtr result);

	internal static void BroadcastEnvironment()
	{
		SendMessageTimeout(new IntPtr(65535), 26u, IntPtr.Zero, "Environment", 2u, 5000u, out var _);
	}

	internal static string ValidateDirectory(string input)
	{
		string text = Path.GetFullPath(Environment.ExpandEnvironmentVariables(input.Trim().Trim('"'))).TrimEnd('\\');
		if (!Path.IsPathRooted(text) || text.IndexOf(';') >= 0 || text.IndexOf('"') >= 0 || text.StartsWith("\\\\", StringComparison.Ordinal))
		{
			throw new ArgumentException("Choose a local folder with no semicolon or quotation mark.");
		}
		if (string.Equals(text, Path.GetPathRoot(text).TrimEnd('\\'), StringComparison.OrdinalIgnoreCase))
		{
			throw new ArgumentException("Choose an application folder, not a drive root.");
		}
		string[] array = new string[5]
		{
			Environment.GetFolderPath(Environment.SpecialFolder.Windows),
			Environment.GetFolderPath(Environment.SpecialFolder.UserProfile),
			Environment.GetFolderPath(Environment.SpecialFolder.ProgramFiles),
			Environment.GetFolderPath(Environment.SpecialFolder.ProgramFilesX86),
			Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData)
		};
		foreach (string text2 in array)
		{
			if (!string.IsNullOrEmpty(text2) && string.Equals(text, text2.TrimEnd('\\'), StringComparison.OrdinalIgnoreCase))
			{
				throw new ArgumentException("Choose a dedicated Jac Code application folder.");
			}
		}
		for (DirectoryInfo directoryInfo = new DirectoryInfo(text); directoryInfo != null; directoryInfo = directoryInfo.Parent)
		{
			if (directoryInfo.Exists && (directoryInfo.Attributes & FileAttributes.ReparsePoint) != 0)
			{
				throw new IOException("Choose an installation folder without symbolic links or junctions.");
			}
		}
		return text;
	}

	internal static string SafeFile(string directory, string relative)
	{
		if (string.IsNullOrWhiteSpace(relative) || Path.IsPathRooted(relative))
		{
			throw new InvalidDataException("An invalid package path was found.");
		}
		string fullPath = Path.GetFullPath(Path.Combine(directory, relative));
		if (!fullPath.StartsWith(directory.TrimEnd('\\') + "\\", StringComparison.OrdinalIgnoreCase))
		{
			throw new InvalidDataException("A package path leaves the installation folder.");
		}
		return fullPath;
	}

	internal static string RegistryName(string directory)
	{
		using SHA256 sHA = SHA256.Create();
		return "JacCode_" + BitConverter.ToString(sHA.ComputeHash(Encoding.UTF8.GetBytes(directory.ToUpperInvariant()))).Replace("-", "").Substring(0, 20);
	}

	internal static string ReadPath(RegistryKey environment, out RegistryValueKind kind, out bool missing)
	{
		missing = !environment.GetValueNames().Contains("Path", StringComparer.OrdinalIgnoreCase);
		kind = (missing ? RegistryValueKind.ExpandString : environment.GetValueKind("Path"));
		if (!missing && kind != RegistryValueKind.String && kind != RegistryValueKind.ExpandString)
		{
			throw new InvalidDataException("Your user PATH is not a string. It has been left unchanged.");
		}
		return (string)environment.GetValue("Path", "", RegistryValueOptions.DoNotExpandEnvironmentNames);
	}

	private static string ComparablePath(string token)
	{
		if (string.IsNullOrWhiteSpace(token))
		{
			return "";
		}
		string text = Environment.ExpandEnvironmentVariables(token.Trim().Trim('"')).TrimEnd('\\', '/');
		try
		{
			return Path.GetFullPath(text);
		}
		catch (ArgumentException)
		{
			return text;
		}
		catch (NotSupportedException)
		{
			return text;
		}
		catch (PathTooLongException)
		{
			return text;
		}
	}

	internal static bool AddPath(InstallState state, InstallState previous)
	{
		return PathLocked(() => AddPathLocked(state, previous));
	}

	private static T PathLocked<T>(Func<T> action)
	{
		using Mutex mutex = new Mutex(initiallyOwned: false, "Global\\JacCode.UserPath." + WindowsIdentity.GetCurrent().User.Value);
		bool flag = false;
		try
		{
			try
			{
				flag = mutex.WaitOne(TimeSpan.FromSeconds(35.0));
			}
			catch (AbandonedMutexException)
			{
				flag = true;
			}
			if (!flag)
			{
				throw new IOException("Another application is updating the Jac Code command. Try again shortly.");
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

	private static bool AddPathLocked(InstallState state, InstallState previous)
	{
		using (RegistryKey registryKey = Registry.CurrentUser.CreateSubKey(EnvironmentRoot))
		{
			RegistryValueKind kind;
			bool missing;
			string text = ReadPath(registryKey, out kind, out missing);
			if (previous != null && previous.PathAdded && text.Split(';').Contains(previous.Token, StringComparer.Ordinal))
			{
				state.PathAdded = true;
				state.PathWasMissing = previous.PathWasMissing;
				state.SeparatorAdded = previous.SeparatorAdded;
				state.Token = previous.Token;
				return false;
			}
			if (text.Split(';').Any((string token) => string.Equals(ComparablePath(token), state.Directory, StringComparison.OrdinalIgnoreCase)))
			{
				return false;
			}
			state.PathAdded = true;
			state.PathWasMissing = missing;
			state.SeparatorAdded = text.Length > 0 && !text.EndsWith(";", StringComparison.Ordinal);
			state.Token = state.Directory;
			registryKey.SetValue("Path", text + (state.SeparatorAdded ? ";" : "") + state.Token, kind);
		}
		BroadcastEnvironment();
		return true;
	}

	internal static void RemovePath(InstallState state)
	{
		PathLocked(delegate
		{
			RemovePathLocked(state);
			return true;
		});
	}

	private static void RemovePathLocked(InstallState state)
	{
		if (!state.PathAdded)
		{
			return;
		}
		using (RegistryKey registryKey = Registry.CurrentUser.OpenSubKey(EnvironmentRoot, writable: true))
		{
			if (registryKey == null)
			{
				return;
			}
			RegistryValueKind kind;
			bool missing;
			string text = ReadPath(registryKey, out kind, out missing);
			string text2 = RemoveOwnedToken(text, state);
			if (string.Equals(text2, text, StringComparison.Ordinal))
			{
				return;
			}
			if (text2.Length == 0 && state.PathWasMissing)
			{
				registryKey.DeleteValue("Path", throwOnMissingValue: false);
			}
			else
			{
				registryKey.SetValue("Path", text2, kind);
			}
		}
		BroadcastEnvironment();
	}

	internal static string RemoveOwnedToken(string raw, InstallState state)
	{
		if (!state.PathAdded || string.IsNullOrEmpty(state.Token))
		{
			return raw;
		}
		int num = 0;
		string[] array = raw.Split(';');
		foreach (string text in array)
		{
			if (string.Equals(text, state.Token, StringComparison.Ordinal))
			{
				int num2 = num;
				int num3 = text.Length;
				if (state.SeparatorAdded && num2 > 0)
				{
					num2--;
					num3++;
				}
				else if (num + text.Length < raw.Length)
				{
					num3++;
				}
				return raw.Remove(num2, num3);
			}
			num += text.Length + 1;
		}
		return raw;
	}

	internal static void Register(string directory)
	{
		using RegistryKey registryKey = Registry.CurrentUser.CreateSubKey(RegistrationRoot + RegistryName(directory));
		registryKey.SetValue("DisplayName", "Jac Code");
		registryKey.SetValue("DisplayVersion", "6.3.15");
		registryKey.SetValue("Publisher", "Jac Code");
		registryKey.SetValue("InstallLocation", directory);
		registryKey.SetValue("DisplayIcon", Path.Combine(directory, "jac.ico"));
		registryKey.SetValue("UninstallString", "\"" + Path.Combine(directory, "Uninstall.exe") + "\"");
		registryKey.SetValue("QuietUninstallString", "\"" + Path.Combine(directory, "Uninstall.exe") + "\" /S");
		registryKey.SetValue("NoModify", 1, RegistryValueKind.DWord);
		registryKey.SetValue("NoRepair", 1, RegistryValueKind.DWord);
	}

	internal static void Unregister(string directory)
	{
		Registry.CurrentUser.DeleteSubKeyTree(RegistrationRoot + RegistryName(directory), throwOnMissingSubKey: false);
	}

	internal static string ShortcutPath(string directory)
	{
		return Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.StartMenu), "Programs", "Jac Code " + RegistryName(directory).Substring(8, 6) + ".lnk");
	}

	internal static string DesktopPath(string directory)
	{
		return Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.DesktopDirectory), "Jac Code " + RegistryName(directory).Substring(8, 6) + ".lnk");
	}

	internal static string StartupCommand(string directory)
	{
		return "\"" + Path.Combine(directory, "jac.exe") + "\" --startup";
	}

	private static object StartupEntry(string directory)
	{
		using RegistryKey registryKey = Registry.CurrentUser.OpenSubKey(RunRoot);
		return registryKey?.GetValue(RegistryName(directory), null, RegistryValueOptions.DoNotExpandEnvironmentNames);
	}

	internal static bool StartupEnabled(string directory)
	{
		return object.Equals(StartupEntry(directory), StartupCommand(directory));
	}

	internal static bool StartupPending(string directory)
	{
		using RegistryKey registryKey = Registry.CurrentUser.OpenSubKey(RegistrationRoot + RegistryName(directory));
		return registryKey != null && object.Equals(registryKey.GetValue("JacCodeStartupPolicy"), 2);
	}

	internal static StartupPolicy DefaultStartup(string directory, InstallState previous)
	{
		object obj = StartupEntry(directory);
		if (obj != null)
		{
			if (!object.Equals(obj, StartupCommand(directory)))
			{
				return StartupPolicy.Disabled;
			}
			return StartupPolicy.Enabled;
		}
		if (previous == null || previous.Legacy)
		{
			return StartupPolicy.Enabled;
		}
		using (RegistryKey registryKey = Registry.CurrentUser.OpenSubKey(RegistrationRoot + RegistryName(directory)))
		{
			object obj2 = registryKey?.GetValue("JacCodeStartupPolicy");
			if (obj2 != null)
			{
				return object.Equals(obj2, 2) ? StartupPolicy.Pending : StartupPolicy.Disabled;
			}
		}
		string text = Path.Combine(directory, "jac.exe");
		if (previous.Startup || !File.Exists(text) || !(FileVersionInfo.GetVersionInfo(text).FileVersion == "6.3.12.0"))
		{
			return StartupPolicy.Disabled;
		}
		return StartupPolicy.Pending;
	}

	internal static void SetStartupPolicy(string directory, StartupPolicy policy)
	{
		using RegistryKey registryKey = Registry.CurrentUser.OpenSubKey(RegistrationRoot + RegistryName(directory), writable: true);
		if (registryKey == null)
		{
			throw new IOException("The Jac Code installation registration could not be found.");
		}
		bool enabled = StartupEnabled(directory);
		SetStartup(directory, policy == StartupPolicy.Enabled);
		try
		{
			registryKey.SetValue("JacCodeStartupPolicy", (int)policy, RegistryValueKind.DWord);
		}
		catch
		{
			SetStartup(directory, enabled);
			throw;
		}
	}

	internal static void MigrateStartup(string directory, bool enabled)
	{
		if (StartupPending(directory))
		{
			object obj = StartupEntry(directory);
			SetStartupPolicy(directory, (enabled && (obj == null || object.Equals(obj, StartupCommand(directory)))) ? StartupPolicy.Enabled : StartupPolicy.Disabled);
		}
	}

	internal static void SetStartup(string directory, bool enabled)
	{
		using RegistryKey registryKey = (enabled ? Registry.CurrentUser.CreateSubKey(RunRoot) : Registry.CurrentUser.OpenSubKey(RunRoot, writable: true));
		if (registryKey == null)
		{
			return;
		}
		string name = RegistryName(directory);
		object value = registryKey.GetValue(name, null, RegistryValueOptions.DoNotExpandEnvironmentNames);
		if (enabled)
		{
			if (value != null && !object.Equals(value, StartupCommand(directory)))
			{
				throw new IOException("The sign-in startup entry was changed outside Jac Code. It has been kept.");
			}
			registryKey.SetValue(name, StartupCommand(directory), RegistryValueKind.String);
		}
		if (!enabled && object.Equals(value, StartupCommand(directory)))
		{
			registryKey.DeleteValue(name, throwOnMissingValue: false);
		}
	}

	internal static void CreateShortcut(string directory)
	{
		CreateShortcut(directory, ShortcutPath(directory));
	}

	internal static void CreateShortcut(string directory, string shortcutPath)
	{
		Directory.CreateDirectory(Path.GetDirectoryName(shortcutPath));
		if (File.Exists(shortcutPath) && (File.GetAttributes(shortcutPath) & FileAttributes.ReparsePoint) != 0)
		{
			throw new IOException("A Jac Code shortcut is a symbolic link.");
		}
		if (File.Exists(shortcutPath) && !OwnsShortcut(directory, shortcutPath))
		{
			throw new IOException("A Jac Code shortcut was changed outside this installation. It has been kept.");
		}
		ShellShortcut.Brand(directory, shortcutPath, create: true);
	}

	internal static bool OwnsShortcut(string directory, string shortcutPath)
	{
		if (!File.Exists(shortcutPath))
		{
			return false;
		}
		if ((File.GetAttributes(shortcutPath) & FileAttributes.ReparsePoint) != 0)
		{
			return false;
		}
		return string.Equals(ShellShortcut.Target(shortcutPath), Path.Combine(directory, "jac.exe"), StringComparison.OrdinalIgnoreCase);
	}

	internal static int RepairPinnedShortcuts(string directory)
	{
		try
		{
			directory = ValidateDirectory(directory);
			if (!Directory.Exists(PinnedDirectory))
			{
				return 0;
			}
			for (DirectoryInfo directoryInfo = new DirectoryInfo(PinnedDirectory); directoryInfo != null; directoryInfo = directoryInfo.Parent)
			{
				if ((directoryInfo.Attributes & FileAttributes.ReparsePoint) != 0)
				{
					return 0;
				}
			}
			string[] array = Directory.EnumerateFiles(PinnedDirectory, "*.lnk", SearchOption.TopDirectoryOnly).Take(257).ToArray();
			if (array.Length > 256)
			{
				return 0;
			}
			int num = 0;
			string[] array2 = array;
			foreach (string text in array2)
			{
				try
				{
					if ((File.GetAttributes(text) & FileAttributes.ReparsePoint) == 0 && new FileInfo(text).Length <= 65536)
					{
						string text2 = ShellShortcut.Target(text);
						string text3 = directory.TrimEnd('\\') + "\\versions\\";
						string[] array3 = (text2.StartsWith(text3, StringComparison.OrdinalIgnoreCase) ? text2.Substring(text3.Length).Split('\\') : new string[0]);
						if ((string.Equals(text2, Path.Combine(directory, "jac.exe"), StringComparison.OrdinalIgnoreCase) || (array3.Length == 2 && Regex.IsMatch(array3[0], "^(0|[1-9][0-9]*)\\.(0|[1-9][0-9]*)\\.(0|[1-9][0-9]*)$") && string.Equals(array3[1], "Jac Code.exe", StringComparison.OrdinalIgnoreCase))) && ShellShortcut.Brand(directory, text, create: false))
						{
							num++;
						}
					}
				}
				catch (IOException)
				{
				}
				catch (UnauthorizedAccessException)
				{
				}
				catch (COMException)
				{
				}
				catch (TargetInvocationException)
				{
				}
			}
			return num;
		}
		catch (Exception)
		{
			return 0;
		}
	}
}
