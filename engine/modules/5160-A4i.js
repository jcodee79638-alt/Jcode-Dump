
function A4i(e) {
  if (!z6.isInstance(e) || e.data.statusCode !== 429 || e.data.message !== qF.global_concurrency) return;
  return UFe(e.data.responseHeaders?.[OFe]);
}