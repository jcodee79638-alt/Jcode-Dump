
function Eyi(e) {
  let t = "",
    r = new gyi(e, (s) => (t += lbe(s)));
  return function (a, H) {
    let u = 0,
      f = 0;
    while ((f = a.indexOf("&", f)) >= 0) {
      ((t += a.slice(u, f)), r.startEntity(H));
      let _ = r.write(a, f + 1);
      if (_ < 0) {
        u = f + r.end();
        break;
      }
      ((u = f + _), (f = _ === 0 ? u + 1 : u));
    }
    let d = t + a.slice(u);
    return ((t = ""), d);
  };
}