
var V2 = Ie(function (etc, wCn) {
  var hdo = /\s+/g;
  class wVe {
    constructor(e, t) {
      if (((t = $do(t)), e instanceof wVe))
        if (e.loose === !!t.loose && e.includePrerelease === !!t.includePrerelease) return e;
        else return new wVe(e.raw, t);
      if (e instanceof F$t)
        return ((this.raw = e.value), (this.set = [[e]]), (this.formatted = void 0), this);
      if (
        ((this.options = t),
        (this.loose = !!t.loose),
        (this.includePrerelease = !!t.includePrerelease),
        (this.raw = e.trim().replace(hdo, " ")),
        (this.set = this.raw
          .split("||")
          .map((r) => this.parseRange(r.trim()))
          .filter((r) => r.length)),
        !this.set.length)
      )
        throw TypeError(`Invalid SemVer Range: ${this.raw}`);
      if (this.set.length > 1) {
        let r = this.set[0];
        if (((this.set = this.set.filter((s) => !PCn(s[0]))), this.set.length === 0)) this.set = [r];
        else if (this.set.length > 1) {
          for (let s of this.set)
            if (s.length === 1 && Tdo(s[0])) {
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
      e = e.replace(Sdo, "");
      let r = ((this.options.includePrerelease && Mdo) | (this.options.loose && xdo)) + ":" + e,
        s = jCn.get(r);
      if (s) return s;
      let a = this.options.loose,
        H = a ? yw[eb.HYPHENRANGELOOSE] : yw[eb.HYPHENRANGE];
      ((e = e.replace(H, Ndo(this.options.includePrerelease))),
        eE("hyphen replace", e),
        (e = e.replace(yw[eb.COMPARATORTRIM], Ido)),
        eE("comparator trim", e),
        (e = e.replace(yw[eb.TILDETRIM], Ddo)),
        eE("tilde trim", e),
        (e = e.replace(yw[eb.CARETTRIM], ydo)),
        eE("caret trim", e));
      let u = e
        .split(" ")
        .map((L) => vdo(L, this.options))
        .join(" ")
        .split(/\s+/)
        .map((L) => Udo(L, this.options));
      if (a)
        u = u.filter((L) => (eE("loose invalid filter", L, this.options), !!L.match(yw[eb.COMPARATORLOOSE])));
      eE("range list", u);
      let f = new Map(),
        d = u.map((L) => new F$t(L, this.options));
      for (let L of d) {
        if (PCn(L)) return [L];
        f.set(L.value, L);
      }
      if (f.size > 1 && f.has("")) f.delete("");
      let _ = [...f.values()];
      return (jCn.set(r, _), _);
    }
    intersects(e, t) {
      if (!(e instanceof wVe)) throw TypeError("a Range is required");
      return this.set.some(
        (r) =>
          CCn(r, t) && e.set.some((s) => CCn(s, t) && r.every((a) => s.every((H) => a.intersects(H, t)))),
      );
    }
    test(e) {
      if (!e) return !1;
      if (typeof e === "string")
        try {
          e = new gdo(e, this.options);
        } catch (t) {
          return !1;
        }
      for (let t = 0; t < this.set.length; t++) if (Fdo(this.set[t], e, this.options)) return !0;
      return !1;
    }
  }
  wCn.exports = wVe;
  var Ldo = bCn(),
    jCn = new Ldo(),
    $do = S$t(),
    F$t = kVe(),
    eE = PVe(),
    gdo = Zv(),
    {
      safeRe: yw,
      src: Edo,
      t: eb,
      comparatorTrimReplace: Ido,
      tildeTrimReplace: Ddo,
      caretTrimReplace: ydo,
    } = Wxe(),
    { FLAG_INCLUDE_PRERELEASE: Mdo, FLAG_LOOSE: xdo } = Rxe(),
    Sdo = new RegExp(Edo[eb.BUILD], "g"),
    PCn = (e) => e.value === "<0.0.0-0",
    Tdo = (e) => e.value === "",
    CCn = (e, t) => {
      let r = !0,
        s = e.slice(),
        a = s.pop();
      while (r && s.length) ((r = s.every((H) => a.intersects(H, t))), (a = s.pop()));
      return r;
    },
    vdo = (e, t) => (
      (e = e.replace(yw[eb.BUILD], "")),
      eE("comp", e, t),
      (e = Pdo(e, t)),
      eE("caret", e),
      (e = bdo(e, t)),
      eE("tildes", e),
      (e = wdo(e, t)),
      eE("xrange", e),
      (e = Odo(e, t)),
      eE("stars", e),
      e
    ),
    Mw = (e) => !e || e.toLowerCase() === "x" || e === "*",
    bdo = (e, t) =>
      e
        .trim()
        .split(/\s+/)
        .map((r) => jdo(r, t))
        .join(" "),
    jdo = (e, t) => {
      let r = t.loose ? yw[eb.TILDELOOSE] : yw[eb.TILDE];
      return e.replace(r, (s, a, H, u, f) => {
        eE("tilde", e, s, a, H, u, f);
        let d;
        if (Mw(a)) d = "";
        else if (Mw(H)) d = `>=${a}.0.0 <${+a + 1}.0.0-0`;
        else if (Mw(u)) d = `>=${a}.${H}.0 <${a}.${+H + 1}.0-0`;
        else if (f) (eE("replaceTilde pr", f), (d = `>=${a}.${H}.${u}-${f} <${a}.${+H + 1}.0-0`));
        else d = `>=${a}.${H}.${u} <${a}.${+H + 1}.0-0`;
        return (eE("tilde return", d), d);
      });
    },
    Pdo = (e, t) =>
      e
        .trim()
        .split(/\s+/)
        .map((r) => Cdo(r, t))
        .join(" "),
    Cdo = (e, t) => {
      eE("caret", e, t);
      let r = t.loose ? yw[eb.CARETLOOSE] : yw[eb.CARET],
        s = t.includePrerelease ? "-0" : "";
      return e.replace(r, (a, H, u, f, d) => {
        eE("caret", e, a, H, u, f, d);
        let _;
        if (Mw(H)) _ = "";
        else if (Mw(u)) _ = `>=${H}.0.0${s} <${+H + 1}.0.0-0`;
        else if (Mw(f))
          if (H === "0") _ = `>=${H}.${u}.0${s} <${H}.${+u + 1}.0-0`;
          else _ = `>=${H}.${u}.0${s} <${+H + 1}.0.0-0`;
        else if (d)
          if ((eE("replaceCaret pr", d), H === "0"))
            if (u === "0") _ = `>=${H}.${u}.${f}-${d} <${H}.${u}.${+f + 1}-0`;
            else _ = `>=${H}.${u}.${f}-${d} <${H}.${+u + 1}.0-0`;
          else _ = `>=${H}.${u}.${f}-${d} <${+H + 1}.0.0-0`;
        else if ((eE("no pr"), H === "0"))
          if (u === "0") _ = `>=${H}.${u}.${f}${s} <${H}.${u}.${+f + 1}-0`;
          else _ = `>=${H}.${u}.${f}${s} <${H}.${+u + 1}.0-0`;
        else _ = `>=${H}.${u}.${f} <${+H + 1}.0.0-0`;
        return (eE("caret return", _), _);
      });
    },
    wdo = (e, t) => (
      eE("replaceXRanges", e, t),
      e
        .split(/\s+/)
        .map((r) => kdo(r, t))
        .join(" ")
    ),
    kdo = (e, t) => {
      e = e.trim();
      let r = t.loose ? yw[eb.XRANGELOOSE] : yw[eb.XRANGE];
      return e.replace(r, (s, a, H, u, f, d) => {
        eE("xRange", e, s, a, H, u, f, d);
        let _ = Mw(H),
          L = _ || Mw(u),
          I = L || Mw(f),
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
        return (eE("xRange return", s), s);
      });
    },
    Odo = (e, t) => (eE("replaceStars", e, t), e.trim().replace(yw[eb.STAR], "")),
    Udo = (e, t) => (
      eE("replaceGTE0", e, t),
      e.trim().replace(yw[t.includePrerelease ? eb.GTE0PRE : eb.GTE0], "")
    ),
    Ndo = (e) => (t, r, s, a, H, u, f, d, _, L, I, D) => {
      if (Mw(s)) r = "";
      else if (Mw(a)) r = `>=${s}.0.0${e ? "-0" : ""}`;
      else if (Mw(H)) r = `>=${s}.${a}.0${e ? "-0" : ""}`;
      else if (u) r = `>=${r}`;
      else r = `>=${r}${e ? "-0" : ""}`;
      if (Mw(_)) d = "";
      else if (Mw(L)) d = `<${+_ + 1}.0.0-0`;
      else if (Mw(I)) d = `<${_}.${+L + 1}.0-0`;
      else if (D) d = `<=${_}.${L}.${I}-${D}`;
      else if (e) d = `<${_}.${L}.${+I + 1}-0`;
      else d = `<=${d}`;
      return `${r} ${d}`.trim();
    },
    Fdo = (e, t, r) => {
      for (let s = 0; s < e.length; s++) if (!e[s].test(t)) return !1;
      if (t.prerelease.length && !r.includePrerelease) {
        for (let s = 0; s < e.length; s++) {
          if ((eE(e[s].semver), e[s].semver === F$t.ANY)) continue;
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