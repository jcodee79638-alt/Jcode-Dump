
var Xxt = (e, t, r) =>
  ft(function* () {
    let s = e.headers["content-length"],
      a = s ? Number.parseInt(s, 10) : void 0,
      H = a !== void 0 && Number.isSafeInteger(a) && a >= 0 ? a : void 0;
    if (H !== void 0 && H > t) return yield* bn(r());
    let u = Buffer.allocUnsafe(Math.min(t, H || 65536)),
      f = 0;
    return (
      yield* FW(e.stream, (d) => {
        if (d.byteLength === 0) return ti;
        if (f + d.byteLength > t) return bn(r());
        if (f + d.byteLength > u.byteLength) {
          let _ = Buffer.allocUnsafe(Math.min(t, Math.max(f + d.byteLength, u.byteLength * 2)));
          (u.copy(_, 0, 0, f), (u = _));
        }
        return (u.set(d, f), (f += d.byteLength), ti);
      }),
      u.subarray(0, f)
    );
  });