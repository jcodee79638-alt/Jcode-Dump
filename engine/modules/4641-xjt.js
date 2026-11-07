
async function xjt(e, t) {
  let { response: r, requestLogID: s, retryOfRequestLogID: a, startTime: H } = t,
    u = await (async () => {
      if (t.options.stream) {
        if ((yT(e).debug("response", r.status, r.url, r.headers, r.body), t.options.__streamClass))
          return t.options.__streamClass.fromSSEResponse(r, t.controller);
        return zN.fromSSEResponse(r, t.controller);
      }
      if (r.status === 204) return null;
      if (t.options.__binaryResponse) return r;
      let d = r.headers.get("content-type")?.split(";")[0]?.trim();
      if (d?.includes("application/json") || d?.endsWith("+json")) {
        let I = await r.json();
        return Bxr(I, r);
      }
      return await r.text();
    })();
  return (
    yT(e).debug(
      `[${s}] response parsed`,
      yee({ retryOfRequestLogID: a, url: r.url, status: r.status, body: u, durationMs: Date.now() - H }),
    ),
    u
  );
}