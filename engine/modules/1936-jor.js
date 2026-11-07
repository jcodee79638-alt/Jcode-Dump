
function jor(e, t, r, s) {
  let [a, H] = kLt(t) ? lme(vLt).proxyMap_(t, r) : OLt(t) ? lme(vLt).proxySet_(t, r) : sHo(t, r);
  if (
    ((r?.scope_ ?? OTn()).drafts_.push(a),
    (H.callbacks_ = r?.callbacks_ ?? []),
    (H.key_ = s),
    r && s !== void 0)
  )
    nHo(r, H, s);
  else
    H.callbacks_.push(function (d) {
      d.mapSetPlugin_?.fixSetContents(H);
      let { patchPlugin_: _ } = d;
      if (H.modified_ && _) _.generatePatches_(H, [], d);
    });
  return a;
}