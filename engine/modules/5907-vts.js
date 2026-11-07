
var vts = ne(() => {
  Hde();
  I1();
  Gt();
  $H();
  Xy();
  sk();
  Tts = zd("server.provider")
    .add(
      MH("provider.list", "/api/provider", { query: fp, success: Dy(On(utr)), error: yR })
        .annotateMerge(pp)
        .annotateMerge(
          Fn({
            identifier: "v2.provider.list",
            summary: "List providers",
            description:
              "Retrieve active AI providers so clients can show provider availability and configuration.",
          }),
        ),
    )
    .add(
      MH("provider.get", "/api/provider/:providerID", {
        params: { providerID: gG },
        query: fp,
        success: Dy(utr),
        error: [rYe, yR],
      })
        .annotateMerge(pp)
        .annotateMerge(
          Fn({
            identifier: "v2.provider.get",
            summary: "Get provider",
            description:
              "Retrieve a single AI provider so clients can inspect its availability and endpoint settings.",
          }),
        ),
    )
    .annotateMerge(Fn({ title: "providers", description: "Experimental provider routes." }));
});