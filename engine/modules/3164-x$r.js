
function x$r(e, t, r, s) {
  let a = (t & PB.BRANCH_LENGTH) >> 7,
    H = t & PB.JUMP_TABLE;
  if (a === 0) return H !== 0 && s === H ? r : -1;
  if (H) {
    let d = s - H;
    return d < 0 || d >= a ? -1 : e[r + d] - 1;
  }
  let u = r,
    f = u + a - 1;
  while (u <= f) {
    let d = (u + f) >>> 1,
      _ = e[d];
    if (_ < s) u = d + 1;
    else if (_ > s) f = d - 1;
    else return e[d + a];
  }
  return -1;
}