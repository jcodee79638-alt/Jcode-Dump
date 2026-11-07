
function T7i(e) {
  let t = e,
    r = "";
  for (;;)
    try {
      let s = vce.realpathSync(t);
      return r ? gb.join(s, r) : s;
    } catch {
      let s = gb.dirname(t);
      if (s === t) return e;
      ((r = r ? gb.join(gb.basename(t), r) : gb.basename(t)), (t = s));
    }
}