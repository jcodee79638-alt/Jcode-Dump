
async function fPt(e, t) {
  let { response: r, requestLogID: s, retryOfRequestLogID: a, startTime: H } = t,
    u = await (async () => {
      if (t.options.stream) {
        if ((Wy(e).debug("response", r.status, r.url, r.headers, r.body), t.options.__streamClass))
          return t.options.__streamClass.fromSSEResponse(r, t.controller, e, t.options.__synthesizeEventData);
        return r9.fromSSEResponse(r, t.controller, e, t.options.__synthesizeEventData);
      }
      if (r.status === 204) return null;
      if (t.options.__binaryResponse) return r;
      let d = r.headers.get("content-type")?.split(";")[0]?.trim();
      if (d?.includes("application/json") || d?.endsWith("+json")) {
        if (r.headers.get("content-length") === "0") return;
        let D = await r.json();
        return rTr(D, r);
      }
      return await r.text();
    })();
  return (
    Wy(e).debug(
      `[${s}] response parsed`,
      kee({ retryOfRequestLogID: a, url: r.url, status: r.status, body: u, durationMs: Date.now() - H }),
    ),
    u
  );
}