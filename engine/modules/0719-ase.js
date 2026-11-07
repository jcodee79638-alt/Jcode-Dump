
var ase = (e) => PYt(PHn(m3s(e), (t) => [t])),
  m3s = (e) =>
    T$((t) => {
      let r = e.evaluate();
      return Jt(_3s({ ...e, writable: r, pull: t }));
    }),
  _3s = (e) =>
    e.pull.pipe(
      Hi((t) => {
        let r = 0;
        return Fd(function s(a) {
          for (; r < t.length;)
            if (!e.writable.write(t[r++], e.encoding)) {
              e.writable.once("drain", () => s(a));
              return;
            }
          a(ti);
        });
      }),
      CS({ disableYield: !0 }),
      Yq(
        Fd((t) => {
          let r = (s) => t(bn(e.onError(s)));
          return (
            e.writable.once("error", r),
            jn(() => {
              e.writable.off("error", r);
            })
          );
        }),
      ),
      e.endOnDone !== !1
        ? jS((t) => {
            if ("closed" in e.writable && e.writable.closed) return Xp(t);
            return Fd((r) => {
              (e.writable.once("finish", () => r(Xp(t))), e.writable.end());
            });
          })
        : Za,
    );