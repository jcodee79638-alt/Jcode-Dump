
var Uts = ne(() => {
  Jse();
  I1();
  Hu();
  Gt();
  $H();
  sk();
  ((dsH = nt({ ...fp.fields, path: du.pipe(be) })),
    (msH = nt({ ...fp.fields, query: Ght.fields.query, type: Ght.fields.type, limit: O6.pipe(v$(qc), be) })),
    (Ots = zd("server.fs")
      .add(
        MH("fs.read", "/api/fs/read/*", { query: fp, success: NAn.pipe(B0a()) })
          .annotateMerge(pp)
          .annotateMerge(
            Fn({
              identifier: "v2.fs.read",
              summary: "Read file",
              description: "Serve one file relative to the requested location.",
            }),
          ),
      )
      .add(
        MH("fs.list", "/api/fs/list", { query: dsH, success: Dy(On(xD)) })
          .annotateMerge(pp)
          .annotateMerge(
            Fn({
              identifier: "v2.fs.list",
              summary: "List directory",
              description: "List direct children of one directory relative to the requested location.",
            }),
          ),
      )
      .add(
        MH("fs.find", "/api/fs/find", { query: msH, success: Dy(On(xD)) })
          .annotateMerge(pp)
          .annotateMerge(
            Fn({
              identifier: "v2.fs.find",
              summary: "Find files",
              description: "Find recursively ranked filesystem entries relative to the requested location.",
            }),
          ),
      )
      .annotateMerge(
        Fn({ title: "filesystem", description: "Experimental location-scoped filesystem routes." }),
      )));
});