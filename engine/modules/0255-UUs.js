
var UUs = "~effect/Deferred",
  NUs,
  Kg = () => {
    let e = Object.create(NUs);
    return ((e.resumes = void 0), (e.effect = void 0), e);
  },
  bU = () => $p(() => Kg()),
  Fl = (e) =>
    bS((t) => {
      if (e.effect) return t(e.effect);
      return (
        (e.resumes ??= []),
        e.resumes.push(t),
        $p(() => {
          let r = e.resumes.indexOf(t);
          e.resumes.splice(r, 1);
        })
      );
    }),
  FUs,
  SQ,
  I6,
  BUs,
  qin,
  hpe = (e) => $p(() => RUs(e)),
  RUs = (e) => e.effect !== void 0,
  D6,
  EE = (e, t) => {
    if (e.effect) return !1;
    if (((e.effect = t), e.resumes)) {
      for (let r = 0; r < e.resumes.length; r++) e.resumes[r](t);
      e.resumes = void 0;
    }
    return !0;
  },
  Jut;