
var Tsn,
  vsn,
  bsn,
  jsn,
  lNs,
  Psn = (e) => {
    let t = e.schedule ? gpe(e.schedule) : lNs;
    if (e.while)
      t = eBe(t, ({ input: r }) => {
        let s = e.while(r);
        return L_(s) ? s : Mu(s);
      });
    if (e.until)
      t = eBe(t, ({ input: r }) => {
        let s = e.until(r);
        return L_(s) ? $_(s, (a) => !a) : Mu(!s);
      });
    if (e.times !== void 0) t = eBe(t, ({ attempt: r }) => Mu(r <= e.times));
    return t;
  };