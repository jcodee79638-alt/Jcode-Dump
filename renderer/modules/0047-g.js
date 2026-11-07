
function g(e) {
  const n = e.keyed,
    i = Pe(() => e.when, void 0, void 0),
    s = n ? i : Pe(i, void 0, { equals: (l, a) => !l == !a });
  return Pe(
    () => {
      const l = s();
      if (l) {
        const a = e.children;
        return typeof a == "function" && a.length > 0
          ? Ze(() =>
              a(
                n
                  ? l
                  : () => {
                      if (!Ze(s)) throw bi("Show");
                      return i();
                    },
              ),
            )
          : a;
      }
      return e.fallback;
    },
    void 0,
    void 0,
  );
}