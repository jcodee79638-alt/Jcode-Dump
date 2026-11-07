
function Hn(c, t, e) {
  if (!Array.isArray(e) || e.length < 2) return !1;
  const [s, i, ...n] = e;
  if ((!c(s) && !Number.isInteger(s)) || !t(i)) return !1;
  const r = n.length;
  let a = !0;
  switch (i.name) {
    case "XYZ":
      if (r < 2 || r > 3) return !1;
      break;
    case "Fit":
    case "FitB":
      return r === 0;
    case "FitH":
    case "FitBH":
    case "FitV":
    case "FitBV":
      if (r > 1) return !1;
      break;
    case "FitR":
      if (r !== 4) return !1;
      a = !1;
      break;
    default:
      return !1;
  }
  for (const o of n) if (!(typeof o == "number" || (a && o === null))) return !1;
  return !0;
}