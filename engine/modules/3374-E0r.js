
var E0r = Ie(function (aTi) {
  Object.defineProperty(aTi, "__esModule", { value: !0 });
  aTi.DnsTxt = void 0;
  class g0r {
    constructor(e = {}) {
      this.binary = e ? e.binary : !1;
    }
    encode(e = {}) {
      return Object.entries(e).map(([t, r]) => {
        let s = `${t}=${r}`;
        return Buffer.from(s);
      });
    }
    decode(e) {
      var t = {};
      try {
        let s = e.toString().split(/=(.+)/),
          a = s[0],
          H = s[1];
        t[a] = H;
      } catch (r) {}
      return t;
    }
    decodeAll(e) {
      return e
        .filter((t) => t.length > 1)
        .map((t) => this.decode(t))
        .reduce((t, r) => {
          var s = t;
          let [a] = Object.keys(r),
            [H] = Object.values(r);
          return ((s[a] = H), s);
        }, {});
    }
  }
  aTi.DnsTxt = g0r;
  aTi.default = g0r;
});