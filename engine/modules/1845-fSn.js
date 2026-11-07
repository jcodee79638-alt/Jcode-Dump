
var fSn = Ie(function (z5H, lSn) {
  var hno = Zsr(),
    uSn = rLt(),
    O2 = eLt(),
    nme = (e = "", t = "", r = !1) => {
      let s = [];
      if (((e = [].concat(e)), (t = [].concat(t)), !t.length)) return e;
      if (!e.length) return r ? O2.flatten(t).map((a) => `{${a}}`) : t;
      for (let a of e)
        if (Array.isArray(a)) for (let H of a) s.push(nme(H, t, r));
        else
          for (let H of t) {
            if (r === !0 && typeof H === "string") H = `{${H}}`;
            s.push(Array.isArray(H) ? nme(a, H, r) : a + H);
          }
      return O2.flatten(s);
    },
    Lno = (e, t = {}) => {
      let r = t.rangeLimit === void 0 ? 1000 : t.rangeLimit,
        s = (a, H = {}) => {
          a.queue = [];
          let u = H,
            f = H.queue;
          while (u.type !== "brace" && u.type !== "root" && u.parent) ((u = u.parent), (f = u.queue));
          if (a.invalid || a.dollar) {
            f.push(nme(f.pop(), uSn(a, t)));
            return;
          }
          if (a.type === "brace" && a.invalid !== !0 && a.nodes.length === 2) {
            f.push(nme(f.pop(), ["{}"]));
            return;
          }
          if (a.nodes && a.ranges > 0) {
            let I = O2.reduce(a.nodes);
            if (O2.exceedsLimit(...I, t.step, r))
              throw RangeError(
                "expanded array length exceeds range limit. Use options.rangeLimit to increase or disable the limit.",
              );
            let D = hno(...I, t);
            if (D.length === 0) D = uSn(a, t);
            (f.push(nme(f.pop(), D)), (a.nodes = []));
            return;
          }
          let d = O2.encloseBrace(a),
            _ = a.queue,
            L = a;
          while (L.type !== "brace" && L.type !== "root" && L.parent) ((L = L.parent), (_ = L.queue));
          for (let I = 0; I < a.nodes.length; I++) {
            let D = a.nodes[I];
            if (D.type === "comma" && a.type === "brace") {
              if (I === 1) _.push("");
              _.push("");
              continue;
            }
            if (D.type === "close") {
              f.push(nme(f.pop(), _, d));
              continue;
            }
            if (D.value && D.type !== "open") {
              _.push(nme(_.pop(), D.value));
              continue;
            }
            if (D.nodes) s(D, a);
          }
          return _;
        };
      return O2.flatten(s(e));
    };
  lSn.exports = Lno;
});