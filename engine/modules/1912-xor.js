
function xor(e, t) {
  if (kLt(e)) return new Map(e);
  if (OLt(e)) return new Set(e);
  if (wLt(e)) return Array[PLt].slice.call(e);
  let r = wTn(e);
  if (t === !0 || (t === "class_only" && !r)) {
    let s = oN.getOwnPropertyDescriptors(e);
    delete s[Iw];
    let a = Reflect.ownKeys(s);
    for (let H = 0; H < a.length; H++) {
      let u = a[H],
        f = s[u];
      if (f[yLt] === !1) ((f[yLt] = !0), (f[yor] = !0));
      if (f.get || f.set) s[u] = { [yor]: !0, [yLt]: !0, [SLt]: f[SLt], [YWe]: e[u] };
    }
    return oN.create(Mxe(e), s);
  } else {
    let s = Mxe(e);
    if (s !== null && r) return { ...e };
    let a = oN.create(s);
    return oN.assign(a, e);
  }
}