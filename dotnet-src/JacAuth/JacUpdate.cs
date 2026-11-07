using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Runtime.InteropServices;
using System.Security.Cryptography;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading;
using System.Web.Script.Serialization;

internal static class JacUpdate
{
	private struct SecurityAttributes
	{
		internal int Length;

		internal IntPtr Descriptor;

		[MarshalAs(UnmanagedType.Bool)]
		internal bool Inherit;
	}

	[StructLayout(LayoutKind.Sequential, CharSet = CharSet.Unicode)]
	private struct StartupInfo
	{
		internal int Size;

		internal string Reserved;

		internal string Desktop;

		internal string Title;

		internal int X;

		internal int Y;

		internal int Width;

		internal int Height;

		internal int XChars;

		internal int YChars;

		internal int Fill;

		internal int Flags;

		internal short Show;

		internal short ReservedSize;

		internal IntPtr ReservedBytes;

		internal IntPtr Input;

		internal IntPtr Output;

		internal IntPtr Error;
	}

	private struct ProcessInformation
	{
		internal IntPtr Process;

		internal IntPtr Thread;

		internal int Id;

		internal int ThreadId;
	}

	private static readonly JavaScriptSerializer Json = new JavaScriptSerializer
	{
		MaxJsonLength = 65536
	};

	[DllImport("kernel32.dll", CharSet = CharSet.Unicode, SetLastError = true)]
	private static extern IntPtr CreateFile(string name, uint access, uint share, ref SecurityAttributes security, uint disposition, uint flags, IntPtr template);

	[DllImport("kernel32.dll", CharSet = CharSet.Unicode, SetLastError = true)]
	private static extern bool CreateProcess(string application, StringBuilder command, IntPtr processAttributes, IntPtr threadAttributes, bool inherit, uint flags, IntPtr environment, string directory, ref StartupInfo startup, out ProcessInformation information);

	[DllImport("kernel32.dll")]
	private static extern bool CloseHandle(IntPtr handle);

	[DllImport("kernel32.dll")]
	private static extern bool FreeConsole();

	[DllImport("kernel32.dll", SetLastError = true)]
	private static extern bool AttachConsole(uint processId);

	internal static string Quote(string value)
	{
		StringBuilder stringBuilder = new StringBuilder("\"");
		int num = 0;
		foreach (char c in value)
		{
			switch (c)
			{
			case '\\':
				num++;
				break;
			case '"':
				stringBuilder.Append('\\', num * 2 + 1);
				stringBuilder.Append('"');
				num = 0;
				break;
			default:
				stringBuilder.Append('\\', num);
				num = 0;
				stringBuilder.Append(c);
				break;
			}
		}
		stringBuilder.Append('\\', num * 2);
		stringBuilder.Append('"');
		return stringBuilder.ToString();
	}

	private static Dictionary<string, object> Read()
	{
		string text = Console.In.ReadLine();
		if (text == null || text.Length > 65536)
		{
			throw new InvalidDataException();
		}
		if (!(Json.DeserializeObject(text) is Dictionary<string, object> result))
		{
			throw new InvalidDataException();
		}
		return result;
	}

	private static string LocalDirectory(string value)
	{
		string text = Path.GetFullPath(value).TrimEnd('\\');
		if (!Path.IsPathRooted(text) || text.StartsWith("\\\\", StringComparison.Ordinal) || text.IndexOf(';') >= 0 || text.IndexOf('"') >= 0 || !Directory.Exists(text))
		{
			throw new InvalidDataException();
		}
		for (DirectoryInfo directoryInfo = new DirectoryInfo(text); directoryInfo != null; directoryInfo = directoryInfo.Parent)
		{
			if (directoryInfo.Exists && (directoryInfo.Attributes & FileAttributes.ReparsePoint) != 0)
			{
				throw new InvalidDataException();
			}
		}
		return text;
	}

	internal static int Run()
	{
		IntPtr intPtr = new IntPtr(-1);
		IntPtr intPtr2 = new IntPtr(-1);
		Mutex mutex = null;
		bool flag = false;
		try
		{
			Dictionary<string, object> dictionary = Read();
			if ((string)dictionary["op"] != "prepare")
			{
				throw new InvalidDataException();
			}
			string text = LocalDirectory(Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location));
			string b = Path.GetFullPath(Path.GetTempPath()).TrimEnd('\\');
			if (!string.Equals(Path.GetDirectoryName(text), b, StringComparison.OrdinalIgnoreCase) || !Path.GetFileName(text).StartsWith("jac-update-", StringComparison.Ordinal))
			{
				throw new InvalidDataException();
			}
			string text2 = LocalDirectory((string)dictionary["directory"]);
			if (!File.Exists(Path.Combine(text2, ".jac-install.xml")))
			{
				throw new InvalidDataException();
			}
			string fullPath = Path.GetFullPath((string)dictionary["installer"]);
			if (!string.Equals(fullPath, Path.Combine(text, "verified-installer.exe"), StringComparison.OrdinalIgnoreCase) || (File.GetAttributes(fullPath) & FileAttributes.ReparsePoint) != 0)
			{
				throw new InvalidDataException();
			}
			string text3 = (string)dictionary["sha256"];
			string text4 = (string)dictionary["version"];
			long num = Convert.ToInt64(dictionary["size"]);
			if (!Regex.IsMatch(text3, "\\A[a-f0-9]{64}\\z") || !Regex.IsMatch(text4, "\\A(0|[1-9][0-9]{0,5})\\.(0|[1-9][0-9]{0,5})\\.(0|[1-9][0-9]{0,5})\\z") || num < 1 || num > 209715200)
			{
				throw new InvalidDataException();
			}
			string[] array = ((object[])dictionary["args"]).Select((object value) => (value as string) ?? throwArgument()).ToArray();
			string fullPath2 = Path.GetFullPath((string)dictionary["cwd"]);
			string text5 = Path.Combine(text2, "jac.exe");
			string text6 = Quote(text5) + ((array.Length == 0) ? "" : (" " + string.Join(" ", array.Select(Quote))));
			if (array.Length > 128 || text6.Length > 30000 || array.Any((string value) => value.IndexOf('\0') >= 0) || !Directory.Exists(fullPath2))
			{
				throw new InvalidDataException();
			}
			using (Process process = Process.GetProcessById(Convert.ToInt32(dictionary["parentPid"])))
			{
				using FileStream fileStream = new FileStream(fullPath, FileMode.Open, FileAccess.Read, FileShare.Read);
				_ = process.Handle;
				if (process.Id == Process.GetCurrentProcess().Id || !string.Equals(process.MainModule.FileName, text5, StringComparison.OrdinalIgnoreCase) || fileStream.Length != num)
				{
					throw new InvalidDataException();
				}
				using (SHA256 sHA = SHA256.Create())
				{
					if (BitConverter.ToString(sHA.ComputeHash(fileStream)).Replace("-", "").ToLowerInvariant() != text3)
					{
						throw new InvalidDataException();
					}
				}
				FreeConsole();
				if (!AttachConsole((uint)process.Id))
				{
					throw new InvalidDataException();
				}
				SecurityAttributes security = new SecurityAttributes
				{
					Length = Marshal.SizeOf(typeof(SecurityAttributes)),
					Inherit = true
				};
				intPtr = CreateFile("CONIN$", 3221225472u, 3u, ref security, 3u, 0u, IntPtr.Zero);
				intPtr2 = CreateFile("CONOUT$", 3221225472u, 3u, ref security, 3u, 0u, IntPtr.Zero);
				if (intPtr == new IntPtr(-1) || intPtr2 == new IntPtr(-1))
				{
					throw new InvalidDataException();
				}
				Console.Out.WriteLine("{\"prepared\":true}");
				Console.Out.Flush();
				if ((string)Read()["op"] != "commit")
				{
					throw new InvalidDataException();
				}
				Console.Out.WriteLine("{\"committed\":true}");
				Console.Out.Flush();
				if (!process.WaitForExit(30000))
				{
					throw new InvalidDataException();
				}
				string text7;
				using (SHA256 sHA2 = SHA256.Create())
				{
					text7 = BitConverter.ToString(sHA2.ComputeHash(Encoding.UTF8.GetBytes(text2.ToUpperInvariant()))).Replace("-", "").Substring(0, 20);
				}
				mutex = new Mutex(initiallyOwned: false, "Global\\JacCode.Update." + text7);
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
					throw new InvalidDataException();
				}
				if (!AtLeast(text5, text4))
				{
					ProcessStartInfo processStartInfo = new ProcessStartInfo();
					processStartInfo.FileName = fullPath;
					processStartInfo.Arguments = "/S " + Quote("/DIR=" + text2);
					processStartInfo.UseShellExecute = false;
					processStartInfo.CreateNoWindow = true;
					processStartInfo.WorkingDirectory = text;
					using Process process2 = Process.Start(processStartInfo);
					if (process2 == null)
					{
						throw new InvalidDataException();
					}
					process2.WaitForExit();
					if (process2.ExitCode != 0)
					{
						throw new InvalidDataException();
					}
				}
			}
			if (!AtLeast(text5, text4))
			{
				throw new InvalidDataException();
			}
			StartupInfo startup = new StartupInfo
			{
				Size = Marshal.SizeOf(typeof(StartupInfo)),
				Flags = 256,
				Input = intPtr,
				Output = intPtr2,
				Error = intPtr2
			};
			if (!CreateProcess(text5, new StringBuilder(text6), IntPtr.Zero, IntPtr.Zero, inherit: true, 0u, IntPtr.Zero, fullPath2, ref startup, out var information))
			{
				throw new InvalidDataException();
			}
			CloseHandle(information.Thread);
			CloseHandle(information.Process);
			try
			{
				File.Delete(fullPath);
			}
			catch (IOException)
			{
			}
			catch (UnauthorizedAccessException)
			{
			}
			return 0;
		}
		catch
		{
			Console.Error.WriteLine("Jac Code update could not finish. Your projects and chats are kept. Close other Jac Code processes, check your connection and permissions, then run jac again. Your existing installation remains available for repair.");
			return 1;
		}
		finally
		{
			if (flag)
			{
				mutex.ReleaseMutex();
			}
			mutex?.Dispose();
			if (intPtr != new IntPtr(-1))
			{
				CloseHandle(intPtr);
			}
			if (intPtr2 != new IntPtr(-1))
			{
				CloseHandle(intPtr2);
			}
		}
	}

	private static bool AtLeast(string binary, string version)
	{
		if (Version.TryParse(FileVersionInfo.GetVersionInfo(binary).FileVersion, out var result) && Version.TryParse(version, out var result2))
		{
			return result.CompareTo(result2) >= 0;
		}
		return false;
	}

	private static string throwArgument()
	{
		throw new InvalidDataException();
	}
}
