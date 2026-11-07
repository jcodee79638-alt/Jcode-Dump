
var yr = (e, t, n) => () => {
  if (e)
    try {
      t = e((e = 0));
    } catch (i) {
      n = [i];
    }
  if (n) throw n[0];
  return t;
};