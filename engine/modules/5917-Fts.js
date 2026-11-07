
var Fts = ne(() => {
  $ht();
  I1();
  Gt();
  $H();
  sk();
  Nts = zd("server.command")
    .add(
      MH("command.list", "/api/command", { query: fp, success: Dy(On(u1n)) })
        .annotateMerge(pp)
        .annotateMerge(
          Fn({
            identifier: "v2.command.list",
            summary: "List commands",
            description: "Retrieve currently registered commands.",
          }),
        ),
    )
    .annotateMerge(Fn({ title: "commands", description: "Experimental command routes." }));
});