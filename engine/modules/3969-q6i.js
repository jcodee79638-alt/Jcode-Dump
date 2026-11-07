
function q6i({ response: e, status: t, statusText: r, headers: s, stream: a }) {
  let H = t != null ? t : 200;
  if (r !== void 0) e.writeHead(H, r, s);
  else e.writeHead(H, s);
  let u = a.getReader();
  (async () => {
    try {
      while (!0) {
        let { done: d, value: _ } = await u.read();
        if (d) break;
        if (!e.write(_))
          await new Promise((I) => {
            e.once("drain", I);
          });
      }
    } catch (d) {
      throw d;
    } finally {
      e.end();
    }
  })();
}