using System;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Windows.Forms;

namespace JacCodeSetup;

internal static class Launcher
{
	[STAThread]
	private static int Main(string[] args)
	{
		try
		{
			if (args.Length == 1 && (args[0] == "--version" || args[0] == "-v"))
			{
				Console.WriteLine("6.3.15");
				return 0;
			}
			string directory = Core.ValidateDirectory(Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location));
			return DesktopCommon.Locked(directory, delegate
			{
				if (File.Exists(Path.Combine(directory, ".jac-transaction.json")))
				{
					throw new IOException("An interrupted Jac Code installation needs repair. Run the latest installer and choose this folder. Your work and sign-in are kept.");
				}
				string fileName = DesktopCommon.Current(directory);
				string text = string.Join(" ", args.Select(DesktopCommon.Quote));
				if (text.Length > 30000 || args.Any((string value) => value.IndexOf('\0') >= 0))
				{
					throw new ArgumentException("The command is too long.");
				}
				using (Process process = Process.Start(new ProcessStartInfo
				{
					FileName = fileName,
					Arguments = text,
					WorkingDirectory = Environment.CurrentDirectory,
					UseShellExecute = false
				}))
				{
					if (process == null)
					{
						throw new IOException("The desktop did not start. Try repairing Jac Code.");
					}
				}
				return 0;
			});
		}
		catch (Exception ex)
		{
			if (!args.SequenceEqual(new string[1] { "--startup" }))
			{
				MessageBox.Show(ex.Message, "Jac Code", MessageBoxButtons.OK, MessageBoxIcon.Asterisk);
			}
			return 1;
		}
	}
}
