
function mEr(e, t) {
  if (e === t) return { valid: !0, data: e };
  if (e instanceof Date && t instanceof Date && +e === +t) return { valid: !0, data: e };
  if (Ihe(e) && Ihe(t)) {
    let r = Object.keys(t),
      s = Object.keys(e).filter((H) => r.indexOf(H) !== -1),
      a = { ...e, ...t };
    if (Object.prototype.hasOwnProperty.call(a, "__proto__")) delete a.__proto__;
    for (let H of s) {
      if (H === "__proto__") continue;
      let u = mEr(e[H], t[H]);
      if (!u.valid) return { valid: !1, mergeErrorPath: [H, ...u.mergeErrorPath] };
      a[H] = u.data;
    }
    return { valid: !0, data: a };
  }
  if (Array.isArray(e) && Array.isArray(t)) {
    if (e.length !== t.length) return { valid: !1, mergeErrorPath: [] };
    let r = [];
    for (let s = 0; s < e.length; s++) {
      let a = e[s],
        H = t[s],
        u = mEr(a, H);
      if (!u.valid) return { valid: !1, mergeErrorPath: [s, ...u.mergeErrorPath] };
      r.push(u.data);
    }
    return { valid: !0, data: r };
  }
  return { valid: !1, mergeErrorPath: [] };
}