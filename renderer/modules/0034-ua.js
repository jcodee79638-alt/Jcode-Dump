
function ua(e, n, i = {}) {
  let s = [],
    l = [],
    a = [],
    c = 0,
    d = n.length > 1 ? [] : null;
  return (
    Me(() => Fn(a)),
    () => {
      let f = e() || [],
        u = f.length,
        h,
        m;
      return (
        f[ui],
        Ze(() => {
          let b, j, w, L, O, _, R, A, J;
          if (u === 0)
            (c !== 0 && (Fn(a), (a = []), (s = []), (l = []), (c = 0), d && (d = [])),
              i.fallback && ((s = [Cr]), (l[0] = rn((D) => ((a[0] = D), i.fallback()))), (c = 1)));
          else if (c === 0) {
            for (l = new Array(u), m = 0; m < u; m++) ((s[m] = f[m]), (l[m] = rn(y)));
            c = u;
          } else {
            for (
              w = new Array(u), L = new Array(u), d && (O = new Array(u)), _ = 0, R = Math.min(c, u);
              _ < R && s[_] === f[_];
              _++
            );
            for (R = c - 1, A = u - 1; R >= _ && A >= _ && s[R] === f[A]; R--, A--)
              ((w[A] = l[R]), (L[A] = a[R]), d && (O[A] = d[R]));
            for (b = new Map(), j = new Array(A + 1), m = A; m >= _; m--)
              ((J = f[m]), (h = b.get(J)), (j[m] = h === void 0 ? -1 : h), b.set(J, m));
            for (h = _; h <= R; h++)
              ((J = s[h]),
                (m = b.get(J)),
                m !== void 0 && m !== -1
                  ? ((w[m] = l[h]), (L[m] = a[h]), d && (O[m] = d[h]), (m = j[m]), b.set(J, m))
                  : a[h]());
            for (m = _; m < u; m++)
              m in w ? ((l[m] = w[m]), (a[m] = L[m]), d && ((d[m] = O[m]), d[m](m))) : (l[m] = rn(y));
            ((l = l.slice(0, (c = u))), (s = f.slice(0)));
          }
          return l;
        })
      );
      function y(b) {
        if (((a[m] = b), d)) {
          const [j, w] = S(m);
          return ((d[m] = w), n(f[m], j));
        }
        return n(f[m]);
      }
    }
  );
}