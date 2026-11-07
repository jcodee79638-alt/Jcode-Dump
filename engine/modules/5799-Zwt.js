
var Zwt = ne(() => {
  Yve();
  Bwt();
  I1();
  Gt();
  $H();
  Xy();
  sk();
  snH = /^\/api\/pty\/[^/]+\/connect$/;
  Les = zd("server.pty")
    .add(
      MH("pty.list", "/api/pty", { query: fp, success: Dy(On(X_e)) })
        .annotateMerge(pp)
        .annotateMerge(
          Fn({
            identifier: "v2.pty.list",
            summary: "List PTY sessions",
            description:
              "List PTY sessions for a location, including exited sessions retained until removal.",
          }),
        ),
    )
    .add(
      sc("pty.create", "/api/pty", { query: fp, payload: pEi, success: Dy(X_e) })
        .annotateMerge(pp)
        .annotateMerge(
          Fn({
            identifier: "v2.pty.create",
            summary: "Create PTY session",
            description: "Create a pseudo-terminal session for a location.",
          }),
        ),
    )
    .add(
      MH("pty.get", "/api/pty/:ptyID", { params: { ptyID: ox }, query: fp, success: Dy(X_e), error: MR })
        .annotateMerge(pp)
        .annotateMerge(
          Fn({
            identifier: "v2.pty.get",
            summary: "Get PTY session",
            description: "Get one PTY session, including its exit code once exited.",
          }),
        ),
    )
    .add(
      c0r("pty.update", "/api/pty/:ptyID", {
        params: { ptyID: ox },
        query: fp,
        payload: dEi,
        success: Dy(X_e),
        error: MR,
      })
        .annotateMerge(pp)
        .annotateMerge(
          Fn({
            identifier: "v2.pty.update",
            summary: "Update PTY session",
            description: "Update the title or viewport size of one PTY session.",
          }),
        ),
    )
    .add(
      P8("pty.remove", "/api/pty/:ptyID", { params: { ptyID: ox }, query: fp, success: lf, error: MR })
        .annotateMerge(pp)
        .annotateMerge(
          Fn({
            identifier: "v2.pty.remove",
            summary: "Remove PTY session",
            description: "Terminate and remove one PTY session.",
          }),
        ),
    )
    .add(
      sc("pty.connectToken", "/api/pty/:ptyID/connect-token", {
        params: { ptyID: ox },
        query: fp,
        success: Dy(VZi),
        error: [Uwe, MR],
      })
        .annotateMerge(pp)
        .annotateMerge(
          Fn({
            identifier: "v2.pty.connectToken",
            summary: "Create PTY WebSocket token",
            description: "Create a short-lived single-use ticket for opening a PTY WebSocket connection.",
          }),
        ),
    )
    .add(
      MH("pty.connect", "/api/pty/:ptyID/connect", {
        params: { ptyID: ox },
        success: Vi,
        error: [Uwe, MR],
      }).annotateMerge(
        Fn({
          identifier: "v2.pty.connect",
          summary: "Connect to PTY session",
          description: "Establish a WebSocket connection streaming PTY output and accepting terminal input.",
          transform: (e) => ({
            ...e,
            "x-websocket": !0,
            parameters: [
              ...(e.parameters ?? []),
              ...["location[directory]", "location[workspace]", "cursor", Ywt].map((t) => ({
                in: "query",
                name: t,
                schema: { type: "string" },
              })),
            ],
          }),
        }),
      ),
    )
    .annotateMerge(Fn({ title: "pty", description: "Experimental location-scoped PTY routes." }));
});