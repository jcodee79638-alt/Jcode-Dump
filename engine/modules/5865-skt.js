
var skt = ne(() => {
  Gt();
  ((HYe = Jo(["true", "false"]).pipe(
    v$(Vi, { decode: Sm((e) => e === "true"), encode: Sm((e) => (e ? "true" : "false")) }),
  )),
    (cYe = { anyOf: [{ type: "boolean" }, { type: "string", enum: ["true", "false"] }] }));
});