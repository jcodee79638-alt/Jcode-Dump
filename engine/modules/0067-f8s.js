
async function f8s(e, t, r = zne) {
  try {
    if (!e.trim() || t.length < 8 || e.length > 320 || t.length > 128 || /[\u0000-\u001f\u007f]/.test(e))
      throw new Sc();
    let s = await r(`${O0}/api/native/register`, {
      method: "POST",
      headers: { "content-type": "application/json", "X-Jac-Version": h_ },
      body: JSON.stringify({ email: e.trim(), password: t, client_id: "jaccode-windows" }),
      redirect: "error",
      signal: AbortSignal.timeout(20000),
    });
    if ((await s.body?.cancel(), s.status === 429)) throw Gen(s);
    if (s.status === 403) throw new Sc("signup");
    if (s.status !== 202)
      throw new Sc(s.status === 426 ? "update" : s.status >= 500 ? "unavailable" : "credentials");
  } catch (s) {
    if (s instanceof Sc) throw s;
    throw new Sc("unavailable");
  }
}