
var Ahi = Ie(function (wLc, chi) {
  var A1t = Qj(),
    c1t = ky(),
    { relative: dna } = cr("path"),
    mna = c_r(),
    A_r = (e, t, r) => {
      if (typeof t === "string")
        try {
          t = c1t.resolve(e.name, t || "*", mna(r, r.edgesOut.get(e.name)));
        } catch (a) {
          return ((a.dependency = e.name), (a.requested = t), r.errors.push(a), !1);
        }
      if (!t) {
        let a = Error("Invalid dependency specifier");
        return ((a.dependency = e.name), (a.requested = t), r.errors.push(a), !1);
      }
      switch (t.type) {
        case "range":
          if (t.fetchSpec === "*") return !0;
        case "version":
          return A1t.satisfies(e.version, t.fetchSpec, !0);
        case "directory":
          return _na(e, t, r);
        case "file":
          return hna(e, t, r);
        case "alias":
          return A_r(e, t.subSpec, r);
        case "tag":
          return e.resolved && c1t(e.resolved).type === "remote";
        case "remote":
          return e.resolved === t.fetchSpec;
        case "git": {
          let a = c1t(e.resolved || ""),
            H = a.hosted,
            u = t.hosted,
            d = { noCommittish: !/^[a-fA-F0-9]{40,64}$/.test(t.gitCommittish || "") };
          if (!H) {
            if (a.fetchSpec !== t.fetchSpec) return !1;
          } else if (u?.ssh(d) !== H.ssh(d)) return !1;
          if (!t.gitRange) return !0;
          return A1t.satisfies(e.package.version, t.gitRange, { loose: !0 });
        }
        default:
          break;
      }
      let s = Error("Unsupported dependency type");
      return ((s.dependency = e.name), (s.requested = t), r.errors.push(s), !1);
    },
    _na = (e, t, r) => {
      let s = !!e.isLink;
      if (r.installLinks && !e.isWorkspace) return !s;
      return s && dna(e.realpath, t.fetchSpec) === "";
    },
    hna = (e, t) => {
      if (e.isLink) return !1;
      if (e.resolved) return e.resolved.replace(/\\/g, "/") === `file:${t.fetchSpec.replace(/\\/g, "/")}`;
      if (e.package._requested) return e.package._requested.saveSpec === t.saveSpec;
      return !1;
    };
  chi.exports = (e, t, r, s) => A_r(e, t, s) || (typeof r === "string" ? A_r(e, r, s) : !1);
});