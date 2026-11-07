
function Jn(e, n, i, s, l) {
  for (; typeof i == "function";) i = i();
  if (n === i) return i;
  const a = typeof n,
    c = s !== void 0;
  if (((e = (c && i[0] && i[0].parentNode) || e), a === "string" || a === "number")) {
    if (a === "number" && ((n = n.toString()), n === i)) return i;
    if (c) {
      let d = i[0];
      (d && d.nodeType === 3 ? d.data !== n && (d.data = n) : (d = document.createTextNode(n)),
        (i = Xt(e, i, s, d)));
    } else i !== "" && typeof i == "string" ? (i = e.firstChild.data = n) : (i = e.textContent = n);
  } else if (n == null || a === "boolean") i = Xt(e, i, s);
  else {
    if (a === "function")
      return (
        x(() => {
          let d = n();
          for (; typeof d == "function";) d = d();
          i = Jn(e, d, i, s);
        }),
        () => i
      );
    if (Array.isArray(n)) {
      const d = [],
        f = i && Array.isArray(i);
      if (Sr(d, n, i, l)) return (x(() => (i = Jn(e, d, i, s, !0))), () => i);
      if (d.length === 0) {
        if (((i = Xt(e, i, s)), c)) return i;
      } else f ? (i.length === 0 ? Kr(e, d, s) : pa(e, i, d)) : (i && Xt(e), Kr(e, d));
      i = d;
    } else if (n.nodeType) {
      if (Array.isArray(i)) {
        if (c) return (i = Xt(e, i, s, n));
        Xt(e, i, null, n);
      } else i == null || i === "" || !e.firstChild ? e.appendChild(n) : e.replaceChild(n, e.firstChild);
      i = n;
    }
  }
  return i;
}