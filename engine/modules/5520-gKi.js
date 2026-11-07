
var gKi = (e) => typeof e === "object" && e !== null && "_tag" in e && e._tag === "CodeModeTool",
  EKi = (e) => ({
    _tag: "CodeModeTool",
    description: e.description,
    input: e.input,
    output: e.output,
    run: (t) => e.run(t),
  });