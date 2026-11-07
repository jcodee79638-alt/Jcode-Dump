
var _wn = Ie(function (ftc, mwn) {
  var lwn = V2(),
    eHr = kVe(),
    { ANY: Yar } = eHr,
    Zar = Vxe(),
    tHr = W2(),
    dmo = (e, t, r = {}) => {
      if (e === t) return !0;
      ((e = new lwn(e, r)), (t = new lwn(t, r)));
      let s = !1;
      e: for (let a of e.set) {
        for (let H of t.set) {
          let u = _mo(a, H, r);
          if (((s = s || u !== null), u)) continue e;
        }
        if (s) return !1;
      }
      return !0;
    },
    mmo = [new eHr(">=0.0.0-0")],
    fwn = [new eHr(">=0.0.0")],
    _mo = (e, t, r) => {
      if (e === t) return !0;
      if (e.length === 1 && e[0].semver === Yar)
        if (t.length === 1 && t[0].semver === Yar) return !0;
        else if (r.includePrerelease) e = mmo;
        else e = fwn;
      if (t.length === 1 && t[0].semver === Yar)
        if (r.includePrerelease) return !0;
        else t = fwn;
      let s = new Set(),
        a,
        H;
      for (let S of e)
        if (S.operator === ">" || S.operator === ">=") a = pwn(a, S, r);
        else if (S.operator === "<" || S.operator === "<=") H = dwn(H, S, r);
        else s.add(S.semver);
      if (s.size > 1) return null;
      let u;
      if (a && H) {
        if (((u = tHr(a.semver, H.semver, r)), u > 0)) return null;
        else if (u === 0 && (a.operator !== ">=" || H.operator !== "<=")) return null;
      }
      for (let S of s) {
        if (a && !Zar(S, String(a), r)) return null;
        if (H && !Zar(S, String(H), r)) return null;
        for (let T of t) if (!Zar(S, String(T), r)) return !1;
        return !0;
      }
      let f,
        d,
        _,
        L,
        I = H && !r.includePrerelease && H.semver.prerelease.length ? H.semver : !1,
        D = a && !r.includePrerelease && a.semver.prerelease.length ? a.semver : !1;
      if (I && I.prerelease.length === 1 && H.operator === "<" && I.prerelease[0] === 0) I = !1;
      for (let S of t) {
        if (
          ((L = L || S.operator === ">" || S.operator === ">="),
          (_ = _ || S.operator === "<" || S.operator === "<="),
          a)
        ) {
          if (D) {
            if (
              S.semver.prerelease &&
              S.semver.prerelease.length &&
              S.semver.major === D.major &&
              S.semver.minor === D.minor &&
              S.semver.patch === D.patch
            )
              D = !1;
          }
          if (S.operator === ">" || S.operator === ">=") {
            if (((f = pwn(a, S, r)), f === S && f !== a)) return !1;
          } else if (a.operator === ">=" && !S.test(a.semver)) return !1;
        }
        if (H) {
          if (I) {
            if (
              S.semver.prerelease &&
              S.semver.prerelease.length &&
              S.semver.major === I.major &&
              S.semver.minor === I.minor &&
              S.semver.patch === I.patch
            )
              I = !1;
          }
          if (S.operator === "<" || S.operator === "<=") {
            if (((d = dwn(H, S, r)), d === S && d !== H)) return !1;
          } else if (H.operator === "<=" && !S.test(H.semver)) return !1;
        }
        if (!S.operator && (H || a) && u !== 0) return !1;
      }
      if (a && _ && !H && u !== 0) return !1;
      if (H && L && !a && u !== 0) return !1;
      if (D || I) return !1;
      return !0;
    },
    pwn = (e, t, r) => {
      if (!e) return t;
      let s = tHr(e.semver, t.semver, r);
      return s > 0 ? e : s < 0 ? t : t.operator === ">" && e.operator === ">=" ? t : e;
    },
    dwn = (e, t, r) => {
      if (!e) return t;
      let s = tHr(e.semver, t.semver, r);
      return s < 0 ? e : s > 0 ? t : t.operator === "<" && e.operator === "<=" ? t : e;
    };
  mwn.exports = dmo;
});