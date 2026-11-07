
function gMr(e, t) {
  if (!e) return;
  if (typeof e.issuer !== "string") return e.issuer == null ? e : { ...e, issuer: void 0 };
  return J9a(e.issuer, t) ? e : void 0;
}