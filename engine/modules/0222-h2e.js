
var h2e = ne(() => {
  KH();
  ((vOs = Wr(2, (e, t) => {
    let r = Math.max(1, Math.floor(t));
    return {
      [Symbol.iterator]() {
        let s = e[Symbol.iterator]();
        return {
          next() {
            if (s === void 0) return { done: !0, value: void 0 };
            let a = [];
            for (let H = 0; H < r; H++) {
              let u = s.next();
              if (u.done)
                return ((s = void 0), a.length === 0 ? { done: !0, value: void 0 } : { done: !1, value: a });
              a.push(u.value);
            }
            return { done: !1, value: a };
          },
        };
      },
    };
  })),
    (bOs = {
      [Symbol.iterator]() {
        return jOs;
      },
    }),
    (jOs = {
      next() {
        return { done: !0, value: void 0 };
      },
    }));
});