
var Zo = o("<p class=mcp-directory>"),
  Go = o("<p class=inline-error role=alert>"),
  Qo = o("<div class=mcp-server-list>"),
  Xo = o("<button class=button>"),
  ec = o(
    '<label class=field-label>Command as JSON array<textarea class=input aria-label="Command as JSON array"required rows=3></textarea><small class=task-help>Each argument is a separate string. Enabling runs this command on your computer.',
  ),
  tc = o(
    '<form class="mcp-add-form preference-card"><label class=field-label>Server name<input class=input required maxlength=64 placeholder="Connection name"></label><label class=field-label>Connection type<select class=input aria-label="Connection type"><option value=remote>Remote server</option><option value=local>Local command</option></select></label><label class=field-label><textarea class="input mcp-secret"rows=3 autocomplete=off placeholder="{&quot;KEY&quot;: &quot;value&quot;}"></textarea><button type=button class="text-button mcp-secret-toggle"></button><small class=task-help>Saved connection secrets are never displayed here.</small></label><label class=mcp-enabled><input type=checkbox>Enable this server after saving</label><p class=task-help>Jac Code asks for native confirmation before saving or enabling a connection.</p><button class="button primary"type=submit>',
  ),
  nc = o(
    '<section class="report-section mcp-catalog"><h3>Available tools</h3><p class=task-help> tools exposed by connected servers.',
  ),
  rc = o(
    '<section class="report-section mcp-catalog"><h3>Resources</h3><p class=task-help>Add reference material to your draft for review before sending.',
  ),
  ic = o(
    '<section class="report-section mcp-catalog"><h3>Prompts</h3><p class=task-help>Review a server prompt as editable draft text.',
  ),
  ac = o(
    "<section class=mcp-settings><div class=report-section-heading><h3>MCP connections</h3><button class=button>Refresh</button></div><p class=preferences-intro>Connections are available across your projects on this Windows account. Local servers start in the selected workspace.",
  ),
  sc = o(
    "<div class=preference-card><p class=task-help>Choose a project or open a chat before managing connections.",
  ),
  lc = o("<div class=preference-card><p class=task-help>No MCP connections configured."),
  oc = o("<button class=button>Sign in"),
  cc = o("<button class=text-button>Sign out"),
  dc = o(
    '<article class=mcp-server><div class=report-section-heading><strong></strong><span></span></div><p class=task-help></p><div class=report-actions><button class=button></button><button class="text-button danger-quiet">Remove',
  ),
  uc = o(
    '<label class=field-label>Server URL<input class=input aria-label="Server URL"type=url required placeholder="HTTPS server address"><small class=task-help>HTTPS, or a local development address.',
  ),
  hc = o("<details><summary></summary><p class=task-help>"),
  gc = o("<p class=task-help>No resources reported."),
  fc = o(
    "<div class=mcp-catalog-row><span><strong></strong><small></small></span><button class=button>Add to draft",
  ),
  vc = o("<p class=task-help>No prompts reported."),
  mc = o(
    "<div class=mcp-catalog-row><span><strong></strong><small> · </small></span><button class=button>Use prompt",
  ),
  $c = o(
    '<form class=mcp-prompt-form><label class=field-label>Prompt arguments as JSON<textarea class=input rows=3></textarea></label><div class=report-actions><button class="button primary"type=submit>Add prompt to draft</button><button class=button type=button>Cancel',
  );