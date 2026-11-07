
var os = o("<span class=task-tool-count> "),
  cs = o('<ul class=observed-stages aria-label="Observed task stages">'),
  ds = o(
    '<details class="thinking-disclosure task-disclosure"><summary></summary><div class="thinking-tools task-timeline">',
  ),
  us = o('<div class=task-live-progress aria-label="Live task progress">'),
  hs = o("<section class=task-turn>"),
  gs = o("<span class=task-complete-label><span>Task activity"),
  fs = o("<li><span></span><small>"),
  vs = o("<div class=task-live-tool role=status><span>"),
  ms = o("<p>"),
  $s = o(
    "<p class=partial-response-note role=status>This response was interrupted. The text above is saved, but may be incomplete.",
  ),
  ps = o('<p class="inline-error task-error"role=status>');