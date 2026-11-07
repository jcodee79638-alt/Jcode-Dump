
function E1e(e, t) {
  let r = Object.create(I2s);
  if (t) Object.assign(r, t);
  return (
    (r.ast = e),
    (r.rebuild = (s) => E1e(s, t)),
    (r.makeEffect = mW(
      Tft(r),
      zC((s) => new lG(s)),
    )),
    (r.make = tAn(r)),
    (r.makeOption = vft(r)),
    r
  );
}