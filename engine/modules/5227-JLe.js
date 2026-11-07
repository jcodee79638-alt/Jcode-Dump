
function JLe(e) {
  let t,
    r = !1,
    s = () => {
      if (r) return t;
      return ((t = e()), (r = !0), t);
    };
  return (
    (s.reset = () => {
      ((r = !1), (t = void 0));
    }),
    (s.loaded = () => r),
    s
  );
}