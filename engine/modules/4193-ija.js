
function ija(e) {
  let t = rja(e.providerID, e.error),
    r = oyr(e.error.responseBody);
  if (EY(t) || e.error.statusCode === 413 || r?.error?.code === "context_length_exceeded")
    return { type: "context_overflow", message: t, responseBody: e.error.responseBody };
  let s = e.error.url ? { url: e.error.url } : void 0;
  return {
    type: "api_error",
    message: t,
    statusCode: e.error.statusCode,
    isRetryable: e.providerID.startsWith("openai") ? tja(e.error) : e.error.isRetryable,
    responseHeaders: e.error.responseHeaders,
    responseBody: e.error.responseBody,
    metadata: s,
  };
}