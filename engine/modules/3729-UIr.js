
function UIr(e, t) {
  let r = JZ(e),
    s = JZ(t);
  if (e === t) return { valid: !0, data: e };
  else if (r === Xc.object && s === Xc.object) {
    let a = km.objectKeys(t),
      H = km.objectKeys(e).filter((f) => a.indexOf(f) !== -1),
      u = { ...e, ...t };
    if (Object.prototype.hasOwnProperty.call(u, "__proto__")) delete u.__proto__;
    for (let f of H) {
      if (f === "__proto__") continue;
      let d = UIr(e[f], t[f]);
      if (!d.valid) return { valid: !1 };
      u[f] = d.data;
    }
    return { valid: !0, data: u };
  } else if (r === Xc.array && s === Xc.array) {
    if (e.length !== t.length) return { valid: !1 };
    let a = [];
    for (let H = 0; H < e.length; H++) {
      let u = e[H],
        f = t[H],
        d = UIr(u, f);
      if (!d.valid) return { valid: !1 };
      a.push(d.data);
    }
    return { valid: !0, data: a };
  } else if (r === Xc.date && s === Xc.date && +e === +t) return { valid: !0, data: e };
  else return { valid: !1 };
}