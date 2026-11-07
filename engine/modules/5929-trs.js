
var trs = ne(() => {
  I1();
  mVe();
  Gt();
  $H();
  sk();
  ers = zd("server.reference")
    .add(
      MH("reference.list", "/api/reference", { query: fp, success: Dy(On(zor)) })
        .annotateMerge(pp)
        .annotateMerge(
          Fn({
            identifier: "v2.reference.list",
            summary: "List references",
            description: "List references available in the requested location.",
          }),
        ),
    )
    .annotateMerge(Fn({ title: "reference", description: "Location-scoped project references." }));
});