
function H0r(e, t) {
  if (t.has(e)) return !1;
  if ((t.add(e), vpe(e))) return e.types.some((s) => H0r(s, t));
  if (WQt(e)) return H0r(e.thunk(), t);
  if (!Xye(e)) return !1;
  let r = e.propertySignatures.find((s) => s.name === "event");
  return r !== void 0 && Yxt(r.type, t);
}