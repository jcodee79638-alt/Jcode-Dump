
function Qwe(e) {
  if ($wr(e.anyOf ?? e.oneOf)?.some((t) => t.type === "null")) return e;
  return { anyOf: [e, { type: "null" }] };
}