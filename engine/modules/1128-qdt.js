
function qdt(e, t) {
  if (typeof t !== "object" || vi(t, sV)) return Pi(e, t);
  let r = Object.entries(t);
  if (!r.length) return;
  let s = [];
  for (let [a, H] of r) {
    if (H === void 0) continue;
    switch (a) {
      case "NOT": {
        let u = qdt(e, H);
        if (!u) continue;
        s.push(SG(u));
        continue;
      }
      case "OR":
        if (!H.length) continue;
        s.push(K0(...H.map((u) => qdt(e, u))));
        continue;
      case "AND":
        if (!H.length) continue;
        s.push(Gc(...H.map((u) => qdt(e, u))));
        continue;
      case "isNotNull":
      case "isNull":
        if (!H) continue;
        s.push(cMe[a](e));
        continue;
      case "in":
        s.push(cMe.inArray(e, H));
        continue;
      case "notIn":
        s.push(cMe.notInArray(e, H));
        continue;
      default:
        s.push(cMe[a](e, H));
        continue;
    }
  }
  if (!s.length) return;
  return Gc(...s);
}