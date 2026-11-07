
var o$i = Ie(function (S$c, s$i) {
  var i$i = Qj(),
    { basename: $Ha } = cr("path"),
    { URL: gHa } = cr("url");
  s$i.exports = (e, t) => {
    let r = $Ha(t);
    if (!r.endsWith(".tgz")) return null;
    if (t.startsWith("http:/") || t.startsWith("https:/")) {
      let f = new gHa(t).pathname.slice(1).split("/-/");
      if (f.length > 1) {
        if (f.pop() === r) {
          let L = f.pop().split(/\/|%2f/i),
            I = L.pop(),
            D = L.pop();
          return n$i(r, D, I);
        }
      }
    }
    let s = e.split(/\/|%2f/i),
      a = s.pop(),
      H = s.pop();
    return n$i(r, H, a);
  };
  var n$i = (e, t, r) => {
    if (!e.startsWith(r + "-")) return null;
    let s = i$i.parse(e.substring(r.length + 1, e.length - 4));
    return s ? { name: t && t.charAt(0) === "@" ? `${t}/${r}` : r, version: s.version } : null;
  };
});