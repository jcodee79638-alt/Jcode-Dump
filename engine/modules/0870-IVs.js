
function IVs(e, t, r) {
  if (typeof t !== "number" || t <= 0) return e;
  if (!e.body) return e;
  if (!e.headers.get("content-type")?.includes("text/event-stream")) return e;
  let s = e.body.getReader(),
    a = new ReadableStream({
      async pull(H) {
        let u = await new Promise((f, d) => {
          let _ = setTimeout(() => {
            let L = Error("SSE read timed out");
            (r.abort(L), s.cancel(L).catch(() => {}), d(L));
          }, t);
          s.read().then(
            (L) => {
              (clearTimeout(_), f(L));
            },
            (L) => {
              (clearTimeout(_), d(L));
            },
          );
        });
        if (u.done) {
          H.close();
          return;
        }
        H.enqueue(u.value);
      },
      async cancel(H) {
        (r.abort(H), await s.cancel(H));
      },
    });
  return new Response(a, { headers: new Headers(e.headers), status: e.status, statusText: e.statusText });
}