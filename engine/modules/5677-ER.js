
var ER = Ie(function (abA, jYi) {
  var ceH = /\s+/g;
  class CQe {
    constructor(e, t) {
      if (((t = ueH(t)), e instanceof CQe))
        if (e.loose === !!t.loose && e.includePrerelease === !!t.includePrerelease) return e;
        else return new CQe(e.raw, t);
      if (e instanceof Dwt)
        return ((this.raw = e.value), (this.set = [[e]]), (this.formatted = void 0), this);
      if (
        ((this.options = t),
        (this.loose = !!t.loose),
        (this.includePrerelease = !!t.includePrerelease),
        (this.raw = e.trim().replace(ceH, " ")),
        (this.set = this.raw
          .split("||")
          .map((r) => this.parseRange(r.trim()))
          .filter((r) => r.length)),
        !this.set.length)
      )
        throw TypeError(`Invalid SemVer Range: ${this.raw}`);
      if (this.set.length > 1) {
        let r = this.set[0];
        if (((this.set = this.set.filter((s) => !vYi(s[0]))), this.set.length === 0)) this.set = [r];
        else if (this.set.length > 1) {
          for (let s of this.set)
            if (s.length === 1 && $eH(s[0])) {
              this.set = [s];
              break;
            }
        }
      }
      this.formatted = void 0;
    }
    get range() {
      if (this.formatted === void 0) {
        this.formatted = "";
        for (let e = 0; e < this.set.length; e++) {
          if (e > 0) this.formatted += "||";
          let t = this.set[e];
          for (let r = 0; r < t.length; r++) {
            if (r > 0) this.formatted += " ";
            this.formatted += t[r].toString().trim();
          }
        }
      }
      return this.formatted;
    }
    format() {
      return this.range;
    }
    toString() {
      return this.range;
    }
    parseRange(e) {
      e = e.replace(LeH, "");
      let r = ((this.options.includePrerelease && _eH) | (this.options.loose && heH)) + ":" + e,
        s = TYi.get(r);
      if (s) return s;
      let a = this.options.loose,
        H = a ? ik[xb.HYPHENRANGELOOSE] : ik[xb.HYPHENRANGE];
      ((e = e.replace(H, beH(this.options.includePrerelease))),
        oE("hyphen replace", e),
        (e = e.replace(ik[xb.COMPARATORTRIM], peH)),
        oE("comparator trim", e),
        (e = e.replace(ik[xb.TILDETRIM], deH)),
        oE("tilde trim", e),
        (e = e.replace(ik[xb.CARETTRIM], meH)),
        oE("caret trim", e));
      let u = e
        .split(" ")
        .map((L) => geH(L, this.options))
        .join(" ")
        .split(/\s+/)
        .map((L) => veH(L, this.options));
      if (a)
        u = u.filter((L) => (oE("loose invalid filter", L, this.options), !!L.match(ik[xb.COMPARATORLOOSE])));
      oE("range list", u);
      let f = new Map(),
        d = u.map((L) => new Dwt(L, this.options));
      for (let L of d) {
        if (vYi(L)) return [L];
        f.set(L.value, L);
      }
      if (f.size > 1 && f.has("")) f.delete("");
      let _ = [...f.values()];
      return (TYi.set(r, _), _);
    }
    intersects(e, t) {
      if (!(e instanceof CQe)) throw TypeError("a Range is required");
      return this.set.some(
        (r) =>
          bYi(r, t) && e.set.some((s) => bYi(s, t) && r.every((a) => s.every((H) => a.intersects(H, t)))),
      );
    }
    test(e) {
      if (!e) return !1;
      if (typeof e === "string")
        try {
          e = new leH(e, this.options);
        } catch (t) {
          return !1;
        }
      for (let t = 0; t < this.set.length; t++) if (jeH(this.set[t], e, this.options)) return !0;
      return !1;
    }
  }
  jYi.exports = CQe;
  var AeH = SYi(),
    TYi = new AeH(),
    ueH = fwt(),
    Dwt = wQe(),
    oE = jQe(),
    leH = Mb(),
    {
      safeRe: ik,
      src: feH,
      t: xb,
      comparatorTrimReplace: peH,
      tildeTrimReplace: deH,
      caretTrimReplace: meH,
    } = Swe(),
    { FLAG_INCLUDE_PRERELEASE: _eH, FLAG_LOOSE: heH } = xwe(),
    LeH = new RegExp(feH[xb.BUILD], "g"),
    vYi = (e) => e.value === "<0.0.0-0",
    $eH = (e) => e.value === "",
    bYi = (e, t) => {
      let r = !0,
        s = e.slice(),
        a = s.pop();
      while (r && s.length) ((r = s.every((H) => a.intersects(H, t))), (a = s.pop()));
      return r;
    },
    geH = (e, t) => (
      (e = e.replace(ik[xb.BUILD], "")),
      oE("comp", e, t),
      (e = yeH(e, t)),
      oE("caret", e),
      (e = IeH(e, t)),
      oE("tildes", e),
      (e = xeH(e, t)),
      oE("xrange", e),
      (e = TeH(e, t)),
      oE("stars", e),
      e
    ),
    Mx = (e) => !e || e.toLowerCase() === "x" || e === "*",
    EeH = (e, t, r) => (Mx(e) && !Mx(t)) || (Mx(t) && r && !Mx(r)),
    IeH = (e, t) =>
      e
        .trim()
        .split(/\s+/)
        .map((r) => DeH(r, t))
        .join(" "),
    DeH = (e, t) => {
      let r = t.loose ? ik[xb.TILDELOOSE] : ik[xb.TILDE],
        s = t.includePrerelease ? "-0" : "";
      return e.replace(r, (a, H, u, f, d) => {
        oE("tilde", e, a, H, u, f, d);
        let _;
        if (Mx(H)) _ = "";
        else if (Mx(u)) _ = `>=${H}.0.0${s} <${+H + 1}.0.0-0`;
        else if (Mx(f)) _ = `>=${H}.${u}.0${s} <${H}.${+u + 1}.0-0`;
        else if (d) (oE("replaceTilde pr", d), (_ = `>=${H}.${u}.${f}-${d} <${H}.${+u + 1}.0-0`));
        else _ = `>=${H}.${u}.${f} <${H}.${+u + 1}.0-0`;
        return (oE("tilde return", _), _);
      });
    },
    yeH = (e, t) =>
      e
        .trim()
        .split(/\s+/)
        .map((r) => MeH(r, t))
        .join(" "),
    MeH = (e, t) => {
      oE("caret", e, t);
      let r = t.loose ? ik[xb.CARETLOOSE] : ik[xb.CARET],
        s = t.includePrerelease ? "-0" : "";
      return e.replace(r, (a, H, u, f, d) => {
        oE("caret", e, a, H, u, f, d);
        let _;
        if (Mx(H)) _ = "";
        else if (Mx(u)) _ = `>=${H}.0.0${s} <${+H + 1}.0.0-0`;
        else if (Mx(f))
          if (H === "0") _ = `>=${H}.${u}.0${s} <${H}.${+u + 1}.0-0`;
          else _ = `>=${H}.${u}.0${s} <${+H + 1}.0.0-0`;
        else if (d)
          if ((oE("replaceCaret pr", d), H === "0"))
            if (u === "0") _ = `>=${H}.${u}.${f}-${d} <${H}.${u}.${+f + 1}-0`;
            else _ = `>=${H}.${u}.${f}-${d} <${H}.${+u + 1}.0-0`;
          else _ = `>=${H}.${u}.${f}-${d} <${+H + 1}.0.0-0`;
        else if ((oE("no pr"), H === "0"))
          if (u === "0") _ = `>=${H}.${u}.${f} <${H}.${u}.${+f + 1}-0`;
          else _ = `>=${H}.${u}.${f} <${H}.${+u + 1}.0-0`;
        else _ = `>=${H}.${u}.${f} <${+H + 1}.0.0-0`;
        return (oE("caret return", _), _);
      });
    },
    xeH = (e, t) => (
      oE("replaceXRanges", e, t),
      e
        .split(/\s+/)
        .map((r) => SeH(r, t))
        .join(" ")
    ),
    SeH = (e, t) => {
      e = e.trim();
      let r = t.loose ? ik[xb.XRANGELOOSE] : ik[xb.XRANGE];
      return e.replace(r, (s, a, H, u, f, d) => {
        if ((oE("xRange", e, s, a, H, u, f, d), EeH(H, u, f))) return e;
        let _ = Mx(H),
          L = _ || Mx(u),
          I = L || Mx(f),
          D = I;
        if (a === "=" && D) a = "";
        if (((d = t.includePrerelease ? "-0" : ""), _))
          if (a === ">" || a === "<") s = "<0.0.0-0";
          else s = "*";
        else if (a && D) {
          if (L) u = 0;
          if (((f = 0), a === ">"))
            if (((a = ">="), L)) ((H = +H + 1), (u = 0), (f = 0));
            else ((u = +u + 1), (f = 0));
          else if (a === "<=")
            if (((a = "<"), L)) H = +H + 1;
            else u = +u + 1;
          if (a === "<") d = "-0";
          s = `${a + H}.${u}.${f}${d}`;
        } else if (L) s = `>=${H}.0.0${d} <${+H + 1}.0.0-0`;
        else if (I) s = `>=${H}.${u}.0${d} <${H}.${+u + 1}.0-0`;
        return (oE("xRange return", s), s);
      });
    },
    TeH = (e, t) => (oE("replaceStars", e, t), e.trim().replace(ik[xb.STAR], "")),
    veH = (e, t) => (
      oE("replaceGTE0", e, t),
      e.trim().replace(ik[t.includePrerelease ? xb.GTE0PRE : xb.GTE0], "")
    ),
    beH = (e) => (t, r, s, a, H, u, f, d, _, L, I, D) => {
      if (Mx(s)) r = "";
      else if (Mx(a)) r = `>=${s}.0.0${e ? "-0" : ""}`;
      else if (Mx(H)) r = `>=${s}.${a}.0${e ? "-0" : ""}`;
      else if (u) r = `>=${r}`;
      else r = `>=${r}${e ? "-0" : ""}`;
      if (Mx(_)) d = "";
      else if (Mx(L)) d = `<${+_ + 1}.0.0-0`;
      else if (Mx(I)) d = `<${_}.${+L + 1}.0-0`;
      else if (D) d = `<=${_}.${L}.${I}-${D}`;
      else if (e) d = `<${_}.${L}.${+I + 1}-0`;
      else d = `<=${d}`;
      return `${r} ${d}`.trim();
    },
    jeH = (e, t, r) => {
      for (let s = 0; s < e.length; s++) if (!e[s].test(t)) return !1;
      if (t.prerelease.length && !r.includePrerelease) {
        for (let s = 0; s < e.length; s++) {
          if ((oE(e[s].semver), e[s].semver === Dwt.ANY)) continue;
          if (e[s].semver.prerelease.length > 0) {
            let a = e[s].semver;
            if (a.major === t.major && a.minor === t.minor && a.patch === t.patch) return !0;
          }
        }
        return !1;
      }
      return !0;
    };
});