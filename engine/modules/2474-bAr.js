
var bAr = Ie(function (KAc, Lzn) {
  var k0t = Qj(),
    Vme = mzn(),
    { checkDevEngines: wko } = hzn(),
    kko = (e, t, r, s = !1) => {
      let a = s ? null : r,
        H = e.engines,
        u = { includePrerelease: !0 };
      if (!H) return;
      let f = a && H.node && !k0t.satisfies(a, H.node, u),
        d = t && H.npm && !k0t.satisfies(t, H.npm, u);
      if (f || d)
        throw Object.assign(Error("Unsupported engine"), {
          pkgid: e._id,
          current: { node: r, npm: t },
          required: H,
          code: "EBADENGINE",
        });
    },
    Oko = (e, t = !1, r = {}) => {
      if (t) return;
      let s = r.os || Vme.os(),
        a = r.cpu || Vme.cpu(),
        H = r.libc || Vme.libc(s),
        u = e.os ? vAr(s, e.os) : !0,
        f = e.cpu ? vAr(a, e.cpu) : !0,
        d = e.libc ? vAr(H, e.libc) : !0;
      if (e.libc && !H) d = !1;
      if (!u || !f || !d)
        throw Object.assign(Error("Unsupported platform"), {
          pkgid: e._id,
          current: { os: s, cpu: a, libc: H },
          required: { os: e.os, cpu: e.cpu, libc: e.libc },
          code: "EBADPLATFORM",
        });
    },
    vAr = (e, t) => {
      if (typeof t === "string") t = [t];
      if (t.length === 1 && t[0] === "any") return !0;
      let r = 0,
        s = !1;
      for (let a of t) {
        let H = a.charAt(0) === "!",
          u = H ? a.slice(1) : a;
        if (H) {
          if ((r++, e === u)) return !1;
        } else s = s || e === u;
      }
      return s || r === t.length;
    };
  Lzn.exports = { checkEngine: kko, checkPlatform: Oko, checkDevEngines: wko, currentEnv: Vme };
});