using System.Drawing;
using System.Drawing.Drawing2D;
using System.Windows.Forms;

namespace JacCodeSetup;

internal sealed class RoundButton : Button
{
	internal bool Accent;

	internal RoundButton()
	{
		base.FlatStyle = FlatStyle.Flat;
		base.FlatAppearance.BorderSize = 0;
		Cursor = Cursors.Hand;
		base.Height = 42;
	}

	protected override void OnPaint(PaintEventArgs e)
	{
		e.Graphics.SmoothingMode = SmoothingMode.AntiAlias;
		Rectangle bounds = new Rectangle(0, 0, base.Width - 1, base.Height - 1);
		using (GraphicsPath graphicsPath = new GraphicsPath())
		{
			graphicsPath.AddArc(bounds.Left, bounds.Top, 18, 18, 180f, 90f);
			graphicsPath.AddArc(bounds.Right - 18, bounds.Top, 18, 18, 270f, 90f);
			graphicsPath.AddArc(bounds.Right - 18, bounds.Bottom - 18, 18, 18, 0f, 90f);
			graphicsPath.AddArc(bounds.Left, bounds.Bottom - 18, 18, 18, 90f, 90f);
			graphicsPath.CloseFigure();
			using SolidBrush brush = new SolidBrush((!base.Enabled) ? Color.FromArgb(61, 63, 59) : (Accent ? Color.FromArgb(231, 164, 119) : Color.FromArgb(40, 40, 40)));
			e.Graphics.FillPath(brush, graphicsPath);
		}
		TextRenderer.DrawText(e.Graphics, Text, Font, bounds, (Accent && base.Enabled) ? Color.FromArgb(31, 20, 12) : ForeColor, TextFormatFlags.HorizontalCenter | TextFormatFlags.VerticalCenter);
	}
}
