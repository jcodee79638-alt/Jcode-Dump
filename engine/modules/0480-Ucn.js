
function Ucn(e, t, r) {
  let s = Object.create(a2s);
  return (
    (s.get = e),
    (s.mapInput = t),
    (s.prefix = r),
    (s.load = (a) => {
      if (t) a = t(a);
      if (r) a = [...r, ...a];
      return e(a);
    }),
    s
  );
}