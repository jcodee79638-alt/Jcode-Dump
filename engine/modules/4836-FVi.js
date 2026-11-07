
var FVi,
  H3a = (e = BVi) =>
    function (r, ...s) {
      if (r.length === 1) return r[0];
      let a = !1,
        H = [],
        u = r.reduce((L, I, D) => {
          if (/[?#]/.test(I)) a = !0;
          let S = s[D],
            T = (a ? encodeURIComponent : e)("" + S);
          if (
            D !== s.length &&
            (S == null ||
              (typeof S === "object" &&
                S.toString ===
                  Object.getPrototypeOf(Object.getPrototypeOf(S.hasOwnProperty ?? FVi) ?? FVi)?.toString))
          )
            ((T = S + ""),
              H.push({
                start: L.length + I.length,
                length: T.length,
                error: `Value of type ${Object.prototype.toString.call(S).slice(8, -1)} is not a valid path parameter`,
              }));
          return L + I + (D === s.length ? "" : T);
        }, ""),
        f = u.split(/[?#]/, 1)[0],
        d = /(?<=^|\/)(?:\.|%2e){1,2}(?=\/|$)/gi,
        _;
      while ((_ = d.exec(f)) !== null)
        H.push({
          start: _.index,
          length: _[0].length,
          error: `Value "${_[0]}" can't be safely passed as a path parameter`,
        });
      if ((H.sort((L, I) => L.start - I.start), H.length > 0)) {
        let L = 0,
          I = H.reduce((D, S) => {
            let T = " ".repeat(S.start - L),
              C = "^".repeat(S.length);
            return ((L = S.start + S.length), D + T + C);
          }, "");
        throw new bc(`Path parameters result in path with invalid segments:
${H.map((D) => D.error).join(`
`)}
${u}
${I}`);
      }
      return u;
    },
  Cn;