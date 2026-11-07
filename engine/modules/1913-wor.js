
function wor(e, t = !1) {
  if (ULt(e) || eoe(e) || !NY(e)) return e;
  if (tVe(e) > 1) oN.defineProperties(e, { set: DLt, add: DLt, clear: DLt, delete: DLt });
  if ((oN.freeze(e), t))
    CLt(
      e,
      (r, s) => {
        wor(s, !0);
      },
      !1,
    );
  return e;
}