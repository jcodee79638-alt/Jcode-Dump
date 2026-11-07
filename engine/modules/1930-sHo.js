
function sHo(e, t) {
  let r = wLt(e),
    s = {
      type_: r ? 1 : 0,
      scope_: t ? t.scope_ : OTn(),
      modified_: !1,
      finalized_: !1,
      assigned_: void 0,
      parent_: t,
      base_: e,
      draft_: null,
      copy_: null,
      revoke_: null,
      isManual_: !1,
      callbacks_: void 0,
    },
    a = s,
    H = jLt;
  if (r) ((a = [s]), (H = eVe));
  let { revoke: u, proxy: f } = Proxy.revocable(a, H);
  return ((s.draft_ = f), (s.revoke_ = u), [f, s]);
}