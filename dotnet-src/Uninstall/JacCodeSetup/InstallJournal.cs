using System.Collections.Generic;

namespace JacCodeSetup;

public sealed class InstallJournal
{
	public string Directory;

	public string Id;

	public List<FileChange> Changed = new List<FileChange>();

	public List<string> Preserved = new List<string>();

	public List<string> CreatedDirectories = new List<string>();

	public List<ShellValue> Registration = new List<ShellValue>();

	public string Startup;

	public int StartupKind;

	public string StartShortcut;

	public string DesktopShortcut;

	public bool ShellStarted;

	public bool PathPlanned;

	public bool PathRemoved;

	public bool PathWasMissing;

	public bool SeparatorAdded;

	public string Status;
}
