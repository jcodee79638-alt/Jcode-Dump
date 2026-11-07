
function Bw(e, t, r, s) {
  var a;
  if (e.pattern || ((a = e.allOf) == null ? void 0 : a.some((H) => H.pattern))) {
    if (!e.allOf) e.allOf = [];
    if (e.pattern) (e.allOf.push({ pattern: e.pattern }), delete e.pattern);
    e.allOf.push({ pattern: ywi(t, s), ...(r && s.errorMessages && { errorMessage: { pattern: r } }) });
  } else e.pattern = ywi(t, s);
}