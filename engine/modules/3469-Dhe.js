
function Dhe(...e) {
  let [t, r, s] = e;
  if (typeof t === "string") return { message: t, code: "custom", input: r, inst: s };
  return { ...t };
}