
function tn(c, t) {
  const e = new Headers();
  if (!c || !t || typeof t != "object") return e;
  for (const s in t) {
    const i = t[s];
    i !== void 0 && e.append(s, i);
  }
  return e;
}