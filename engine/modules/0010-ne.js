
var ne = (e, t, r) => () => {
  if (e)
    try {
      t = e((e = 0));
    } catch (s) {
      r = [s];
    }
  if (r) throw r[0];
  return t;
};