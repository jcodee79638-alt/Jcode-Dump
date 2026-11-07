
function hmn(e, t = 0) {
  let r = [],
    s = t,
    a = !1;
  while (s < e.length) {
    let H = e[s];
    if (H === ",") {
      if (a || s === t) r.push("");
      ((a = !0), s++);
      continue;
    }
    if (((a = !1), H === "\\")) {
      s += 2;
      continue;
    }
    if (H === '"') {
      let [d, _] = _mn(e, s + 1, !0);
      (r.push(d), (s = _));
      continue;
    }
    if (H === "}") return [r, s + 1];
    if (H === "{") {
      let [d, _] = hmn(e, s + 1);
      (r.push(d), (s = _));
      continue;
    }
    let [u, f] = _mn(e, s, !1);
    (r.push(u), (s = f));
  }
  return [r, s];
}