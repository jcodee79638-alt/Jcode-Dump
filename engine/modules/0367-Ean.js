
function Ean(e, t) {
  if (e.encoding || t.some((H) => H.encoding)) throw Error("StructWithRest does not support encodings");
  let { propertySignatures: r, indexSignatures: s, checks: a } = e;
  for (let H of t) ((r = r.concat(H.propertySignatures)), (s = s.concat(H.indexSignatures)), (a = zNs(a, H)));
  return new TBe(r, s, void 0, a);
}