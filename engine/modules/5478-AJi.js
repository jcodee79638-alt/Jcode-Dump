
function AJi(e, t, r, s) {
  if (((e.type = t), (e.end = r), this.options.locations)) e.loc.end = s;
  if (this.options.ranges) e.range[1] = r;
  return e;
}