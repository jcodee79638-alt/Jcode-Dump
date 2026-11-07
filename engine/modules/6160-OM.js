
var OM = (e) => (typeof e === "string" ? e : ""),
  GF = (e) => (typeof e === "number" && Number.isFinite(e) ? e : 0),
  k0 = (e) => (e && typeof e === "object" && !Array.isArray(e) ? e : {}),
  N6s = (e) => (Array.isArray(e) ? e : []);