
var _Dn = Ie(function (Q3H, mDn) {
  var F_t = cr("path"),
    Air = lDn(),
    fDn = (e) => Object.assign(Error(`not found: ${e}`), { code: "ENOENT" }),
    pDn = (e, t) => {
      let r = t.colon || ";",
        s =
          e.match(/\//) || e.match(/\\/)
            ? [""]
            : [process.cwd(), ...(t.path || process.env.PATH || "").split(r)],
        a = t.pathExt || process.env.PATHEXT || ".EXE;.CMD;.BAT;.COM",
        H = a.split(r);
      if (e.indexOf(".") !== -1 && H[0] !== "") H.unshift("");
      return { pathEnv: s, pathExt: H, pathExtExe: a };
    },
    dDn = (e, t, r) => {
      if (typeof t === "function") ((r = t), (t = {}));
      if (!t) t = {};
      let { pathEnv: s, pathExt: a, pathExtExe: H } = pDn(e, t),
        u = [],
        f = (_) =>
          new Promise((L, I) => {
            if (_ === s.length) return t.all && u.length ? L(u) : I(fDn(e));
            let D = s[_],
              S = /^".*"$/.test(D) ? D.slice(1, -1) : D,
              T = F_t.join(S, e),
              C = !S && /^\.[\\\/]/.test(e) ? e.slice(0, 2) + T : T;
            L(d(C, _, 0));
          }),
        d = (_, L, I) =>
          new Promise((D, S) => {
            if (I === a.length) return D(f(L + 1));
            let T = a[I];
            Air(_ + T, { pathExt: H }, (C, O) => {
              if (!C && O)
                if (t.all) u.push(_ + T);
                else return D(_ + T);
              return D(d(_, L, I + 1));
            });
          });
      return r ? f(0).then((_) => r(null, _), r) : f(0);
    },
    AQs = (e, t) => {
      t = t || {};
      let { pathEnv: r, pathExt: s, pathExtExe: a } = pDn(e, t),
        H = [];
      for (let u = 0; u < r.length; u++) {
        let f = r[u],
          d = /^".*"$/.test(f) ? f.slice(1, -1) : f,
          _ = F_t.join(d, e),
          L = !d && /^\.[\\\/]/.test(e) ? e.slice(0, 2) + _ : _;
        for (let I = 0; I < s.length; I++) {
          let D = L + s[I];
          try {
            if (Air.sync(D, { pathExt: a }))
              if (t.all) H.push(D);
              else return D;
          } catch (S) {}
        }
      }
      if (t.all && H.length) return H;
      if (t.nothrow) return null;
      throw fDn(e);
    };
  mDn.exports = dDn;
  dDn.sync = AQs;
});