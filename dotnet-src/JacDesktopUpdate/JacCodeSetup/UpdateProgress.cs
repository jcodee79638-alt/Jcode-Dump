using System.Drawing;
using System.Drawing.Drawing2D;
using System.IO;
using System.Reflection;
using System.Windows.Forms;

namespace JacCodeSetup;

internal sealed class UpdateProgress : Form
{
	private readonly Label stage;

	internal UpdateProgress()
	{
		using (Stream stream = Assembly.GetExecutingAssembly().GetManifestResourceStream("JacCode.Icon.ico"))
		{
			base.Icon = new Icon(stream);
		}
		Text = "Jac Code update";
		BackColor = Color.FromArgb(18, 18, 18);
		ForeColor = Color.FromArgb(242, 240, 236);
		Font = new Font("Segoe UI", 10f);
		base.AutoScaleMode = AutoScaleMode.Dpi;
		base.ClientSize = new Size(530, 286);
		base.StartPosition = FormStartPosition.CenterScreen;
		base.FormBorderStyle = FormBorderStyle.None;
		base.MaximizeBox = false;
		base.MinimizeBox = false;
		base.ControlBox = false;
		using (GraphicsPath graphicsPath = new GraphicsPath())
		{
			graphicsPath.AddArc(0, 0, 24, 24, 180f, 90f);
			graphicsPath.AddArc(base.Width - 25, 0, 24, 24, 270f, 90f);
			graphicsPath.AddArc(base.Width - 25, base.Height - 25, 24, 24, 0f, 90f);
			graphicsPath.AddArc(0, base.Height - 25, 24, 24, 90f, 90f);
			graphicsPath.CloseFigure();
			base.Region = new Region(graphicsPath);
		}
		base.Controls.Add(new Label
		{
			Text = "J   Jac Code",
			ForeColor = Color.FromArgb(255, 151, 87),
			Font = new Font("Segoe UI Semibold", 18f),
			AutoSize = true,
			Location = new Point(32, 27)
		});
		stage = new Label
		{
			Text = "Installing your update.",
			Font = new Font("Segoe UI Semibold", 21f),
			AutoSize = true,
			Location = new Point(30, 89)
		};
		base.Controls.Add(stage);
		base.Controls.Add(new Label
		{
			Text = "Your projects, chats and sign-in are kept.",
			ForeColor = Color.FromArgb(173, 173, 173),
			AutoSize = true,
			Location = new Point(33, 137)
		});
		base.Controls.Add(new UpdateTrack
		{
			AccessibleName = "Installing update",
			AccessibleRole = AccessibleRole.ProgressBar,
			Location = new Point(34, 191),
			Size = new Size(462, 6)
		});
		base.Controls.Add(new Label
		{
			Text = "Jac Code will open automatically when it’s ready.",
			ForeColor = Color.FromArgb(173, 173, 173),
			AutoSize = true,
			Location = new Point(33, 224)
		});
	}

	internal void Opening()
	{
		stage.Text = "Opening Jac Code.";
	}
}
