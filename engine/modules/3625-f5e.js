
function f5e(e) {
  let t = e?.target ?? "draft-2020-12";
  if (t === "draft-4") t = "draft-04";
  if (t === "draft-7") t = "draft-07";
  return {
    processors: e.processors ?? {},
    metadataRegistry: e?.metadata ?? dHe,
    target: t,
    unrepresentable: e?.unrepresentable ?? "throw",
    override: e?.override ?? (() => {}),
    io: e?.io ?? "output",
    counter: 0,
    seen: new Map(),
    sharedDefsExtractedFor: void 0,
    sharedEmitDoneFor: void 0,
    cycles: e?.cycles ?? "ref",
    reused: e?.reused ?? "inline",
    intersections: [],
    deferred: [],
    external: e?.external ?? void 0,
  };
}