
function Nzi(e, t) {
  let r = {};
  for (let s of e) {
    let a = (r[s.server] ??= {});
    a[s.local] = EKi({
      description: s.tool.def.description ?? "",
      input: s.tool.def.inputSchema,
      output: s.tool.def.outputSchema,
      run: t(s),
    });
  }
  return r;
}