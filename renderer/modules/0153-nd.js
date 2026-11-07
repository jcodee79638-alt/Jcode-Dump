
var nd = o("<p class=tools-loading role=status>Inspecting project…"),
  rd = o("<p role=alert class=inline-error>"),
  id = o(
    "<p class=project-v6-help role=status>Choose a conversation to save, run, or remove project profiles.",
  ),
  ad = o(
    '<form class=project-v6-editor><label>Profile name<input aria-label="Profile name"maxlength=100></label><p class=project-v6-help>Enter each command as a JSON array of arguments. Leave unused actions empty.</p><label>Start argv<textarea aria-label="Start argv"></textarea></label><label>Build argv<textarea aria-label="Build argv"></textarea></label><label>Test argv<textarea aria-label="Test argv"></textarea></label><div class=project-v6-actions><button class="button primary"type=submit>Save profile</button><button class=button type=button>Cancel edit',
  ),
  sd = o(
    '<section class=project-tools-v6 aria-label="Project tools"><div class=project-v6-heading><h3>Project tools</h3><button class=button>Refresh</button></div><section aria-label="Run profiles"class=project-v6-card><div class=project-v6-heading><h4>Run profiles</h4><button class=button>New profile</button></div><details class=tools-disclosure><summary>Command limits and confirmation</summary><p class=project-v6-help>Each launch asks you to confirm the exact command. Build/test runs stop after two minutes; start runs stop after one hour. Stop a run at any time; closing Jac Code also stops it. Read access cannot run commands.</p></details></section><section aria-label="Command history"class=project-v6-card><h4>Command history',
  ),
  ld = o(
    '<section aria-label="Project setup"class=project-v6-card><div class=project-v6-heading><h4> setup</h4><button class=button>Add setup guidance to draft</button></div><ul class=project-v6-requirements></ul><p class=project-v6-help>Inspection runs no project code or installers. Runtime versions have not been verified.',
  ),
  od = o("<li><strong></strong><span></span><p>"),
  cd = o("<p class=project-v6-help>"),
  dd = o("<button class=button>Save suggested "),
  ud = o("<p class=project-v6-help>No saved profiles yet."),
  hd = o(
    "<article class=project-v6-profile><strong></strong><div class=project-v6-actions><button class=button>Edit </button><button class=button>Remove ",
  ),
  gd = o("<div class=project-v6-command><code></code><button class=button>Run "),
  fd = o("<ul>"),
  vd = o('<section aria-label="Completion verification"class=project-v6-card><h4>Completion verification: '),
  md = o("<p class=project-v6-help>No expected checks are configured. Verification remains incomplete."),
  $d = o("<li><code>"),
  pd = o("<p class=project-v6-help>Missing or unverified: "),
  bd = o("<p><strong></strong> · "),
  wd = o("<p class=project-v6-help>No commands run in this app session. Unrun checks remain unknown."),
  _d = o("<button class=button>Stop command"),
  yd = o('<details class="tools-disclosure command-output"><summary>Command output</summary><pre>'),
  kd = o("<p class=project-v6-help>Output excerpt shown; output is bounded."),
  xd = o(
    "<article class=project-v6-run><div class=project-v6-heading><strong>: </strong></div><code></code><p class=project-v6-help>",
  );