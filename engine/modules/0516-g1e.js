
var g1e = ne(() => {
  R0();
  BH();
  lD();
  KH();
  Hf();
  Yu();
  jW();
  bie();
  iRe = _6((e) => {
    switch (e._tag) {
      case "Declaration": {
        let t = e.annotations?.[Zye];
        if (Fq(t)) {
          let r = t(e.typeParameters),
            s = iRe(r.to);
          return x$(e, s === r.to ? [r] : [new S$(s, r.transformation)]);
        }
        return e;
      }
      case "Objects":
      case "Arrays":
        return e.recur((t) => {
          let r = t.context?.defaultValue;
          if (r) return x$(iRe(t), r);
          return iRe(t);
        });
      case "Suspend":
        return e.recur(iRe);
      default:
        return e;
    }
  });
  Sft = _6((e) => {
    let t,
      r = zQt(e),
      s = e.checks ?? r,
      a = (s ? s[s.length - 1].annotations : e.annotations)?.parseOptions;
    if (!e.context && !e.encoding && !e.checks && !r)
      return (u, f) => {
        if (((t ??= e.getParser(Sft)), a)) f = { ...f, ...a };
        return t(u, f);
      };
    let H = Plt(e) || Xye(e) || (UQ(e) && e.typeParameters.length > 0);
    return (u, f) => {
      if (a) f = { ...f, ...a };
      let d = e.encoding,
        _;
      if (d) {
        let I = d,
          D = I.length;
        for (let S = D - 1; S >= 0; S--) {
          let T = I[S],
            C = T.to,
            O = Sft(C);
          if (((_ = _ ? _1(_, (B) => O(B, f)) : O(u, f)), T.transformation._tag === "Transformation")) {
            let B = T.transformation.decode;
            _ = _1(_, (V) => B.run(V, f));
          } else _ = T.transformation.decode(_, f);
        }
        _ = zC(_, (S) => new kQt(e, u, S));
      }
      t ??= e.getParser(Sft);
      let L = _ ? _1(_, (I) => t(I, f)) : t(u, f);
      if (r && !f?.disableChecks)
        L = _1(L, (I) => {
          if (Nu(u) && Nu(I)) {
            let D = [];
            if ((PBe(r, u.value, D, e, f), TS(D))) return bn(new XM(e, u, D));
          }
          return Jt(I);
        });
      if (e.checks && !f?.disableChecks) {
        let I = e.checks;
        if (f?.errors === "all" && H && Nu(u))
          L = MQt(L, (D) => {
            let S = [];
            PBe(
              I.filter((C) => C.annotations?.[Glt]),
              u.value,
              S,
              e,
              f,
            );
            let T = TS(S)
              ? D._tag === "Composite" && D.ast === e
                ? new XM(e, D.actual, [...D.issues, ...S])
                : new XM(e, u, [D, ...S])
              : D;
            return bn(T);
          });
        L = _1(L, (D) => {
          if (Nu(D)) {
            let S = D.value,
              T = [];
            if ((PBe(I, S, T, e, f), TS(T))) return bn(new XM(e, D, T));
          }
          return Jt(D);
        });
      }
      return L;
    };
  });
});