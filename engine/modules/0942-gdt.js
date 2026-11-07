
function gdt(e, t = !0, r = "") {
  let s = WU(e),
    a = pse([WU(r)]);
  return (H) => {
    if (H.length === 0) return a;
    else if (H.length === 1) return pse(Itr(H[0]));
    let u = [];
    if (t) u.push(WU("("));
    u.push.apply(u, Itr(H[0]));
    for (let f = 1; f < H.length; f++) (u.push(s), u.push.apply(u, Itr(H[f])));
    if (t) u.push(WU(")"));
    return pse(u);
  };
}