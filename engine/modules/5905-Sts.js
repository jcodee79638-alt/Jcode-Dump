
var Sts = ne(() => {
  tV();
  I1();
  Gt();
  $H();
  Xy();
  sk();
  xts = zd("server.model")
    .add(
      MH("model.list", "/api/model", { query: fp, success: Dy(On(Hdn)), error: yR })
        .annotateMerge(pp)
        .annotateMerge(
          Fn({
            identifier: "v2.model.list",
            summary: "List models",
            description: "Retrieve available models ordered by release date.",
          }),
        ),
    )
    .annotateMerge(Fn({ title: "models", description: "Experimental model routes." }));
});