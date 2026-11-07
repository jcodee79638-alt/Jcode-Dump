
function kRa(e, t) {
  if ((t === "v4" || !t) && MRa.test(e)) return !0;
  if ((t === "v6" || !t) && SRa.test(e)) return !0;
  return !1;
}