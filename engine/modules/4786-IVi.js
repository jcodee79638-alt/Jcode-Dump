
function IVi(e, t, r, s, a, H, u, f, d, _, L, I, D, S, T, C, O, B) {
  let V = e,
    q = B,
    Z = 0,
    se = !1;
  while ((q = q.get(QSr)) !== void 0 && !se) {
    let Be = q.get(e);
    if (((Z += 1), typeof Be < "u"))
      if (Be === Z) throw RangeError("Cyclic object value");
      else se = !0;
    if (typeof q.get(QSr) > "u") Z = 0;
  }
  if (typeof _ === "function") V = _(t, V);
  else if (V instanceof Date) V = D?.(V);
  else if (r === "comma" && vP(V))
    V = zSr(V, function (Be) {
      if (Be instanceof Date) return D?.(Be);
      return Be;
    });
  if (V === null) {
    if (H) return d && !C ? d(t, Lx.encoder, O, "key", S) : t;
    V = "";
  }
  if (qRa(V) || hVi(V)) {
    if (d) {
      let Be = C ? t : d(t, Lx.encoder, O, "key", S);
      return [T?.(Be) + "=" + T?.(d(V, Lx.encoder, O, "value", S))];
    }
    return [T?.(t) + "=" + T?.(String(V))];
  }
  let ae = [];
  if (typeof V > "u") return ae;
  let z;
  if (r === "comma" && vP(V)) {
    if (C && d) V = zSr(V, d);
    z = [{ value: V.length > 0 ? V.join(",") || null : void 0 }];
  } else if (vP(_)) z = _;
  else {
    let Be = Object.keys(V);
    z = L ? Be.sort(L) : Be;
  }
  let Ae = f ? String(t).replace(/\./g, "%2E") : String(t),
    le = s && vP(V) && V.length === 1 ? Ae + "[]" : Ae;
  if (a && vP(V) && V.length === 0) return le + "[]";
  for (let Be = 0; Be < z.length; ++Be) {
    let Te = z[Be],
      Lt = typeof Te === "object" && typeof Te.value < "u" ? Te.value : V[Te];
    if (u && Lt === null) continue;
    let Ht = I && f ? Te.replace(/\./g, "%2E") : Te,
      Se = vP(V) ? (typeof r === "function" ? r(le, Ht) : le) : le + (I ? "." + Ht : "[" + Ht + "]");
    B.set(e, Z);
    let _e = new WeakMap();
    (_e.set(QSr, B),
      EVi(
        ae,
        IVi(Lt, Se, r, s, a, H, u, f, r === "comma" && C && vP(V) ? null : d, _, L, I, D, S, T, C, O, _e),
      ));
  }
  return ae;
}