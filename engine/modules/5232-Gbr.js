
function Gbr(e, t, r, s) {
  let a = r - t,
    H = e.textCallback(t, s);
  if (H) {
    t += H.length;
    while (t < r) {
      let u = e.textCallback(t, s);
      if (u && u.length > 0) ((t += u.length), (H += u));
      else break;
    }
    if (t > r) H = H.slice(0, a);
  }
  return H ?? "";
}