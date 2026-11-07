
function XMa({ stream: e, url: t, requestBodyValues: r, statusCode: s, responseHeaders: a }) {
  let H = e.getReader(),
    u = !1,
    f = () => {
      if (!u) (H.releaseLock(), (u = !0));
    };
  return new ReadableStream({
    async pull(d) {
      try {
        let { done: _, value: L } = await H.read();
        if (_) (f(), d.close());
        else d.enqueue(L);
      } catch (_) {
        if ((f(), $He(_))) {
          d.error(_);
          return;
        }
        d.error(
          Pwi({
            error: new U0({
              message: "Failed to process successful response",
              cause: _,
              statusCode: s,
              url: t,
              responseHeaders: a,
              requestBodyValues: r,
            }),
            url: t,
            requestBodyValues: r,
          }),
        );
      }
    },
    async cancel(d) {
      try {
        await H.cancel(d);
      } finally {
        f();
      }
    },
  });
}