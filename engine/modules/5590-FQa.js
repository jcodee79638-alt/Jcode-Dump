
function FQa(e) {
  let t = Object.fromEntries(e.filter((r) => NQa(r[1])));
  return { type: "object", properties: t, required: Object.keys(t) };
}