
function VVi(e) {
  for (let t of e || [])
    if (t.type !== "function")
      throw new bc(`Currently only \`function\` tool calls are supported; Received \`${t.type}\``);
}