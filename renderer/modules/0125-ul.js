
var ul = o("<button>Select element"),
  hl = o("<p class=inline-error role=alert>"),
  gl = o(
    "<p class=preview-capability-note role=status>Diagnostics and element selection are unavailable for local server previews. Open an HTML file to use these tools.",
  ),
  fl = o(
    "<p class=preview-selection-hint role=status>Click an element to review its reference. Press Escape to stop selecting.",
  ),
  vl = o(
    "<p class=preview-capability-note role=status>Capture limit reached. Refresh the preview to capture more errors.",
  ),
  ml = o(
    '<details class=preview-diagnostics><summary><span>Preview diagnostics</span><span aria-label="Captured diagnostics"> <!> · <!> <!> · <!> </span></summary><p class=preview-capability-note>Latest 30 captured errors for this preview. Messages and references are screened; stacks and URL details are omitted.</p><div class=preview-diagnostic-list></div><div class=preview-diagnostic-actions><button class=text-button>Clear diagnostics</button><button class=button>Add selected diagnostics to draft',
  ),
  $l = o(
    '<div class=web-preview><form class=preview-address><input class=input aria-label="Preview file or local URL"placeholder="HTML file or local development URL"></form><div class=preview-controls><button aria-label="Desktop width">Desktop</button><button aria-label="Mobile width">Mobile',
  ),
  pl = o("<p class=preview-selection-text>"),
  bl = o(
    '<section class=preview-selection-card aria-label="Selected preview element"><div class=report-section-heading><strong></strong></div><code></code><p></p><button class=button>Add selection to draft',
  ),
  wl = o("<p class=task-help>No captured errors in this list."),
  _l = o("<code>"),
  yl = o("<label class=preview-diagnostic><input type=checkbox><span><strong></strong><span>"),
  kl = o("<div class=task-empty><h3></h3><p>Choose an HTML file or enter a local development address."),
  xl = o(
    '<div class=preview-frame-viewport><iframe title="Project preview"sandbox=allow-scripts referrerpolicy=no-referrer>',
  );