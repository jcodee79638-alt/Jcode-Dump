
function EVa(e) {
  if (!e || typeof e !== "object") return e;
  let t = { type: e.type || "object" };
  if (e.required) t.required = e.required;
  if (e.properties && typeof e.properties === "object") {
    let r = {};
    for (let [s, a] of Object.entries(e.properties))
      if (typeof a === "object" && a !== null) {
        let H = a;
        r[s] = { type: H.type || "string" };
      } else r[s] = { type: "string" };
    t.properties = r;
  }
  return t;
}