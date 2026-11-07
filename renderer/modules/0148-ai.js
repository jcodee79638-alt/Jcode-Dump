
var ai = o("<p class=inline-error role=alert>"),
  Nc = o("<p class=backup-notice role=status>"),
  zc = o(
    "<section class=backup-settings aria-labelledby=backup-heading><div class=report-section-heading><h3 id=backup-heading>Local backups</h3><button class=button>Refresh</button></div><p class=preferences-intro>Keep rotating copies of conversations, safe settings, drafts and bounded attachments on this computer. Project working files are outside this backup.",
  ),
  Oc = o('<p class="task-help tools-loading"role=status>Reading local backup status…'),
  Uc = o("<p class=backup-storage> verified <!> · <!> saved · <!> limit"),
  Fc = o(
    '<form class="backup-controls preference-card"><label class=backup-enabled><input type=checkbox>Create backups automatically while idle</label><div class=backup-numbers><label class=field-label>Interval in hours<input class=input type=number min=1 max=168 step=1 required></label><label class=field-label>Copies to keep<input class=input type=number min=1 max=10 step=1 required></label></div><p class=task-help>Defaults: 3 copies, every 24 hours. The 128 MiB storage limit may retain fewer copies. Creating or restoring a backup requires idle workspaces.</p><div class=report-actions><button class=button type=submit>Save schedule</button><button class="button primary"type=button>',
  ),
  Jc = o('<div class=backup-list aria-label="Saved backup copies"><h4>Saved copies'),
  Bc = o("<p class=task-help>No saved copies yet. Create one to protect your current history."),
  Hc = o(
    "<p class=backup-warning>Partial copy · <!> skipped items. Inspect included scopes before restoring.",
  ),
  Wc = o(
    "<article class=backup-entry><div><strong></strong><p class=task-help> conversations · <!> attachments · </p></div><button class=button>Inspect",
  ),
  Yc = o("<p class=task-help>Finish current work, then refresh this preview before restoring."),
  Vc = o(
    '<div class="backup-inspection preference-card"role=region aria-label="Backup restoration preview"><h4>Restoration preview</h4><p class=task-help>Saved <!> · </p><ul></ul><div class=backup-warning></div><p class=task-help>Jac Code keeps a safety copy of the current saved data. Restoration requires native confirmation and restarts the app after committing.</p><div class=report-actions><button class="button danger-quiet">Restore this copy…</button><button class=button>Close preview',
  ),
  Kc = o("<li>"),
  Zc = o("<p>");