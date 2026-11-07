using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Security.Cryptography;
using System.Text;
using System.Text.RegularExpressions;
using System.Web.Script.Serialization;
using System.Windows.Forms;

namespace JacCodeSetup;

internal static class DesktopUpdate
{
	private static readonly JavaScriptSerializer Json = new JavaScriptSerializer
	{
		MaxJsonLength = 65536
	};

	private static void Reply(object value)
	{
		Console.Out.WriteLine(Json.Serialize(value));
		Console.Out.Flush();
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

	private static void ReadLaunch(Dictionary<string, object> request, out string command, out string cwd, out bool background)
	{
		string[] array = ((object[])request["args"]).Select((object value) => (value as string) ?? InvalidArgument()).ToArray();
		command = string.Join(" ", array.Select(DesktopCommon.Quote));
		cwd = Path.GetFullPath((string)request["cwd"]);
		if (!Directory.Exists(cwd) || array.Length > 128 || command.Length > 30000 || array.Any((string value) => value.IndexOf('\0') >= 0))
		{
			throw new InvalidDataException();
		}
		background = array.SequenceEqual(new string[1] { "--startup" });
	}

	[STAThread]
	private static int Main(string[] args)
	{
		bool flag = false;
		bool flag2 = false;
		bool background = false;
		UpdateProgress updateProgress = null;
		try
		{
			Console.SetIn(new StreamReader(Console.OpenStandardInput(), new UTF8Encoding(encoderShouldEmitUTF8Identifier: false)));
			StreamWriter streamWriter = new StreamWriter(Console.OpenStandardOutput(), new UTF8Encoding(encoderShouldEmitUTF8Identifier: false));
			streamWriter.AutoFlush = true;
			Console.SetOut(streamWriter);
			if (args.Length == 3 && args[0] == "startup")
			{
				string root = Core.ValidateDirectory(args[1]);
				if (!new string[5] { "enable", "disable", "status", "migrate-enable", "migrate-disable" }.Contains(args[2]))
				{
					throw new InvalidDataException();
				}
				return DesktopCommon.Locked(root, delegate
				{
					if (File.Exists(Path.Combine(root, ".jac-transaction.json")))
					{
						throw new InvalidDataException();
					}
					string fullPath2 = Path.GetFullPath(Assembly.GetExecutingAssembly().Location);
					if (!string.Equals(fullPath2, Path.Combine(Path.GetDirectoryName(DesktopCommon.Current(root)), "resources", "JacDesktopUpdate.exe"), StringComparison.OrdinalIgnoreCase))
					{
						throw new InvalidDataException();
					}
					if (args[2] == "enable" || args[2] == "disable")
					{
						Core.SetStartupPolicy(root, (args[2] == "enable") ? StartupPolicy.Enabled : StartupPolicy.Disabled);
					}
					if (args[2] == "migrate-enable" || args[2] == "migrate-disable")
					{
						Core.MigrateStartup(root, args[2] == "migrate-enable");
					}
					Reply(new
					{
						enabled = Core.StartupEnabled(root),
						pending = Core.StartupPending(root)
					});
					return 0;
				});
			}
			if (args.Length != 1 || args[0] != "update")
			{
				throw new InvalidDataException();
			}
			Dictionary<string, object> request = Read();
			string[] array = new string[10] { "op", "parentPid", "enginePid", "directory", "installer", "size", "sha256", "version", "args", "cwd" };
			if (request.Count != array.Length || array.Any((string key) => !request.ContainsKey(key)) || (string)request["op"] != "prepare")
			{
				throw new InvalidDataException();
			}
			string directory = Core.ValidateDirectory((string)request["directory"]);
			string text = DesktopCommon.Current(directory);
			string path = Core.ValidateDirectory(Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location));
			string b = Path.GetFullPath(Path.GetTempPath()).TrimEnd('\\');
			if (!string.Equals(Path.GetDirectoryName(path), b, StringComparison.OrdinalIgnoreCase) || !Path.GetFileName(path).StartsWith("jac-update-", StringComparison.Ordinal))
			{
				throw new InvalidDataException();
			}
			string fullPath = Path.GetFullPath((string)request["installer"]);
			string text2 = Core.ValidateDirectory(Path.GetDirectoryName(fullPath));
			if (!string.Equals(Path.GetDirectoryName(text2), b, StringComparison.OrdinalIgnoreCase) || !Path.GetFileName(text2).StartsWith("jac-update-", StringComparison.Ordinal) || !string.Equals(Path.GetFileName(fullPath), "verified-installer.exe", StringComparison.Ordinal) || (File.GetAttributes(fullPath) & FileAttributes.ReparsePoint) != 0)
			{
				throw new InvalidDataException();
			}
			string text3 = (string)request["version"];
			string text4 = (string)request["sha256"];
			long num = Convert.ToInt64(request["size"]);
			if (!DesktopCommon.Version(text3) || !Regex.IsMatch(text4, "\\A[a-f0-9]{64}\\z") || num < 1 || num > 209715200)
			{
				throw new InvalidDataException();
			}
			ReadLaunch(request, out var command, out var cwd, out background);
			using (Process process = Process.GetProcessById(Convert.ToInt32(request["parentPid"])))
			{
				using Process process2 = Process.GetProcessById(Convert.ToInt32(request["enginePid"]));
				using FileStream fileStream = new FileStream(fullPath, FileMode.Open, FileAccess.Read, FileShare.Read);
				_ = process.Handle;
				_ = process2.Handle;
				if (!string.Equals(process.MainModule.FileName, text, StringComparison.OrdinalIgnoreCase) || !string.Equals(process2.MainModule.FileName, Path.Combine(Path.GetDirectoryName(text), "resources", "jac-engine.exe"), StringComparison.OrdinalIgnoreCase) || DesktopCommon.ParentId(process2) != process.Id || process.Id == Process.GetCurrentProcess().Id || process2.Id == process.Id || fileStream.Length != num)
				{
					throw new InvalidDataException();
				}
				using (SHA256 sHA = SHA256.Create())
				{
					if (BitConverter.ToString(sHA.ComputeHash(fileStream)).Replace("-", "").ToLowerInvariant() != text4)
					{
						throw new InvalidDataException();
					}
				}
				Reply(new
				{
					ready = true
				});
				Dictionary<string, object> dictionary = Read();
				if ((string)dictionary["op"] != "commit")
				{
					throw new InvalidDataException();
				}
				if (dictionary.Count == 3 && dictionary.ContainsKey("args") && dictionary.ContainsKey("cwd"))
				{
					ReadLaunch(dictionary, out command, out cwd, out background);
				}
				else if (dictionary.Count != 1)
				{
					throw new InvalidDataException();
				}
				flag = true;
				Reply(new
				{
					committed = true
				});
				if (!process.WaitForExit(300000) || !process2.WaitForExit(300000))
				{
					throw new IOException("Jac Code is still open. Save your work, close its windows and try the update again.");
				}
				if (!background)
				{
					Application.EnableVisualStyles();
					Application.SetCompatibleTextRenderingDefault(defaultValue: false);
					updateProgress = new UpdateProgress();
					updateProgress.Show();
					Application.DoEvents();
				}
				ProcessStartInfo processStartInfo = new ProcessStartInfo();
				processStartInfo.FileName = fullPath;
				processStartInfo.Arguments = "/S " + DesktopCommon.Quote("/DIR=" + directory);
				processStartInfo.UseShellExecute = false;
				processStartInfo.CreateNoWindow = true;
				processStartInfo.WorkingDirectory = text2;
				using (Process process3 = Process.Start(processStartInfo))
				{
					if (process3 == null)
					{
						throw new IOException();
					}
					if (updateProgress == null)
					{
						process3.WaitForExit();
					}
					else
					{
						while (!process3.WaitForExit(75))
						{
							Application.DoEvents();
						}
					}
					if (process3.ExitCode != 0)
					{
						throw new IOException("The update could not replace application files. Close other Jac Code windows, then retry the verified installer.");
					}
				}
				if (!Version.TryParse(FileVersionInfo.GetVersionInfo(Path.Combine(directory, "jac.exe")).FileVersion, out var result) || !Version.TryParse(text3, out var expected) || result < expected)
				{
					throw new IOException("The update needs repair. Run the verified installer again.");
				}
				DesktopCommon.Locked(directory, delegate
				{
					string path2 = DesktopCommon.Current(directory);
					if (File.Exists(Path.Combine(directory, ".jac-transaction.json")) || !Version.TryParse(Path.GetFileName(Path.GetDirectoryName(path2)), out var result2) || result2 < expected)
					{
						throw new IOException();
					}
					return 0;
				});
				flag2 = true;
			}
			if (updateProgress != null)
			{
				updateProgress.Opening();
				Application.DoEvents();
			}
			ProcessStartInfo processStartInfo2 = new ProcessStartInfo();
			processStartInfo2.FileName = Path.Combine(directory, "jac.exe");
			processStartInfo2.Arguments = command;
			processStartInfo2.WorkingDirectory = cwd;
			processStartInfo2.UseShellExecute = false;
			using (Process process4 = Process.Start(processStartInfo2))
			{
				if (process4 == null)
				{
					throw new IOException();
				}
			}
			return 0;
		}
		catch
		{
			if (updateProgress != null)
			{
				updateProgress.Dispose();
				updateProgress = null;
			}
			string text5 = (flag2 ? "Jac Code was updated successfully, but could not reopen automatically. Open Jac Code from your desktop or Start menu. Your projects, chats and sign-in are kept." : "Jac Code could not finish this operation. Your projects, chats and sign-in are kept. Close other Jac Code windows and retry, or run the latest installer to repair the app.");
			if (flag && !background)
			{
				MessageBox.Show(text5, "Jac Code update", MessageBoxButtons.OK, MessageBoxIcon.Asterisk);
			}
			if (!flag)
			{
				Reply(new
				{
					ready = false,
					message = text5
				});
			}
			return 1;
		}
		finally
		{
			updateProgress?.Dispose();
		}
	}

	private static string InvalidArgument()
	{
		throw new InvalidDataException();
	}
}
