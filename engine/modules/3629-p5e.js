
function p5e(e, t) {
  let r = e.seen.get(t);
  if (!r) throw Error("Unprocessed schema. This is a bug in Zod.");
  if (e.external && e.sharedDefsExtractedFor === e.external) return;
  let s = new Map();
  for (let u of e.seen.entries()) {
    let f = e.metadataRegistry.get(u[0])?.id;
    if (f) {
      let d = s.get(f);
      if (d && d !== u[0])
        throw Error(
          `Duplicate schema id "${f}" detected during JSON Schema conversion. Two different schemas cannot share the same id when converted together.`,
        );
      s.set(f, u[0]);
    }
  }
  let a = (u) => {
      let f = e.target === "draft-2020-12" ? "$defs" : "definitions";
      if (e.external) {
        let I = e.external.registry.get(u[0])?.id,
          D = e.external.uri ?? ((T) => T);
        if (I) return { ref: D(I) };
        let S = u[1].defId ?? u[1].schema.id ?? `schema${e.counter++}`;
        return ((u[1].defId = S), { defId: S, ref: `${D("__shared")}#/${f}/${VPi(S)}` });
      }
      let d = "#",
        _ = `${d}/${f}/`;
      if (u[1] === r && !u[1].schema.id) return { ref: d };
      let L = u[1].schema.id ?? `__schema${e.counter++}`;
      return { defId: L, ref: _ + VPi(L) };
    },
    H = (u) => {
      if (u[1].schema.$ref) return;
      let f = u[1],
        { ref: d, defId: _ } = a(u);
      if (((f.def = { ...f.schema }), _)) f.defId = _;
      let L = f.schema;
      for (let I in L) delete L[I];
      L.$ref = d;
    };
  if (e.cycles === "throw")
    for (let u of e.seen.entries()) {
      let f = u[1];
      if (f.cycle)
        throw Error(`Cycle detected: #/${f.cycle?.join("/")}/<root>

Set the \`cycles\` parameter to \`"ref"\` to resolve cyclical schemas with defs.`);
    }
  for (let u of e.seen.entries()) {
    let f = u[1];
    if (t === u[0]) {
      H(u);
      continue;
    }
    if (e.external) {
      let _ = e.external.registry.get(u[0])?.id;
      if (t !== u[0] && _) {
        H(u);
        continue;
      }
    }
    if (e.metadataRegistry.get(u[0])?.id) {
      H(u);
      continue;
    }
    if (f.cycle) {
      H(u);
      continue;
    }
    if (f.count > 1) {
      if (e.reused === "ref") H(u);
    }
  }
  if (e.external) e.sharedDefsExtractedFor = e.external;
}