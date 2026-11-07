
function $wr(e) {
  return e?.flatMap((t) => $wr(t.anyOf ?? t.oneOf) ?? [t]);
}