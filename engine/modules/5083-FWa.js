
function FWa(e) {
  let t = e;
  for (let r = 0; r < 8 && t && typeof t === "object"; r++) {
    let s = t;
    if (
      s.code === "UND_ERR_INVALID_ARG" &&
      typeof s.message === "string" &&
      s.message.includes("invalid onRequestStart method")
    )
      return !0;
    t = s.cause;
  }
  return !1;
}