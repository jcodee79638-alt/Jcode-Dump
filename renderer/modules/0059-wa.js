
function wa(e, n, i) {
  if (!n) return i ? z(e, "style") : n;
  const s = e.style;
  if (typeof n == "string") return (s.cssText = n);
  (typeof i == "string" && (s.cssText = i = void 0), i || (i = {}), n || (n = {}));
  let l, a;
  for (a in i) (n[a] == null && s.removeProperty(a), delete i[a]);
  for (a in n) ((l = n[a]), l !== i[a] && (s.setProperty(a, l), (i[a] = l)));
  return i;
}