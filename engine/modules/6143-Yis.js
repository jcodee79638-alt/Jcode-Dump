
async function Yis(e, t) {
  if (!e.ok || !e.body || Number(e.headers.get("content-length") ?? 0) > t)
    throw (await e.body?.cancel(), new UP());
  let r = e.body.getReader(),
    s = [],
    a = 0;
  try {
    while (!0) {
      let H = await r.read();
      if (H.done) break;
      if (((a += H.value.byteLength), a > t)) throw new UP();
      s.push(H.value);
    }
  } finally {
    await r.cancel().catch(() => {});
  }
  return Buffer.concat(s, a);
}