
function pMa(e) {
  let t = e.values,
    s = Object.keys(e.values)
      .filter((H) => typeof t[t[H]] !== "number")
      .map((H) => t[H]),
    a = Array.from(new Set(s.map((H) => typeof H)));
  return { type: a.length === 1 ? (a[0] === "string" ? "string" : "number") : ["string", "number"], enum: s };
}