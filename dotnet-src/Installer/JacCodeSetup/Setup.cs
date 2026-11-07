using System;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Windows.Forms;

namespace JacCodeSetup;

internal static class Setup
{
	[STAThread]
	private static int Main(string[] args)
	{
		bool flag = args.Any((string value) => value.Equals("/S", StringComparison.OrdinalIgnoreCase) || value.Equals("/VERYSILENT", StringComparison.OrdinalIgnoreCase));
		try
		{
			if (!Environment.Is64BitOperatingSystem || Environment.OSVersion.Version.Major < 10)
			{
				throw new PlatformNotSupportedException("Jac Code requires Windows 10 or newer, x64.");
			}
			string text = args.FirstOrDefault((string value) => value.StartsWith("/DIR=", StringComparison.OrdinalIgnoreCase));
			string text2 = ((text == null) ? Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData), "Programs", "Jac Code") : text.Substring(5));
			if (args.Any((string value) => value == "/?" || value.Equals("/HELP", StringComparison.OrdinalIgnoreCase)))
			{
				if (!flag)
				{
					MessageBox.Show("Jac Code Setup 6.3.15\r\n/S or /VERYSILENT — install without launching\r\n/DIR=\"folder\" — existing or new per-user folder\r\n/DESKTOP=0|1 — desktop shortcut\r\n/STARTUP=0|1 — open at Windows sign-in\r\n\r\nProjects, history and sign-in are kept. Exit codes: 0 success, 1 failure/deferred, 2 cancelled.", "Jac Code Setup");
				}
				return 0;
			}
			if (flag)
			{
				Install(text2, Option(args, "/DESKTOP="), Option(args, "/STARTUP="), delegate
				{
				});
				return 0;
			}
			Application.EnableVisualStyles();
			Application.SetCompatibleTextRenderingDefault(defaultValue: false);
			using SetupForm setupForm = new SetupForm(text2);
			Application.Run(setupForm);
			return setupForm.ExitCode;
		}
		catch (Exception ex)
		{
			if (!flag)
			{
				MessageBox.Show(ex.Message, "Jac Code needs your attention", MessageBoxButtons.OK, MessageBoxIcon.Asterisk);
			}
			return 1;
		}
	}

	private static bool? Option(string[] args, string prefix)
	{
		string text = args.FirstOrDefault((string item) => item.StartsWith(prefix, StringComparison.OrdinalIgnoreCase));
		if (text == null)
		{
			return null;
		}
		if (text.Substring(prefix.Length) == "1")
		{
			return true;
		}
		if (text.Substring(prefix.Length) == "0")
		{
			return false;
		}
		throw new ArgumentException("Use 0 or 1 for desktop and sign-in startup options.");
	}

	internal static void Install(string directory, Action<int, string> progress)
	{
		Install(directory, null, null, progress);
	}

	internal static void Install(string directory, bool? desktop, bool? startup, Action<int, string> progress)
	{
		using Stream stream = Assembly.GetExecutingAssembly().GetManifestResourceStream("JacCode.Payload.zip");
		if (stream == null)
		{
			throw new InvalidDataException("The installer payload is missing. Download the verified installer again.");
		}
		Transaction.Install(directory, stream, desktop, startup, progress);
	}
}
