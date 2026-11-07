
var $Q = ne(() => {
  KH();
  Tv();
  ((POs = Object.fromEntries),
    (COs = Wr(2, (e, t) => Object.hasOwn(e, t))),
    (vv = Wr(2, (e, t) => {
      let r = { ...e };
      for (let s of $2e(e)) r[s] = t(e[s], s);
      return r;
    })),
    (arn = Wr(2, (e, t) => {
      let r = {};
      for (let s of $2e(e)) {
        let [a, H] = t(e[s], s);
        r[a] = H;
      }
      return r;
    })),
    (wOs = Wr(2, (e, t) => {
      let r = iut();
      for (let s of $2e(e)) {
        let a = t(e[s], s);
        if (gW(a)) r[s] = a.success;
      }
      return r;
    })),
    (kKt = Wr(2, (e, t) => {
      let r = iut();
      for (let s of $2e(e)) if (t(e[s], s)) r[s] = e[s];
      return r;
    })));
});