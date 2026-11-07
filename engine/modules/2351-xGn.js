
var xGn,
  pSe = (e) => [Number(e / xGn), Number(e % xGn)],
  H0t = (e) => {
    let t = {};
    for (let [r, s] of Object.entries(e)) t[r] = dSe(s);
    return t;
  },
  dSe = (e) => {
    if (typeof e === "string" || typeof e === "number" || typeof e === "boolean") return e;
    else if (typeof e === "bigint") return e.toString();
    return XAt(e);
  };