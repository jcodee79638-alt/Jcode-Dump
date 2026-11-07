
function GMn(e, t, r, s, a, H, u, f, d, _, L, I, D, S, T) {
  let C = pg(),
    O = FWe(e),
    B = FWe(t),
    V = FWe(r),
    q = FWe(d),
    Z = FWe(_),
    se = Buffer.alloc(heo);
  (se.writeUInt32LE(_eo, Leo),
    BWe(se, $eo, O),
    BWe(se, geo, B),
    BWe(se, Eeo, V),
    se.writeUInt8(a ? 1 : 0, Ieo),
    se.writeUInt8(H ? 1 : 0, Deo),
    se.writeUInt8(u ? 1 : 0, yeo),
    se.writeUInt8(f ? 1 : 0, Meo),
    BWe(se, xeo, q),
    BWe(se, Seo, Z),
    se.writeBigUInt64LE(L, Teo),
    se.writeBigUInt64LE(I, veo),
    se.writeBigUInt64LE(D, beo),
    se.writeUInt8(S ? 1 : 0, jeo),
    se.writeUInt8(T ? 1 : 0, Peo));
  let ae = C.symbols.fff_create_instance_with(Qv(se));
  if (ae === null) return zv("FFI returned null pointer");
  if (ha.u8(ae, FMn) !== 0) {
    let le = ha.ptr(ae, RMn);
    if ((C.symbols.fff_free_result(ae), !le || le === 0))
      return zv("fff_create_instance_with returned null handle");
    return { ok: !0, value: le };
  } else {
    let Ae = ha.ptr(ae, BMn),
      le = by(Ae) || "Unknown error";
    return (C.symbols.fff_free_result(ae), zv(le));
  }
}