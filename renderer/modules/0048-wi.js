
function wi(e) {
  const n = sa(() => e.children),
    i = Pe(() => {
      const s = n(),
        l = Array.isArray(s) ? s : [s];
      let a = () => {};
      for (let c = 0; c < l.length; c++) {
        const d = c,
          f = l[c],
          u = a,
          h = Pe(() => (u() ? void 0 : f.when), void 0, void 0),
          m = f.keyed ? h : Pe(h, void 0, { equals: (y, b) => !y == !b });
        a = () => u() || (m() ? [d, h, f] : void 0);
      }
      return a;
    });
  return Pe(
    () => {
      const s = i()();
      if (!s) return e.fallback;
      const [l, a, c] = s,
        d = c.children;
      return typeof d == "function" && d.length > 0
        ? Ze(() =>
            d(
              c.keyed
                ? a()
                : () => {
                    if (Ze(i)()?.[0] !== l) throw bi("Match");
                    return a();
                  },
            ),
          )
        : d;
    },
    void 0,
    void 0,
  );
}