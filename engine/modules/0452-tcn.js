
var tcn = "~effect/collections/MutableHashMap",
  tFs,
  Ope = () => {
    let e = Object.create(tFs);
    return ((e.backing = new Map()), (e.buckets = new Map()), e);
  },
  rcn = (...e) => rFs(e),
  rFs = (e) => {
    let t = Ope();
    for (let [r, s] of e) P6(t, r, s);
    return t;
  },
  tw,
  RBe,
  CYt = (e) => typeof e !== "object" && typeof e !== "function",
  ncn = (e) => e.backing.values(),
  nFs = (e, t, r) => {
    for (let s = 0, a = t.length; s < a; s++)
      if (hp(r, t[s])) {
        let H = t[s];
        return (RBe.set(r, H), Lo(e.backing.get(H)));
      }
    return eH();
  },
  WBe,
  P6,
  iFs = (e, t) => {
    for (let r = 0, s = e.length; r < s; r++) if (hp(t, e[r])) return (RBe.set(t, e[r]), e[r]);
  },
  L1,
  VBe = (e) => (e.backing.clear(), e.buckets.clear(), e),
  Upe = (e) => e.backing.size;