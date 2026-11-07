
function iHo(e, t, r) {
  let { scope_: s } = e;
  if (eoe(r)) {
    let a = r[Iw];
    if (NLt(a, s))
      a.callbacks_.push(function () {
        MLt(e);
        let u = Cor(a);
        NTn(e, r, u, t);
      });
  } else if (NY(r))
    e.callbacks_.push(function () {
      let H = UY(e);
      if (e.type_ === 3) {
        if (H.has(r)) bLt(r, s.handledSet_, s);
      } else if (Mor(H, t, e.type_) === r) {
        if (s.drafts_.length > 1 && (e.assigned_.get(t) ?? !1) === !0 && e.copy_)
          bLt(Mor(e.copy_, t, e.type_), s.handledSet_, s);
      }
    });
}