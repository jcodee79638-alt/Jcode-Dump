
function u7(e, t, r, s) {
  var a;
  if (e.format || ((a = e.anyOf) == null ? void 0 : a.some((H) => H.format))) {
    if (!e.anyOf) e.anyOf = [];
    if (e.format) (e.anyOf.push({ format: e.format }), delete e.format);
    e.anyOf.push({ format: t, ...(r && s.errorMessages && { errorMessage: { format: r } }) });
  } else e.format = t;
}