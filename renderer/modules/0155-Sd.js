
var Sd = o("<p class=inline-error role=alert>"),
  jd = o(
    '<section class=queue-v6 aria-label="Queued requests"><header class=queue-v6-heading><div><h3>Request queue</h3><p></p></div><button class=button></button><button class=text-button>Refresh</button></header><p class=runtime-v6-muted> / 20 saved requests · The queue pauses when Jac Code starts. Sent requests are never sent again.</p><div class=queue-v6-list>',
  ),
  Td = o(
    "<div class=tools-empty><h4>No queued requests</h4><p class=runtime-v6-muted>Use Queue request in the composer to save work for later.",
  ),
  Ad = o("<label class=field-label>Edit queued request<textarea class=input rows=5 maxlength=200000>"),
  Ed = o(
    "<div class=runtime-v6-actions><button class=button>Save request</button><button class=text-button>Cancel edit",
  ),
  Pd = o(
    "<p class=queue-v6-attention>Admission could not be confirmed. Open the saved chat and inspect its progress. Continue explicitly there if needed; this queue item will not run again.",
  ),
  Rd = o(
    "<p class=runtime-v6-muted>Sent to the conversation. Removing this record does not cancel the task.",
  ),
  Id = o("<button class=text-button>Edit"),
  qd = o("<button class=text-button>Move up"),
  Ld = o("<button class=text-button>Move down"),
  Md = o("<button class=text-button>"),
  Dd = o(
    "<article class=queue-v6-item><div class=queue-v6-item-heading><span></span><small></small></div><p class=runtime-v6-muted> attachments · </p><div class=runtime-v6-actions><button class=button>Open saved chat</button><button class=text-button>",
  ),
  Nd = o("<p class=queue-v6-text>");