
function Pwi({ error: e, url: t, requestBodyValues: r }) {
  if ($He(e)) return e;
  if (e instanceof TypeError && V1a.includes(e.message.toLowerCase())) {
    let a = e.cause;
    if (a != null)
      return new U0({
        message: `Cannot connect to API: ${a.message}`,
        cause: a,
        url: t,
        requestBodyValues: r,
        isRetryable: !0,
      });
  }
  let s = G1a(e);
  if (s != null) {
    if (U0.isInstance(e))
      return new U0({
        message: e.message,
        cause: e.cause,
        url: e.url,
        requestBodyValues: e.requestBodyValues,
        statusCode: e.statusCode,
        responseHeaders: e.responseHeaders,
        responseBody: e.responseBody,
        data: e.data,
        isRetryable: !0,
      });
    return new U0({
      message: `Cannot connect to API: ${e instanceof Error ? e.message : s.message}`,
      cause: e,
      url: t,
      requestBodyValues: r,
      isRetryable: !0,
    });
  }
  return e;
}