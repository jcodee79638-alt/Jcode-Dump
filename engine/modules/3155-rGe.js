
function rGe(e) {
  var t;
  if ((e >= 55296 && e <= 57343) || e > 1114111) return 65533;
  return (t = b_a.get(e)) !== null && t !== void 0 ? t : e;
}