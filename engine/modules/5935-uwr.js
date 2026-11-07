
var uwr = ne(() => {
  oMt();
  T2();
  Gt();
  $H();
  sk();
  Kwe = class Kwe extends (
    $y("ProjectCopyError")(
      { name: ri("ProjectCopyError"), data: nt({ message: re, forceRequired: be(Vi) }) },
      { httpApiStatus: 400 },
    )
  ) {};
  (($sH = nt(WW(iEi.fields, ["projectID", "sourceDirectory"]))),
    (gsH = nt(WW(sEi.fields, ["projectID"]))),
    (ors = zd("server.projectCopy")
      .add(
        sc("projectCopy.create", Awr, {
          params: { projectID: S2 },
          query: fp,
          payload: $sH,
          success: oEi,
          error: Kwe,
        })
          .annotateMerge(pp)
          .annotateMerge(Fn({ identifier: "v2.projectCopy.create" })),
      )
      .add(
        P8("projectCopy.remove", Awr, {
          params: { projectID: S2 },
          query: fp,
          payload: gsH,
          success: lf,
          error: Kwe,
        })
          .annotateMerge(pp)
          .annotateMerge(Fn({ identifier: "v2.projectCopy.remove" })),
      )
      .add(
        sc("projectCopy.refresh", `${Awr}/refresh`, {
          params: { projectID: S2 },
          query: fp,
          success: lf,
          error: Kwe,
        })
          .annotateMerge(pp)
          .annotateMerge(Fn({ identifier: "v2.projectCopy.refresh" })),
      )
      .annotateMerge(Fn({ title: "projectCopy", description: "Project copy management routes." }))));
});