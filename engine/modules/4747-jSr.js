
function jSr(e, t) {
  let r = Tee(e),
    s = Tee(t);
  if (e === t) return { valid: !0, data: e };
  else if (r === zc.object && s === zc.object) {
    let a = Om.objectKeys(t),
      H = Om.objectKeys(e).filter((f) => a.indexOf(f) !== -1),
      u = { ...e, ...t };
    for (let f of H) {
      let d = jSr(e[f], t[f]);
      if (!d.valid) return { valid: !1 };
      u[f] = d.data;
    }
    return { valid: !0, data: u };
  } else if (r === zc.array && s === zc.array) {
    if (e.length !== t.length) return { valid: !1 };
    let a = [];
    for (let H = 0; H < e.length; H++) {
      let u = e[H],
        f = t[H],
        d = jSr(u, f);
      if (!d.valid) return { valid: !1 };
      a.push(d.data);
    }
    return { valid: !0, data: a };
  } else if (r === zc.date && s === zc.date && +e === +t) return { valid: !0, data: e };
  else return { valid: !1 };
}