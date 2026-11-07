
async function Wen(e = {}) {
  let t = await (e.prompt ?? ken)();
  try {
    if (
      !t.email.trim() ||
      t.password.length < 8 ||
      t.email.length > 320 ||
      t.password.length > 128 ||
      /[\u0000-\u001f\u007f]/.test(t.email)
    )
      throw new Sc();
    let r = await (e.fetcher ?? zne)(`${O0}/api/native/login`, {
      method: "POST",
      headers: { "content-type": "application/json", "X-Jac-Version": h_ },
      body: JSON.stringify({ email: t.email.trim(), password: t.password, client_id: "jaccode-windows" }),
      redirect: "error",
      signal: e.signal ? AbortSignal.any([e.signal, AbortSignal.timeout(20000)]) : AbortSignal.timeout(20000),
    });
    if (!r.ok) {
      if ((await r.body?.cancel(), r.status === 429)) throw Gen(r);
      throw new Sc(r.status === 426 ? "update" : r.status >= 500 ? "unavailable" : "credentials");
    }
    let s = QDe(await r.json());
    if (s.password_change_required === !0) {
      if (
        Object.keys(s).sort().join(",") !== "challenge,expires_in,password_change_required" ||
        typeof s.challenge !== "string" ||
        !/^[A-Za-z0-9_-]{20,512}$/.test(s.challenge) ||
        !Number.isInteger(s.expires_in) ||
        Number(s.expires_in) < 1 ||
        Number(s.expires_in) > 300
      )
        throw new Sc();
      throw new BFe(s.challenge, Number(s.expires_in));
    }
    return qen(s, (e.now ?? Date.now)());
  } catch (r) {
    if (r instanceof Sc || r instanceof BFe) throw r;
    throw new Sc(e.signal?.aborted ? "cancelled" : "unavailable");
  } finally {
    t.password = "";
  }
}