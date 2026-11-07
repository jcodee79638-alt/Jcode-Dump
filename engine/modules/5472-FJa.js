
function FJa(e, t) {
  return function (r, s, a, H, u, f) {
    var d = { type: r ? "Block" : "Line", value: s, start: a, end: H };
    if (e.locations) d.loc = new OCt(this, u, f);
    if (e.ranges) d.range = [a, H];
    t.push(d);
  };
}