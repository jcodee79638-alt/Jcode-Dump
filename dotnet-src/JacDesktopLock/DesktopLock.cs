using System;
using System.IO;
using System.Security.Cryptography;
using System.Security.Principal;
using System.Text;
using System.Threading;

internal static class DesktopLock
{
	private static int Main(string[] args)
	{
		try
		{
			if (args.Length != 2 || args[0] != "transaction")
			{
				throw new InvalidDataException();
			}
			string text = Path.GetFullPath(args[1]).TrimEnd('\\');
			if (!Path.IsPathRooted(text) || text.StartsWith("\\\\", StringComparison.Ordinal))
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
			string text2;
			using (SHA256 sHA = SHA256.Create())
			{
				text2 = BitConverter.ToString(sHA.ComputeHash(Encoding.UTF8.GetBytes(text.ToUpperInvariant()))).Replace("-", "").Substring(0, 24);
			}
			string name = "Global\\JacCode.Desktop.Data." + WindowsIdentity.GetCurrent().User.Value + "." + text2;
			using (Mutex mutex = new Mutex(initiallyOwned: false, name))
			{
				bool flag = false;
				try
				{
					try
					{
						flag = mutex.WaitOne(TimeSpan.FromSeconds(5.0));
					}
					catch (AbandonedMutexException)
					{
						flag = true;
					}
					if (!flag)
					{
						throw new IOException();
					}
					Console.WriteLine("{\"ready\":true}");
					Console.Out.Flush();
					while (Console.In.ReadLine() != null)
					{
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
			Console.WriteLine("{\"ready\":false,\"message\":\"Close other Jac Code sessions and try again.\"}");
			return 1;
		}
	}
}
