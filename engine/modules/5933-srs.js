
var srs = ne(() => {
  e3e();
  Gt();
  $H();
  sk();
  irs = zd("server.credential")
    .add(
      Cbe("credential.update", "/api/credential/:credentialID", {
        params: { credentialID: sdt },
        query: fp,
        payload: nt({ label: re }),
        success: lf,
      })
        .annotateMerge(pp)
        .annotateMerge(
          Fn({
            identifier: "v2.credential.update",
            summary: "Update credential",
            description: "Update a stored credential label.",
          }),
        ),
    )
    .add(
      P8("credential.remove", "/api/credential/:credentialID", {
        params: { credentialID: sdt },
        query: fp,
        success: lf,
      })
        .annotateMerge(pp)
        .annotateMerge(
          Fn({
            identifier: "v2.credential.remove",
            summary: "Remove credential",
            description: "Remove a stored integration credential.",
          }),
        ),
    );
});