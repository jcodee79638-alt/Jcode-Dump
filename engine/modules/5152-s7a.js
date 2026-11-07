
function s7a(e, t, r = Math.random()) {
  if (t) {
    let s = t.data.responseHeaders;
    if (s) {
      let a = s["retry-after-ms"];
      if (a) {
        let u = Number.parseFloat(a);
        if (!Number.isNaN(u)) return Fze(u);
      }
      let H = s["retry-after"];
      if (H) {
        let u = Number.parseFloat(H);
        if (!Number.isNaN(u)) return Fze(Math.ceil(u * 1000));
        let f = Date.parse(H) - Date.now();
        if (!Number.isNaN(f) && f > 0) return Fze(Math.ceil(f));
      }
      return Fze(c4i(e, r));
    }
  }
  return Fze(Math.min(c4i(e, r), ZVa));
}