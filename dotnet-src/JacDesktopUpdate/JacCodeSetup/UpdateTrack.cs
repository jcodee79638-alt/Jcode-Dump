using System;
using System.Drawing;
using System.Windows.Forms;

namespace JacCodeSetup;

internal sealed class UpdateTrack : Control
{
	private readonly Timer animation = new Timer
	{
		Interval = 30
	};

	private int position;

	internal UpdateTrack()
	{
		DoubleBuffered = true;
		Timer timer = animation;
		EventHandler value = delegate
		{
			position = (position + 4) % (base.Width + 110);
			Invalidate();
		};
		timer.Tick += value;
		animation.Start();
	}

	protected override void OnPaint(PaintEventArgs e)
	{
		using (SolidBrush brush = new SolidBrush(Color.FromArgb(48, 48, 48)))
		{
			e.Graphics.FillRectangle(brush, base.ClientRectangle);
		}
		using SolidBrush brush2 = new SolidBrush(Color.FromArgb(255, 151, 87));
		e.Graphics.FillRectangle(brush2, position - 110, 0, 110, base.Height);
	}

	protected override void Dispose(bool disposing)
	{
		if (disposing)
		{
			animation.Dispose();
		}
		base.Dispose(disposing);
	}
}
