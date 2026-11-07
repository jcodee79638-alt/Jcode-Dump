
async function PTt({ response: e, url: t, maxBytes: r = jTt }) {
  let s = e.headers.get("content-length");
  if (s != null) {
    let L = parseInt(s, 10);
    if (!isNaN(L) && L > r)
      throw (
        await KIr(e),
        new $T({
          url: t,
          message: `Download of ${t} exceeded maximum size of ${r} bytes (Content-Length: ${L}).`,
        })
      );
  }
  let a = e.body;
  if (a == null) return new Uint8Array(0);
  let H = a.getReader(),
    u = [],
    f = 0;
  try {
    while (!0) {
      let { done: L, value: I } = await H.read();
      if (L) break;
      if (((f += I.length), f > r))
        throw new $T({ url: t, message: `Download of ${t} exceeded maximum size of ${r} bytes.` });
      u.push(I);
    }
  } finally {
    try {
      await H.cancel();
    } catch (L) {
    } finally {
      H.releaseLock();
    }
  }
  let d = new Uint8Array(f),
    _ = 0;
  for (let L of u) (d.set(L, _), (_ += L.length));
  return d;
}