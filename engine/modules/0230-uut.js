
var uut = (e) => (t) => !xm(e(t)),
  lut = (e) => (t) => (t.has(e) ? D$(t) : dh(t)),
  fut,
  put,
  Srn = (e) => (t) => {
    let r = e(t);
    return xm(r) ? eH() : Lo(r.success);
  };