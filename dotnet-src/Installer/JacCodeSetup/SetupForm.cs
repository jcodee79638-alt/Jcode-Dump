using System;
using System.Diagnostics;
using System.Drawing;
using System.IO;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace JacCodeSetup;

internal sealed class SetupForm : Form
{
	private readonly TextBox directory;

	private readonly CheckBox desktop;

	private readonly CheckBox startup;

	private bool startupChanged;

	private StartupPolicy startupPolicy;

	private readonly Label status;

	private readonly ProgressBar progress;

	private readonly RoundButton primary;

	private readonly RoundButton remove;

	private bool busy;

	private bool installed;

	internal int ExitCode = 2;

	internal SetupForm(string initial)
	{
		Text = "Jac Code Setup";
		BackColor = Color.FromArgb(21, 22, 21);
		ForeColor = Color.FromArgb(238, 234, 225);
		Font = new Font("Segoe UI", 10f);
		base.AutoScaleMode = AutoScaleMode.Dpi;
		base.ClientSize = new Size(660, 536);
		MinimumSize = new Size(676, 575);
		base.StartPosition = FormStartPosition.CenterScreen;
		base.MaximizeBox = false;
		base.Icon = Icon.ExtractAssociatedIcon(Application.ExecutablePath);
		TableLayoutPanel tableLayoutPanel = new TableLayoutPanel
		{
			Dock = DockStyle.Fill,
			Padding = new Padding(36, 28, 36, 24),
			ColumnCount = 1,
			RowCount = 10
		};
		int[] array = new int[7] { 45, 54, 61, 27, 44, 39, 34 };
		foreach (int num in array)
		{
			tableLayoutPanel.RowStyles.Add(new RowStyle(SizeType.Absolute, num));
		}
		tableLayoutPanel.RowStyles.Add(new RowStyle(SizeType.Percent, 100f));
		tableLayoutPanel.RowStyles.Add(new RowStyle(SizeType.Absolute, 22f));
		tableLayoutPanel.RowStyles.Add(new RowStyle(SizeType.Absolute, 49f));
		base.Controls.Add(tableLayoutPanel);
		tableLayoutPanel.Controls.Add(new Label
		{
			Text = "J   Jac Code",
			Dock = DockStyle.Fill,
			Font = new Font("Segoe UI Semibold", 18f),
			ForeColor = Color.FromArgb(231, 164, 119)
		}, 0, 0);
		tableLayoutPanel.Controls.Add(new Label
		{
			Text = "Install Jac Code",
			Dock = DockStyle.Fill,
			Font = new Font("Segoe UI Semibold", 23f)
		}, 0, 1);
		tableLayoutPanel.Controls.Add(new Label
		{
			Text = "Your projects, conversations and sign-in come with you.\r\nInstall, upgrade or repair Jac Code for this Windows account.",
			Dock = DockStyle.Fill,
			ForeColor = Color.FromArgb(173, 173, 173)
		}, 0, 2);
		tableLayoutPanel.Controls.Add(new Label
		{
			Text = "INSTALL LOCATION",
			Font = new Font("Segoe UI Semibold", 8f),
			Dock = DockStyle.Fill,
			ForeColor = Color.FromArgb(173, 173, 173)
		}, 0, 3);
		TableLayoutPanel tableLayoutPanel2 = new TableLayoutPanel
		{
			Dock = DockStyle.Fill,
			ColumnCount = 2,
			Margin = Padding.Empty
		};
		tableLayoutPanel2.ColumnStyles.Add(new ColumnStyle(SizeType.Percent, 100f));
		tableLayoutPanel2.ColumnStyles.Add(new ColumnStyle(SizeType.Absolute, 96f));
		directory = new TextBox
		{
			Text = initial,
			Dock = DockStyle.Fill,
			BackColor = Color.FromArgb(27, 29, 27),
			ForeColor = ForeColor,
			BorderStyle = BorderStyle.FixedSingle,
			Margin = new Padding(0, 6, 10, 0)
		};
		RoundButton roundButton = new RoundButton
		{
			Text = "Browse",
			Dock = DockStyle.Fill,
			Margin = Padding.Empty,
			ForeColor = ForeColor
		};
		roundButton.Click += delegate
		{
			if (busy)
			{
				return;
			}
			using FolderBrowserDialog folderBrowserDialog = new FolderBrowserDialog
			{
				Description = "Choose an empty folder or an existing Jac Code installation",
				SelectedPath = directory.Text
			};
			if (folderBrowserDialog.ShowDialog(this) == DialogResult.OK)
			{
				directory.Text = folderBrowserDialog.SelectedPath;
			}
		};
		tableLayoutPanel2.Controls.Add(directory, 0, 0);
		tableLayoutPanel2.Controls.Add(roundButton, 1, 0);
		tableLayoutPanel.Controls.Add(tableLayoutPanel2, 0, 4);
		desktop = new CheckBox
		{
			Text = "Add a desktop shortcut",
			Checked = true,
			Dock = DockStyle.Fill,
			AutoSize = true
		};
		startup = new CheckBox
		{
			Text = "Start Jac Code in the background when I sign in to Windows",
			Dock = DockStyle.Fill,
			AutoSize = true
		};
		startup.Click += delegate
		{
			startupChanged = true;
		};
		tableLayoutPanel.Controls.Add(desktop, 0, 5);
		tableLayoutPanel.Controls.Add(startup, 0, 6);
		status = new Label
		{
			Text = "You can change sign-in startup later in Settings.",
			Dock = DockStyle.Fill,
			ForeColor = Color.FromArgb(173, 173, 173),
			Padding = new Padding(0, 10, 0, 0)
		};
		tableLayoutPanel.Controls.Add(status, 0, 7);
		progress = new ProgressBar
		{
			Dock = DockStyle.Fill,
			Visible = false,
			Style = ProgressBarStyle.Continuous,
			Margin = new Padding(0, 5, 0, 10)
		};
		tableLayoutPanel.Controls.Add(progress, 0, 8);
		TableLayoutPanel tableLayoutPanel3 = new TableLayoutPanel
		{
			Dock = DockStyle.Fill,
			ColumnCount = 3,
			Margin = Padding.Empty
		};
		tableLayoutPanel3.ColumnStyles.Add(new ColumnStyle(SizeType.Absolute, 122f));
		tableLayoutPanel3.ColumnStyles.Add(new ColumnStyle(SizeType.Percent, 100f));
		tableLayoutPanel3.ColumnStyles.Add(new ColumnStyle(SizeType.Absolute, 210f));
		remove = new RoundButton
		{
			Text = "Uninstall",
			Dock = DockStyle.Fill,
			ForeColor = ForeColor,
			Visible = File.Exists(Path.Combine(initial, ".jac-install.xml"))
		};
		primary = new RoundButton
		{
			Text = (remove.Visible ? "Upgrade / repair" : "Install Jac Code"),
			Accent = true,
			Dock = DockStyle.Fill,
			ForeColor = ForeColor,
			Margin = Padding.Empty
		};
		tableLayoutPanel3.Controls.Add(remove, 0, 0);
		tableLayoutPanel3.Controls.Add(primary, 2, 0);
		tableLayoutPanel.Controls.Add(tableLayoutPanel3, 0, 9);
		primary.Click += async delegate
		{
			if (installed)
			{
				Process.Start(new ProcessStartInfo
				{
					FileName = Path.Combine(directory.Text, "jac.exe"),
					Arguments = "--home",
					WorkingDirectory = Environment.GetFolderPath(Environment.SpecialFolder.UserProfile),
					UseShellExecute = false
				});
				Close();
			}
			else
			{
				await RunInstall();
			}
		};
		remove.Click += delegate
		{
			if (!busy)
			{
				string path = Core.ValidateDirectory(directory.Text);
				string text = Path.Combine(path, "Uninstall.exe");
				if (!File.Exists(text))
				{
					status.Text = "Choose the existing Jac Code installation to uninstall.";
				}
				else
				{
					Process.Start(new ProcessStartInfo
					{
						FileName = text,
						UseShellExecute = false
					});
					Close();
				}
			}
		};
		base.FormClosing += delegate(object sender, FormClosingEventArgs e)
		{
			if (busy)
			{
				e.Cancel = true;
			}
		};
		string optionsDirectory = "";
		Action loadOptions = delegate
		{
			if (busy || installed || string.Equals(optionsDirectory, directory.Text, StringComparison.OrdinalIgnoreCase))
			{
				return;
			}
			optionsDirectory = directory.Text;
			try
			{
				string path = Core.ValidateDirectory(optionsDirectory);
				InstallState installState = InstallState.Load(Path.Combine(path, ".jac-install.xml"), path);
				desktop.Checked = installState == null || installState.Legacy || installState.Desktop;
				startupPolicy = Core.DefaultStartup(path, installState);
				if (!startupChanged)
				{
					startup.Checked = startupPolicy != StartupPolicy.Disabled;
				}
			}
			catch
			{
				startup.Checked = false;
				status.Text = "Check this folder before installing. Repair can recover an interrupted change.";
			}
		};
		base.Shown += delegate
		{
			loadOptions();
		};
		directory.Leave += delegate
		{
			loadOptions();
		};
		roundButton.Click += delegate
		{
			loadOptions();
		};
	}

	private async Task RunInstall()
	{
		busy = true;
		primary.Enabled = false;
		remove.Enabled = false;
		directory.Enabled = false;
		desktop.Enabled = false;
		startup.Enabled = false;
		progress.Visible = true;
		try
		{
			int num = default(int);
			_ = num;
			_ = 0;
			try
			{
				string selected = directory.Text;
				bool desktopOption = desktop.Checked;
				bool? startupOption = ((startupPolicy == StartupPolicy.Pending && !startupChanged) ? ((bool?)null) : new bool?(startup.Checked));
				await Task.Run(delegate
				{
					Setup.Install(selected, desktopOption, startupOption, delegate(int value, string text)
					{
						BeginInvoke((Action)delegate
						{
							progress.Value = value;
							status.Text = text;
						});
					});
				});
				installed = true;
				ExitCode = 0;
				primary.Text = "Open Jac Code";
				status.Text = "Installation complete. Your projects and sign-in are kept.";
				remove.Visible = false;
			}
			catch (Exception ex)
			{
				ExitCode = 1;
				status.Text = ex.Message;
				directory.Enabled = true;
				desktop.Enabled = true;
				startup.Enabled = true;
			}
		}
		finally
		{
			busy = false;
			primary.Enabled = true;
			remove.Enabled = true;
		}
	}
}
