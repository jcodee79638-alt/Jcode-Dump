using System;
using System.IO;
using System.Linq;
using System.Windows.Forms;

namespace JacCodeSetup;

internal static class Uninstall
{
	[STAThread]
	private static int Main(string[] args)
	{
		bool flag = args.Any((string value) => value.Equals("/S", StringComparison.OrdinalIgnoreCase) || value.Equals("/VERYSILENT", StringComparison.OrdinalIgnoreCase));
		try
		{
			Application.EnableVisualStyles();
			string requested = Core.ValidateDirectory(Path.GetDirectoryName(Application.ExecutablePath));
			if (!flag && MessageBox.Show("Remove Jac Code from this Windows account?\r\n\r\nOwned program files, shortcuts and startup entries will be removed. Your projects, conversation history, backups of user data and protected sign-in are kept.", "Uninstall Jac Code", MessageBoxButtons.YesNo, MessageBoxIcon.Question, MessageBoxDefaultButton.Button2) != DialogResult.Yes)
			{
				return 2;
			}
			Transaction.Uninstall(requested);
			if (!flag)
			{
				MessageBox.Show("Jac Code was removed. Your projects, chats and sign-in were kept.\r\n\r\nWindows keeps this running uninstaller and its small installation record. You can delete the remaining application folder after closing this message.", "Jac Code removed", MessageBoxButtons.OK, MessageBoxIcon.Asterisk);
			}
			return 0;
		}
		catch (Exception ex)
		{
			if (!flag)
			{
				MessageBox.Show(ex.Message + "\r\n\r\nSave your work, close Jac Code windows and terminals, then retry. No process was closed.", "Jac Code needs your attention", MessageBoxButtons.OK, MessageBoxIcon.Asterisk);
			}
			return 1;
		}
	}
}
