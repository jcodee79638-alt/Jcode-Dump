
function NTn(e, t, r, s) {
  let a = UY(e),
    H = e.type_;
  if (s !== void 0) {
    if (Mor(a, s, H) === t) {
      TLt(a, s, r, H);
      return;
    }
  }
  if (!e.draftLocations_) {
    let f = (e.draftLocations_ = new Map());
    CLt(a, (d, _) => {
      if (eoe(_)) {
        let L = f.get(_) || [];
        (L.push(d), f.set(_, L));
      }
    });
  }
  let u = e.draftLocations_.get(t) ?? rHo;
  for (let f of u) TLt(a, f, r, H);
}