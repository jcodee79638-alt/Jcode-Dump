
function ha(e, n, i = {}) {
  let s = [],
    l = [],
    a = [],
    c = [],
    d = 0,
    f;
  return (
    Me(() => Fn(a)),
    () => {
      const u = e() || [],
        h = u.length;
      return (
        u[ui],
        Ze(() => {
          if (h === 0)
            return (
              d !== 0 && (Fn(a), (a = []), (s = []), (l = []), (d = 0), (c = [])),
              i.fallback && ((s = [Cr]), (l[0] = rn((y) => ((a[0] = y), i.fallback()))), (d = 1)),
              l
            );
          for (s[0] === Cr && (a[0](), (a = []), (s = []), (l = []), (d = 0)), f = 0; f < h; f++)
            f < s.length && s[f] !== u[f] ? c[f](() => u[f]) : f >= s.length && (l[f] = rn(m));
          for (; f < s.length; f++) a[f]();
          return ((d = c.length = a.length = h), (s = u.slice(0)), (l = l.slice(0, d)));
        })
      );
      function m(y) {
        a[f] = y;
        const [b, j] = S(u[f]);
        return ((c[f] = j), n(b, f));
      }
    }
  );
}