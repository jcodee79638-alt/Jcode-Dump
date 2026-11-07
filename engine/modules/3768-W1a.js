
async function W1a({
  url: e,
  headers: t,
  abortSignal: r,
  maxRedirects: s = F1a,
  fetch: a,
  trustedOrigin: H,
}) {
  var u;
  let f = t === void 0 ? void 0 : N1a(t),
    d = (L) => {
      let I = { signal: r, redirect: L };
      if (f !== void 0) I.headers = new Headers(f);
      return I;
    },
    _ = e;
  for (let L = 0; L <= s; L++) {
    let I = H !== void 0 && gwi(_, H);
    if (!I) bTt(_);
    let D = I && a != null ? a : I ? globalThis.fetch : await R1a(a),
      S = await D(_, d("manual"));
    if (S.type === "opaqueredirect") {
      if (!b1a())
        throw new $T({ url: e, message: `Redirect from ${_} could not be validated and was blocked` });
      return await D(_, d("follow"));
    }
    let T = (u = S.headers) == null ? void 0 : u.get("location");
    if (B1a.has(S.status) && T) {
      KIr(S);
      let C = new URL(T, _).toString();
      if (f !== void 0 && !gwi(C, _)) {
        let O = f.get("user-agent");
        f = new Headers(O == null ? void 0 : { "user-agent": O });
      }
      _ = C;
      continue;
    }
    return S;
  }
  throw new $T({ url: e, message: `Too many redirects (max ${s})` });
}