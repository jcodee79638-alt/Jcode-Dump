
function Vft(e, t) {
  let r = t?.encodingStrategy === "omit" ? bon() : QC();
  return (s) => be(k2s(s)).pipe(v$(s, { decode: Slt(zC(e, (a) => a.issue)), encode: r }));
}