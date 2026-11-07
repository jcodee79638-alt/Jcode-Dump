
var vm = (e) => {
  let t = new Map();
  return new Proxy(
    {},
    {
      get: (s, a) => {
        if (typeof a !== "string") return;
        let H = t.get(a);
        if (H) return H;
        let u = (...f) =>
          e.use((d) => {
            let _ = d[a];
            if (typeof _ !== "function") return No(Error(`Service method not found: ${a}`));
            return _(...f);
          });
        return (t.set(a, u), u);
      },
    },
  );
};