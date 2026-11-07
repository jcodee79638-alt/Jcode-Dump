
function jTn(e, t) {
  t.unfinalizedDrafts_ = t.drafts_.length;
  let r = t.drafts_[0];
  if (e !== void 0 && e !== r) {
    if (r[Iw].modified_) (Tor(t), sN(4));
    if (NY(e)) e = PTn(t, e);
    let { patchPlugin_: a } = t;
    if (a) a.generateReplacementPatches_(r[Iw].base_, e, t);
  } else e = PTn(t, r);
  if ((tHo(t, e, !0), Tor(t), t.patches_)) t.patchListener_(t.patches_, t.inversePatches_);
  return e !== CTn ? e : void 0;
}