
function L8s(e, t = zne) {
  let r = new Set();
  return async (s, a) => {
    let H = new Request(s, a),
      u = new URL(H.url);
    if (
      u.origin !== O0 ||
      u.protocol !== "https:" ||
      u.username ||
      u.password ||
      H.method !== "POST" ||
      u.pathname !== "/v1/chat/completions" ||
      u.search ||
      u.hash
    )
      throw new Sc();
    let f = new Headers(H.headers);
    (f.set("authorization", `Bearer ${await e()}`), f.set("X-Jac-Version", h_));
    try {
      let d = await Fen(H, f, t, e, Date.now, r);
      if (d.ok) return d;
      let _ = await A8s(d);
      throw new U0({
        message:
          d.status === 426
            ? new Sc("update").message
            : d.status === 401
              ? "Sign in again with jac login."
              : _
                ? _.message
                : d.status === 429
                  ? "Jac Code request limit reached. Check /usage and try again later."
                  : "Jac Code service is unavailable. Try again later.",
        url: `${O0}/v1/chat/completions`,
        requestBodyValues: void 0,
        statusCode: d.status,
        responseHeaders: _?.responseHeaders,
        isRetryable: !1,
      });
    } catch (d) {
      if (d instanceof U0) throw d;
      throw new U0({
        message:
          d instanceof Error && d.message === cQ
            ? cQ
            : "Jac Code request could not be completed. Try again later.",
        url: `${O0}/v1/chat/completions`,
        requestBodyValues: void 0,
        isRetryable: !1,
      });
    }
  };
}