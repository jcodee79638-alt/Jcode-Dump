
var Ud = o("<p class=tools-loading role=status>Searching project files…"),
  Fd = o("<p role=alert class=inline-error>"),
  Jd = o(
    '<section class=project-search-v6 aria-label="Search project code"><div class=tools-section-title><h3>Search project code</h3><p class=project-v6-help>Choose a match to add its file and line to your draft.</p></div><form class=project-v6-search-form><label for=project-v6-query>Search text</label><input id=project-v6-query maxlength=256 placeholder="Function, symbol, path, or text"><button class=button type=submit>Search code</button></form><details class="tools-disclosure tools-search-scope"><summary>Search scope</summary><p class=project-v6-help>Literal, case insensitive search of bounded project files. Private files, dependencies and links are excluded.',
  ),
  Bd = o("<p class=project-v6-help role=status> matches · <!> files inspected for “<!>”"),
  Hd = o("<p>No matching code or paths found."),
  Wd = o("<button class=project-v6-search-result><strong>:</strong><code>");