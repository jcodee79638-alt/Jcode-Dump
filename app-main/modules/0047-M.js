
var M = (e) => (typeof e === "string" ? e : ""),
  Mt = (e) => (typeof e === "number" && Number.isFinite(e) ? e : 0),
  Q = (e) => (e && typeof e === "object" && !Array.isArray(e) ? e : {}),
  jn = (e) => (Array.isArray(e) ? e : []);