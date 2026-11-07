
function JXa(e) {
  let t = "",
    r = 0,
    s = new pbe({
      onopentag(a) {
        if (r > 0 || ["script", "style", "noscript", "iframe", "object", "embed"].includes(a)) r++;
      },
      ontext(a) {
        if (r === 0) t += a;
      },
      onclosetag() {
        if (r > 0) r--;
      },
    });
  return (s.write(e), s.end(), t.trim());
}