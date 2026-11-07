
function ks(e, t, r) {
  let s =
    r?.keyValueCombiner?.decode || r?.keyValueCombiner?.encode
      ? new wlt(r.keyValueCombiner.decode, r.keyValueCombiner.encode)
      : void 0;
  return cd(ban(e.ast, t.ast, s), { key: e, value: t });
}