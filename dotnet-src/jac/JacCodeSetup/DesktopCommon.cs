using System;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading;
using System.Xml;

namespace JacCodeSetup;

internal static class DesktopCommon
{
	private struct BasicInformation
	{
		internal IntPtr ExitStatus;

		internal IntPtr PebBaseAddress;

		internal IntPtr AffinityMask;

		internal IntPtr BasePriority;

		internal IntPtr UniqueProcessId;

		internal IntPtr ParentProcessId;
	}

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

	internal static bool Version(string value)
	{
		if (Regex.IsMatch(value ?? "", "\\A(0|[1-9][0-9]{0,4})\\.(0|[1-9][0-9]{0,4})\\.(0|[1-9][0-9]{0,4})\\z"))
		{
			return value.Split('.').All((string part) => int.Parse(part) <= 65535);
		}
		return false;
	}

	internal static string Current(string directory)
	{
		InstallState installState = InstallState.Load(Path.Combine(directory, ".jac-install.xml"), directory);
		if (installState == null)
		{
			throw new IOException("Jac Code needs repair. Run the latest installer and choose this folder.");
		}
		XmlDocument xmlDocument = new XmlDocument();
		using (XmlReader reader = XmlReader.Create(Path.Combine(directory, ".jac-current.xml"), new XmlReaderSettings
		{
			DtdProcessing = DtdProcessing.Prohibit,
			XmlResolver = null
		}))
		{
			xmlDocument.Load(reader);
		}
		string text = ((xmlDocument.DocumentElement == null) ? "" : xmlDocument.DocumentElement.GetAttribute("version"));
		if (xmlDocument.DocumentElement == null || xmlDocument.DocumentElement.Name != "JacCodeCurrent" || !Version(text))
		{
			throw new InvalidDataException("Jac Code needs repair. The current version record is invalid.");
		}
		string text2 = "versions\\" + text + "\\Jac Code.exe";
		if (!installState.Files.Contains(text2, StringComparer.OrdinalIgnoreCase))
		{
			throw new InvalidDataException("The desktop is not owned by this installation.");
		}
		string text3 = Core.SafeFile(directory, text2);
		Core.ValidateDirectory(Path.GetDirectoryName(text3));
		if (!File.Exists(text3) || (File.GetAttributes(text3) & FileAttributes.ReparsePoint) != 0)
		{
			throw new IOException("The desktop could not be found. Run the installer to repair Jac Code.");
		}
		return text3;
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
				throw new IOException("Another Jac Code installation is running. Try again when it finishes.");
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

	[DllImport("ntdll.dll")]
	private static extern int NtQueryInformationProcess(IntPtr process, int informationClass, ref BasicInformation information, int length, out int returned);

	internal static int ParentId(Process process)
	{
		BasicInformation information = default(BasicInformation);
		if (NtQueryInformationProcess(process.Handle, 0, ref information, Marshal.SizeOf(information), out var _) != 0)
		{
			throw new InvalidDataException("The desktop process could not be verified.");
		}
		return information.ParentProcessId.ToInt32();
	}
}
