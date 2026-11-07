
var I7e = Ie(function (QAc, Izn) {
  var N0t = ky(),
    h5 = Qj(),
    { checkEngine: Bko } = bAr(),
    Rko = gSe(),
    CAr = (e, t, r) => {
      try {
        return (Bko(e, t, r), !0);
      } catch (s) {
        return !1;
      }
    },
    O0t = (e, t, r) => !e || !e[t] || Date.parse(e[t]) <= r,
    Wko = { includePrerelease: !0, loose: !0 },
    U0t = (e, t) => t && h5.satisfies(e, t, Wko),
    wAr = (e, t) => (e && U0t(e.version, t) ? { ...e, _shouldAvoid: !0 } : e),
    E7e = (e, t, r) => {
      let {
          defaultTag: s = "latest",
          before: a = null,
          nodeVersion: H = process.version,
          npmVersion: u = null,
          includeStaged: f = !1,
          avoid: d = null,
          avoidStrict: _ = !1,
        } = r,
        { name: L, time: I } = e,
        D = e.versions || {};
      if (_) {
        let Ae = { ...r, avoidStrict: !1 },
          le = E7e(e, t, Ae);
        if (!le || !le._shouldAvoid) return le;
        let Be = E7e(e, `^${le.version}`, Ae);
        if (!Be || !Be._shouldAvoid) return { ...Be, _outsideDependencyRange: !0, _isSemVerMajor: !1 };
        let Te = E7e(e, "*", Ae);
        if (!Te || !Te._shouldAvoid) return { ...Te, _outsideDependencyRange: !0, _isSemVerMajor: !0 };
        throw Object.assign(Error(`No avoidable versions for ${L}`), {
          code: "ETARGET",
          name: L,
          wanted: t,
          avoid: d,
          before: a,
          versions: Object.keys(D),
        });
      }
      let S = (f && e.stagedVersions && e.stagedVersions.versions) || {},
        T = (e.policyRestrictions && e.policyRestrictions.versions) || {},
        C = a && I ? +new Date(a) : 1 / 0,
        B = N0t.resolve(L, t || s).type,
        V = e["dist-tags"] || {};
      if (B !== "tag" && B !== "version" && B !== "range")
        throw Error("Only tag, version, and range are supported");
      if (t && B === "tag") {
        let Ae = V[t];
        if (O0t(I, Ae, C)) return wAr(D[Ae] || S[Ae] || T[Ae], d);
        else return E7e(e, `<=${Ae}`, r);
      }
      if (t && B === "version") {
        let Ae = h5.clean(t, { loose: !0 }),
          le = D[Ae] || S[Ae] || T[Ae];
        return O0t(I, Ae, C) ? wAr(le, d) : null;
      }
      let q = B === "range" ? t : "*",
        Z = V[s];
      if (Z && (q === "*" || h5.satisfies(Z, q, { loose: !0 })) && !T[Z] && !U0t(Z, d)) {
        let Ae = D[Z];
        if (Ae && O0t(I, Z, C) && CAr(Ae, u, H) && !Ae.deprecated && !S[Z]) return Ae;
      }
      let se = Object.entries(D)
        .concat(Object.entries(S))
        .concat(Object.entries(T))
        .filter(([Ae]) => O0t(I, Ae, C));
      if (!se.length)
        throw Object.assign(Error(`No versions available for ${L}`), {
          code: "ENOVERSIONS",
          name: L,
          type: B,
          wanted: t,
          before: a,
          versions: Object.keys(D),
        });
      let ae = { loose: !0 },
        z = se
          .filter(([Ae]) => h5.satisfies(Ae, q, { loose: !0 }))
          .sort((Ae, le) => {
            let [Be, Te] = Ae,
              [Lt, Ht] = le,
              Se = !U0t(Be, d),
              _e = !U0t(Lt, d),
              we = !T[Be],
              Pe = !T[Lt],
              ye = !S[Be],
              ot = !S[Lt],
              Ee = !Te.deprecated,
              Ve = !Ht.deprecated,
              Fe = CAr(Te, u, H),
              it = CAr(Ht, u, H);
            return (
              _e - Se ||
              Pe - we ||
              ot - ye ||
              (Ve && it) - (Ee && Fe) ||
              it - Fe ||
              Ve - Ee ||
              h5.rcompare(Be, Lt, ae)
            );
          });
      return wAr(z[0] && z[0][1], d);
    };
  Izn.exports = (e, t, r = {}) => {
    let s = E7e(e, t, r),
      a = s && Rko(s),
      H = e.policyRestrictions,
      u = (H && H.versions) || {};
    if (a && !u[a.version]) return a;
    let { before: f = null, defaultTag: d = "latest" } = r,
      _ = f ? new Date(f).toLocaleString() : "",
      { name: L } = e,
      I = `${L}@${t}` + (f ? ` with a date before ${_}` : ""),
      D = a && !!u[a.version],
      S = D ? H.message : "",
      T = !D
        ? `No matching version found for ${I}.`
        : `Could not download ${I} due to policy violations:
${S}`,
      C = D ? "E403" : "ETARGET";
    throw Object.assign(Error(T), {
      code: C,
      type: N0t.resolve(e.name, t).type,
      wanted: t,
      versions: Object.keys(e.versions ?? {}),
      name: L,
      distTags: e["dist-tags"],
      defaultTag: d,
    });
  };
});