
function BQa(e) {
  let t = FPr(nTt(e, { io: "input", metadata: RQa(e) }));
  if (!Wzi(t)) throw Error("plugin tool Zod schema produced a non-object JSON Schema");
  let { $defs: r, ...s } = t;
  return r && Wzi(r) ? { ...s, definitions: r } : s;
}