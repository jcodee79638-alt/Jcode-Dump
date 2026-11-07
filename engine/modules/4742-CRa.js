
function CRa(e, t) {
  if ((t === "v4" || !t) && yRa.test(e)) return !0;
  if ((t === "v6" || !t) && xRa.test(e)) return !0;
  return !1;
}