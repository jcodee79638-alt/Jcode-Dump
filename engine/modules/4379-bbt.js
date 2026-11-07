
function bbt(e, t) {
  if (!e || t === null || typeof t !== "object") return;
  if (e.type === "object" && e.properties && typeof e.properties === "object") {
    let r = t,
      s = e.properties;
    for (let a of Object.keys(s)) {
      let H = s[a];
      if (r[a] === void 0 && Object.prototype.hasOwnProperty.call(H, "default")) r[a] = H.default;
      if (r[a] !== void 0) bbt(H, r[a]);
    }
  }
  if (Array.isArray(e.anyOf)) {
    for (let r of e.anyOf) if (typeof r !== "boolean") bbt(r, t);
  }
  if (Array.isArray(e.oneOf)) {
    for (let r of e.oneOf) if (typeof r !== "boolean") bbt(r, t);
  }
}