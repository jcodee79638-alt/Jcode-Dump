
var Rts = ne(() => {
  l$t();
  I1();
  Gt();
  $H();
  sk();
  Bts = zd("server.skill")
    .add(
      MH("skill.list", "/api/skill", { query: fp, success: Dy(On(Har)) })
        .annotateMerge(pp)
        .annotateMerge(
          Fn({
            identifier: "v2.skill.list",
            summary: "List skills",
            description: "Retrieve currently registered skills.",
          }),
        ),
    )
    .annotateMerge(Fn({ title: "skills", description: "Experimental skill routes." }));
});