
function jn(c, t = "document.pdf") {
  if (typeof c != "string") return t;
  if (ss(c)) return (H('getPdfFilenameFromUrl: ignore "data:"-URL for performance reasons.'), t);
  const s = ((a) => {
    try {
      return new URL(a);
    } catch {}
    try {
      return new URL(decodeURIComponent(a));
    } catch {}
    try {
      return new URL(a, "https://foo.bar");
    } catch {}
    try {
      return new URL(decodeURIComponent(a), "https://foo.bar");
    } catch {}
    return null;
  })(c);
  if (!s) return t;
  const i = (a) => {
      try {
        let o = decodeURIComponent(a);
        return o.includes("/") && ((o = Es(o)), o.length === 4 && n.test(o)) ? a : o;
      } catch {
        return a;
      }
    },
    n = /\.pdf$/i,
    r = Es(s.pathname);
  if (n.test(r)) return i(r);
  if (s.searchParams.size > 0) {
    const a = (l) => [...l].findLast((h) => n.test(h)),
      o = a(s.searchParams.values()) ?? a(s.searchParams.keys());
    if (o) return i(o);
  }
  if (s.hash) {
    const { hash: a } = s;
    let o = -1;
    for (const { index: l } of a.matchAll(/\.pdf\b/gi)) o = l;
    if (o > 0) {
      let l = o;
      for (; l > 0 && !"/?#=".includes(a[l - 1]);) l--;
      if (l < o) return i(a.slice(l, o + 4));
    }
  }
  return t;
}