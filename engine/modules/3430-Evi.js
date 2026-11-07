
function Evi(e, t) {
  let r = e / t,
    s = Math.round(r),
    a = 4 * Number.EPSILON * Math.max(Math.abs(r), 1);
  if (Math.abs(r - s) < a) return 0;
  return r - s;
}