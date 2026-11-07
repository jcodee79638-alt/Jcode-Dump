
var Aii = Ie(function (opc, cii) {
  var j5 = klr(),
    { Response: $3o } = uTe(),
    g3o = Ufr(),
    { log: yIt } = mg(),
    { redact: E3o } = y4e(),
    I3o = async ({ method: e, uri: t, res: r, startTime: s, auth: a, opts: H }) => {
      if (((H = { ...g3o, ...H }), r.headers.has("npm-notice") && !r.headers.has("x-local-cache")))
        yIt.notice("", r.headers.get("npm-notice"));
      if (r.status >= 400) {
        if ((Hii(e, r, s), a && a.scopeAuthKey && !a.token && !a.auth))
          yIt.warn(
            "registry",
            `No auth for URI, but auth present for scoped registry.

URI: ${t}
Scoped Registry Key: ${a.scopeAuthKey}

More info here: https://github.com/npm/cli/wiki/No-auth-for-URI,-but-auth-present-for-scoped-registry`,
          );
        return D3o(e, r, s, H);
      } else {
        if ((r.body.on("end", () => Hii(e, r, s, H)), H.ignoreBody))
          return (r.body.resume(), new $3o(null, r));
        return r;
      }
    };
  cii.exports = I3o;
  function Hii(e, t, r) {
    let s = Date.now() - r,
      a = t.headers.get("x-fetch-attempts"),
      H = a && a > 1 ? ` attempt #${a}` : "",
      u = t.headers.get("x-local-cache-status"),
      f = u ? ` (cache ${u})` : "",
      d = E3o(t.url);
    if (u === "hit") yIt.http("cache", `${d} ${s}ms${H}${f}`);
    else yIt.http("fetch", `${e.toUpperCase()} ${t.status} ${d} ${s}ms${H}${f}`);
  }
  function D3o(e, t, r, s) {
    return t
      .buffer()
      .catch(() => null)
      .then((a) => {
        let H = a;
        try {
          H = JSON.parse(a.toString("utf8"));
        } catch {}
        if (t.status === 401 && t.headers.get("www-authenticate")) {
          let u = t.headers
            .get("www-authenticate")
            .split(/,\s*/)
            .map((f) => f.toLowerCase());
          if (u.indexOf("ipaddress") !== -1) throw new j5.HttpErrorAuthIPAddress(e, t, H, s.spec);
          else if (u.indexOf("otp") !== -1) throw new j5.HttpErrorAuthOTP(e, t, H, s.spec);
          else throw new j5.HttpErrorAuthUnknown(e, t, H, s.spec);
        } else if (t.status === 401 && a != null && /one-time pass/.test(a.toString("utf8")))
          throw new j5.HttpErrorAuthOTP(e, t, H, s.spec);
        else throw new j5.HttpErrorGeneral(e, t, H, s.spec);
      });
  }
});