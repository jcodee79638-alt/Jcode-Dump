
var Xes = ne(async () => {
  Gt();
  $H();
  jT();
  yy();
  await m7();
  ((qes = nt({ providerID: Kp })),
    (GnH = nt({ directory: be(re), workspace: be(re) })),
    (XnH = nt({
      service: re.annotate({ description: "Service name for the log entry" }),
      level: Io([ri("debug"), ri("info"), ri("error"), ri("warn")]).annotate({ description: "Log level" }),
      message: re.annotate({ description: "Log message" }),
      extra: be(ks(re, PH)).annotate({ description: "Additional metadata for the log entry" }),
    })),
    (KCr = { auth: "/auth/:providerID", log: "/log" }),
    (Ges = kE("control").add(
      zd("control")
        .add(
          c0r("authSet", KCr.auth, {
            params: qes,
            payload: $8i,
            success: zs(Vi, "Successfully set authentication credentials"),
            error: PA,
          }).annotateMerge(
            Fn({
              identifier: "auth.set",
              summary: "Set auth credentials",
              description: "Set authentication credentials",
            }),
          ),
          P8("authRemove", KCr.auth, {
            params: qes,
            success: zs(Vi, "Successfully removed authentication credentials"),
            error: PA,
          }).annotateMerge(
            Fn({
              identifier: "auth.remove",
              summary: "Remove auth credentials",
              description: "Remove authentication credentials",
            }),
          ),
          sc("log", KCr.log, {
            query: GnH,
            payload: XnH,
            success: zs(Vi, "Log entry written successfully"),
            error: PA,
          }).annotateMerge(
            Fn({
              identifier: "app.log",
              summary: "Write log",
              description: "Write a log entry to the server logs with specified level and metadata.",
            }),
          ),
        )
        .annotateMerge(Fn({ title: "control", description: "Control plane routes." })),
    )));
});