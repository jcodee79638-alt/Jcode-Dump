
var Zfr = Ie(function (Epc, Hsi) {
  function SWo(e) {
    ((r.debug = r),
      (r.default = r),
      (r.coerce = d),
      (r.disable = u),
      (r.enable = a),
      (r.enabled = f),
      (r.humanize = asi()),
      (r.destroy = _),
      Object.keys(e).forEach((L) => {
        r[L] = e[L];
      }),
      (r.names = []),
      (r.skips = []),
      (r.formatters = {}));
    function t(L) {
      let I = 0;
      for (let D = 0; D < L.length; D++) ((I = (I << 5) - I + L.charCodeAt(D)), (I |= 0));
      return r.colors[Math.abs(I) % r.colors.length];
    }
    r.selectColor = t;
    function r(L) {
      let I,
        D = null,
        S,
        T;
      function C(...O) {
        if (!C.enabled) return;
        let B = C,
          V = Number(new Date()),
          q = V - (I || V);
        if (
          ((B.diff = q),
          (B.prev = I),
          (B.curr = V),
          (I = V),
          (O[0] = r.coerce(O[0])),
          typeof O[0] !== "string")
        )
          O.unshift("%O");
        let Z = 0;
        ((O[0] = O[0].replace(/%([a-zA-Z%])/g, (ae, z) => {
          if (ae === "%%") return "%";
          Z++;
          let Ae = r.formatters[z];
          if (typeof Ae === "function") {
            let le = O[Z];
            ((ae = Ae.call(B, le)), O.splice(Z, 1), Z--);
          }
          return ae;
        })),
          r.formatArgs.call(B, O),
          (B.log || r.log).apply(B, O));
      }
      if (
        ((C.namespace = L),
        (C.useColors = r.useColors()),
        (C.color = r.selectColor(L)),
        (C.extend = s),
        (C.destroy = r.destroy),
        Object.defineProperty(C, "enabled", {
          enumerable: !0,
          configurable: !1,
          get: () => {
            if (D !== null) return D;
            if (S !== r.namespaces) ((S = r.namespaces), (T = r.enabled(L)));
            return T;
          },
          set: (O) => {
            D = O;
          },
        }),
        typeof r.init === "function")
      )
        r.init(C);
      return C;
    }
    function s(L, I) {
      let D = r(this.namespace + (typeof I > "u" ? ":" : I) + L);
      return ((D.log = this.log), D);
    }
    function a(L) {
      (r.save(L), (r.namespaces = L), (r.names = []), (r.skips = []));
      let I = (typeof L === "string" ? L : "").trim().replace(/\s+/g, ",").split(",").filter(Boolean);
      for (let D of I)
        if (D[0] === "-") r.skips.push(D.slice(1));
        else r.names.push(D);
    }
    function H(L, I) {
      let D = 0,
        S = 0,
        T = -1,
        C = 0;
      while (D < L.length)
        if (S < I.length && (I[S] === L[D] || I[S] === "*"))
          if (I[S] === "*") ((T = S), (C = D), S++);
          else (D++, S++);
        else if (T !== -1) ((S = T + 1), C++, (D = C));
        else return !1;
      while (S < I.length && I[S] === "*") S++;
      return S === I.length;
    }
    function u() {
      let L = [...r.names, ...r.skips.map((I) => "-" + I)].join(",");
      return (r.enable(""), L);
    }
    function f(L) {
      for (let I of r.skips) if (H(L, I)) return !1;
      for (let I of r.names) if (H(L, I)) return !0;
      return !1;
    }
    function d(L) {
      if (L instanceof Error) return L.stack || L.message;
      return L;
    }
    function _() {
      console.warn(
        "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.",
      );
    }
    return (r.enable(r.load()), r);
  }
  Hsi.exports = SWo;
});