
var vPn = Ie(function (Eec, TPn) {
  var Kfo = Uar(),
    zfo = (e) => {
      let t = e.indexOf("#"),
        r = e.indexOf("/"),
        s = e.indexOf("/", r + 1),
        a = e.indexOf(":"),
        H = /\s/.exec(e),
        u = e.indexOf("@"),
        f = !H || (t > -1 && H.index > t),
        d = u === -1 || (t > -1 && u > t),
        _ = a === -1 || (t > -1 && a > t),
        L = s === -1 || (t > -1 && s > t),
        I = r > 0,
        D = t > -1 ? e[t - 1] !== "/" : !e.endsWith("/"),
        S = !e.startsWith(".");
      return f && I && D && S && d && _ && L;
    };
  TPn.exports = (e, t, { gitHosts: r, protocols: s }) => {
    if (!e) return;
    let a = zfo(e) ? `github:${e}` : e,
      H = Kfo(a, s);
    if (!H) return;
    let u = r.byShortcut[H.protocol],
      f = r.byDomain[H.hostname.startsWith("www.") ? H.hostname.slice(4) : H.hostname],
      d = u || f;
    if (!d) return;
    let _ = r[u || f],
      L = null;
    if (s[H.protocol]?.auth && (H.username || H.password))
      L = `${H.username}${H.password ? ":" + H.password : ""}`;
    let I = null,
      D = null,
      S = null,
      T = null;
    try {
      if (u) {
        let C = H.pathname.startsWith("/") ? H.pathname.slice(1) : H.pathname,
          O = C.indexOf("@");
        if (O > -1) C = C.slice(O + 1);
        let B = C.lastIndexOf("/");
        if (B > -1) {
          if (((D = decodeURIComponent(C.slice(0, B))), !D)) D = null;
          S = decodeURIComponent(C.slice(B + 1));
        } else S = decodeURIComponent(C);
        if (S.endsWith(".git")) S = S.slice(0, -4);
        if (H.hash) I = decodeURIComponent(H.hash.slice(1));
        T = "shortcut";
      } else {
        if (!_.protocols.includes(H.protocol)) return;
        let C = _.extract(H);
        if (!C) return;
        ((D = C.user && decodeURIComponent(C.user)),
          (S = decodeURIComponent(C.project)),
          (I = decodeURIComponent(C.committish)),
          (T = s[H.protocol]?.name || H.protocol.slice(0, -1)));
      }
    } catch (C) {
      if (C instanceof URIError) return;
      else throw C;
    }
    return [d, D, L, S, I, T, t];
  };
});