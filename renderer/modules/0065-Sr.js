
function Sr(e, n, i, s) {
  let l = !1;
  for (let a = 0, c = n.length; a < c; a++) {
    let d = n[a],
      f = i && i[e.length],
      u;
    if (!(d == null || d === !0 || d === !1))
      if ((u = typeof d) == "object" && d.nodeType) e.push(d);
      else if (Array.isArray(d)) l = Sr(e, d, f) || l;
      else if (u === "function")
        if (s) {
          for (; typeof d == "function";) d = d();
          l = Sr(e, Array.isArray(d) ? d : [d], Array.isArray(f) ? f : [f]) || l;
        } else (e.push(d), (l = !0));
      else {
        const h = String(d);
        f && f.nodeType === 3 && f.data === h ? e.push(f) : e.push(document.createTextNode(h));
      }
  }
  return l;
}