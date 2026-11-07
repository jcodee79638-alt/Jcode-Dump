
function oKs(e) {
  let t = !1,
    r = !1,
    s = "";
  for (let H = 1; H < e.length; H++) {
    let u = e.charCodeAt(H);
    if (u === 37) {
      let f = e.charCodeAt(H + 1),
        d = e.charCodeAt(H + 2);
      if (yEn(f, d) === void 0) t = !0;
      else {
        if (((r = !0), f === 50 && d === 53))
          ((t = !0), (e = e.slice(0, H + 1) + "25" + e.slice(H + 1)), (H += 2));
        H += 2;
      }
    } else if (u === 63 || u === 59 || u === 35) {
      ((s = e.slice(H + 1)), (e = e.slice(0, H)));
      break;
    }
  }
  return { path: t ? decodeURI(e) : e, querystring: s, shouldDecodeParam: r };
}