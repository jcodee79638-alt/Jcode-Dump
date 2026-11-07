
var ese = ne(() => {
  R0();
  n2();
  Sj();
  aie();
  KH();
  wC();
  q_();
  Tv();
  orn();
  ((BBs = {
    ...wh,
    [oun]: oun,
    [Symbol.iterator]() {
      return this.params[Symbol.iterator]();
    },
    toJSON() {
      return { _id: "UrlParams", params: Object.fromEntries(this.params) };
    },
    [V_](e) {
      return RBs(this, e);
    },
    [W_]() {
      return YFe(this.params.flat());
    },
  }),
    (RBs = LW((e, t) => WBs(e.params, t.params))),
    (WBs = drn(srn([H2e(), H2e()]))),
    (UZt = aun([])),
    (cun = Wr(2, (e, t) => {
      let r = zW(t),
        s = r.params,
        a = new Set();
      for (let H = 0; H < s.length; H++) a.add(s[H][0]);
      for (let H = 0; H < e.params.length; H++) {
        if (a.has(e.params[H][0])) continue;
        s.push(e.params[H]);
      }
      return r;
    })));
  NZt = class NZt extends IE("UrlParamsError") {};
});