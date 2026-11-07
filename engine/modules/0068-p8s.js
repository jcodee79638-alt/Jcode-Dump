
async function p8s(e, t, r = fetch) {
  try {
    if (!/^[A-Za-z0-9_-]{20,512}$/.test(e) || t.length < 8 || t.length > 128 || t === "password")
      throw new Sc();
    let s = await r(`${O0}/api/native/password/change`, {
      method: "POST",
      headers: { "content-type": "application/json", "X-Jac-Version": h_ },
      body: JSON.stringify({ client_id: "jaccode-windows", challenge: e, newPassword: t }),
      redirect: "error",
      signal: AbortSignal.timeout(20000),
    });
    if (!s.ok)
      throw (
        await s.body?.cancel(),
        new Sc(s.status === 426 ? "update" : s.status >= 500 || s.status === 429 ? "unavailable" : "signin")
      );
    let a = QDe(await s.json());
    if (a.ok !== !0 || Object.keys(a).length !== 1) throw new Sc();
  } catch (s) {
    if (s instanceof Sc) throw s;
    throw new Sc("unavailable");
  }
}