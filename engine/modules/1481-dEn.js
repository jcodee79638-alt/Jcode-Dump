
function dEn(e) {
  let t = new pEn();
  if (typeof e !== "string") return t;
  let r = e.length,
    s = "",
    a = "",
    H = -1,
    u = -1,
    f = !1,
    d = !1,
    _ = !1,
    L = !1,
    I = !1,
    D = 0;
  for (let S = 0; S < r + 1; S++)
    if (((D = S !== r ? e.charCodeAt(S) : 38), D === 38)) {
      if (((I = u > H), !I)) u = S;
      if (((s = e.slice(H + 1, u)), I || s.length > 0)) {
        if (_) s = s.replace(fEn, " ");
        if (f)
          try {
            s = decodeURIComponent(s) || s;
          } catch {}
        if (I) {
          if (((a = e.slice(u + 1, S)), L)) a = a.replace(fEn, " ");
          if (d)
            try {
              a = decodeURIComponent(a) || a;
            } catch {}
        }
        let T = t[s];
        if (T === void 0) t[s] = a;
        else if (T.pop) T.push(a);
        else t[s] = [T, a];
      }
      ((a = ""), (H = S), (u = S), (f = !1), (d = !1), (_ = !1), (L = !1));
    } else if (D === 61)
      if (u <= H) u = S;
      else d = !0;
    else if (D === 43)
      if (u > H) L = !0;
      else _ = !0;
    else if (D === 37)
      if (u > H) d = !0;
      else f = !0;
  return t;
}