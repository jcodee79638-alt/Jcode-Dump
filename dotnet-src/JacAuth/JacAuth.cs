using System;
using System.Collections.Generic;
using System.IO;
using System.Management;
using System.Security.AccessControl;
using System.Security.Cryptography;
using System.Security.Principal;
using System.Text;
using System.Threading;
using System.Web.Script.Serialization;
using Microsoft.Win32;

internal static class JacAuth
{
	private const string Origin = "https://jaccoder-private-gateway.jaccoder-private-gateway.workers.dev";

	private static readonly byte[] Entropy = Encoding.UTF8.GetBytes("JacCode.Auth.v2.CurrentUser");

	private static readonly JavaScriptSerializer Json = new JavaScriptSerializer
	{
		MaxJsonLength = 131072
	};

	private static void Reply(object value)
	{
		Console.Out.WriteLine(Json.Serialize(value));
		Console.Out.Flush();
	}

	private static Dictionary<string, object> Read(string line)
	{
		if (line == null || line.Length > 131072)
		{
			throw new InvalidDataException();
		}
		if (!(Json.DeserializeObject(line) is Dictionary<string, object> result))
		{
			throw new InvalidDataException();
		}
		return result;
	}

	private static string DirectoryPath(string[] args)
	{
		if (args.Length == 1)
		{
			return Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData), "JacCode", "Auth");
		}
		if (args.Length != 3 || args[1] != "--test-directory")
		{
			throw new InvalidDataException();
		}
		string text = Path.GetFullPath(args[2]).TrimEnd(Path.DirectorySeparatorChar);
		string text2 = Path.GetFullPath(Path.GetTempPath()).TrimEnd(Path.DirectorySeparatorChar) + Path.DirectorySeparatorChar;
		if (!text.StartsWith(text2 + "jac-auth-test-", StringComparison.OrdinalIgnoreCase) || !string.Equals(Path.GetDirectoryName(text) + Path.DirectorySeparatorChar, text2, StringComparison.OrdinalIgnoreCase))
		{
			throw new InvalidDataException();
		}
		return text;
	}

	private static void ProtectDirectory(string directory)
	{
		for (DirectoryInfo directoryInfo = new DirectoryInfo(directory); directoryInfo != null; directoryInfo = directoryInfo.Parent)
		{
			if (directoryInfo.Exists && (directoryInfo.Attributes & FileAttributes.ReparsePoint) != 0)
			{
				throw new InvalidDataException();
			}
		}
		Directory.CreateDirectory(directory);
		DirectorySecurity directorySecurity = new DirectorySecurity();
		directorySecurity.SetAccessRuleProtection(isProtected: true, preserveInheritance: false);
		directorySecurity.SetOwner(WindowsIdentity.GetCurrent().User);
		directorySecurity.AddAccessRule(new FileSystemAccessRule(WindowsIdentity.GetCurrent().User, FileSystemRights.FullControl, InheritanceFlags.ContainerInherit | InheritanceFlags.ObjectInherit, PropagationFlags.None, AccessControlType.Allow));
		new DirectoryInfo(directory).SetAccessControl(directorySecurity);
	}

	private static object Load(string filename)
	{
		if (!File.Exists(filename))
		{
			return null;
		}
		if ((File.GetAttributes(filename) & FileAttributes.ReparsePoint) != 0 || new FileInfo(filename).Length > 131072)
		{
			throw new InvalidDataException();
		}
		byte[] array = null;
		try
		{
			array = ProtectedData.Unprotect(File.ReadAllBytes(filename), Entropy, DataProtectionScope.CurrentUser);
			return Json.DeserializeObject(Encoding.UTF8.GetString(array));
		}
		catch (CryptographicException)
		{
			File.Delete(filename);
			return null;
		}
		catch (ArgumentException)
		{
			File.Delete(filename);
			return null;
		}
		finally
		{
			if (array != null)
			{
				Array.Clear(array, 0, array.Length);
			}
		}
	}

	private static void Save(string filename, object value)
	{
		if (value == null)
		{
			if (File.Exists(filename))
			{
				File.Delete(filename);
			}
			return;
		}
		byte[] bytes = Encoding.UTF8.GetBytes(Json.Serialize(value));
		byte[] array;
		try
		{
			array = ProtectedData.Protect(bytes, Entropy, DataProtectionScope.CurrentUser);
		}
		finally
		{
			Array.Clear(bytes, 0, bytes.Length);
		}
		string text = filename + "." + Guid.NewGuid().ToString("N") + ".tmp";
		try
		{
			using (FileStream fileStream = new FileStream(text, FileMode.CreateNew, FileAccess.Write, FileShare.None, 4096, FileOptions.WriteThrough))
			{
				fileStream.Write(array, 0, array.Length);
				fileStream.Flush(flushToDisk: true);
			}
			if (File.Exists(filename))
			{
				File.Replace(text, filename, null);
			}
			else
			{
				File.Move(text, filename);
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

	private static int Main(string[] args)
	{
		try
		{
			if (args.Length == 1 && args[0] == "update")
			{
				Console.SetIn(new StreamReader(Console.OpenStandardInput(), new UTF8Encoding(encoderShouldEmitUTF8Identifier: false)));
				StreamWriter streamWriter = new StreamWriter(Console.OpenStandardOutput(), new UTF8Encoding(encoderShouldEmitUTF8Identifier: false));
				streamWriter.AutoFlush = true;
				Console.SetOut(streamWriter);
				return JacUpdate.Run();
			}
			Console.InputEncoding = new UTF8Encoding(encoderShouldEmitUTF8Identifier: false);
			Console.OutputEncoding = new UTF8Encoding(encoderShouldEmitUTF8Identifier: false);
			if (args.Length >= 1 && args[0] == "device")
			{
				string text = DirectoryPath(args);
				ProtectDirectory(text);
				string text2;
				if (args.Length == 3)
				{
					text2 = "synthetic-device:" + text;
				}
				else
				{
					using RegistryKey registryKey = RegistryKey.OpenBaseKey(RegistryHive.LocalMachine, RegistryView.Registry64);
					using RegistryKey registryKey2 = registryKey.OpenSubKey("SOFTWARE\\Microsoft\\Cryptography", writable: false);
					string input = ((registryKey2 == null) ? null : (registryKey2.GetValue("MachineGuid") as string));
					if (!Guid.TryParse(input, out var result))
					{
						throw new InvalidDataException();
					}
					text2 = result.ToString("D");
				}
				string text3;
				using (SHA256 sHA = SHA256.Create())
				{
					text3 = BitConverter.ToString(sHA.ComputeHash(Encoding.UTF8.GetBytes("JacCode.Device.v1:" + text2))).Replace("-", "").ToLowerInvariant();
				}
				string text4 = text2;
				if (args.Length == 1)
				{
					try
					{
						using ManagementObjectSearcher managementObjectSearcher = new ManagementObjectSearcher("SELECT UUID FROM Win32_ComputerSystemProduct");
						managementObjectSearcher.Options.Timeout = TimeSpan.FromSeconds(2.0);
						using ManagementObjectCollection managementObjectCollection = managementObjectSearcher.Get();
						foreach (ManagementObject item in managementObjectCollection)
						{
							using (item)
							{
								if (Guid.TryParse(item["UUID"] as string, out var result2) && result2 != Guid.Empty && result2.ToString("N") != new string('f', 32))
								{
									text4 = result2.ToString("D");
									break;
								}
							}
						}
					}
					catch
					{
					}
				}
				string hardware;
				using (SHA256 sHA2 = SHA256.Create())
				{
					hardware = BitConverter.ToString(sHA2.ComputeHash(Encoding.UTF8.GetBytes("JacCode.Hardware.v1:" + text4 + ":" + text2))).Replace("-", "").ToLowerInvariant();
				}
				string text5 = Path.Combine(text, "device-id.txt");
				if (File.Exists(text5) && ((File.GetAttributes(text5) & FileAttributes.ReparsePoint) != 0 || new FileInfo(text5).Length > 128))
				{
					throw new InvalidDataException();
				}
				if (!File.Exists(text5) || File.ReadAllText(text5).Trim() != text3)
				{
					File.WriteAllText(text5, text3 + "\r\n", new UTF8Encoding(encoderShouldEmitUTF8Identifier: false));
				}
				Reply(new
				{
					ok = true,
					device = text3,
					hardware = hardware
				});
				return 0;
			}
			if (args.Length < 1 || (args[0] != "transaction" && args[0] != "mcp-config" && args[0] != "mcp-auth"))
			{
				return 1;
			}
			string text6 = DirectoryPath(args);
			string value = WindowsIdentity.GetCurrent().User.Value;
			string text7;
			using (SHA256 sHA3 = SHA256.Create())
			{
				text7 = BitConverter.ToString(sHA3.ComputeHash(Encoding.UTF8.GetBytes(text6.ToUpperInvariant()))).Replace("-", "").Substring(0, 24);
			}
			using (Mutex mutex = new Mutex(initiallyOwned: false, "Global\\JacCode.Auth." + value + "." + text7))
			{
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
						return 1;
					}
					ProtectDirectory(text6);
					string filename = Path.Combine(text6, (args[0] == "transaction") ? "session.dpapi" : (args[0] + ".dpapi"));
					Reply(new
					{
						ok = true,
						value = Load(filename)
					});
					string line;
					while ((line = Console.In.ReadLine()) != null)
					{
						Dictionary<string, object> dictionary = Read(line);
						if (!dictionary.ContainsKey("op") || (string)dictionary["op"] != "save" || !dictionary.ContainsKey("value"))
						{
							throw new InvalidDataException();
						}
						Save(filename, dictionary["value"]);
						Reply(new
						{
							ok = true
						});
					}
				}
				finally
				{
					if (flag)
					{
						mutex.ReleaseMutex();
					}
				}
			}
			return 0;
		}
		catch
		{
			Reply(new
			{
				ok = false
			});
			return 1;
		}
	}
}
