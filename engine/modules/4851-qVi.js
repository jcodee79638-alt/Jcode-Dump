
function qVi(e) {
  for (let t of e ?? []) {
    if (t.type !== "function")
      throw new bc(`Currently only \`function\` tool types support auto-parsing; Received \`${t.type}\``);
    if (t.function.strict !== !0)
      throw new bc(
        `The \`${t.function.name}\` tool is not marked with \`strict: true\`. Only strict function tools can be auto-parsed`,
      );
  }
}