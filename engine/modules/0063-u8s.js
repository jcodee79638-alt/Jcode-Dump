
async function u8s(e, t, r, s = Date.now) {
  try {
    let a = await e(`${O0}/api/oauth/token`, {
      method: "POST",
      headers: { "content-type": "application/json", "X-Jac-Version": h_ },
      body: JSON.stringify(t),
      redirect: "error",
      signal: r ? AbortSignal.any([r, AbortSignal.timeout(20000)]) : AbortSignal.timeout(20000),
    });
    if (!a.ok)
      throw (
        await a.body?.cancel(),
        new Sc(a.status === 426 ? "update" : a.status >= 500 || a.status === 429 ? "unavailable" : "signin")
      );
    return qen(await a.json(), s());
  } catch (a) {
    if (a instanceof Sc) throw a;
    throw new Sc(r?.aborted ? "cancelled" : "unavailable");
  }
}