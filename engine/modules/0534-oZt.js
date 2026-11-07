
function oZt(e, t) {
  if (Object.keys(e).length === 0) return t;
  let r = Object.keys(t).length;
  if (r === 0) return e;
  let s = Array.isArray(t.allOf) && r === 1 ? t.allOf : [t];
  if (Array.isArray(e.allOf)) return { ...e, allOf: [...e.allOf, ...s] };
  if (typeof e.$ref === "string") return { allOf: [e, ...s] };
  return { ...e, allOf: s };
}