
var akt = ne(async () => {
  Cwe();
  iLr();
  zwt();
  Gt();
  $H();
  xx();
  Sx();
  jT();
  await Jn([ebe(), bT(), Tx()]);
  ((MiH = nt({ ptyID: ox })),
    (cts = nt({ ...Tb, cursor: be(re) })),
    (xiH = nt({ path: re, name: re, acceptable: Vi })),
    (dAe = {
      shells: `${pAe}/shells`,
      list: pAe,
      create: pAe,
      get: `${pAe}/:ptyID`,
      update: `${pAe}/:ptyID`,
      remove: `${pAe}/:ptyID`,
      connectToken: `${pAe}/:ptyID/connect-token`,
      connect: `${pAe}/:ptyID/connect`,
    }),
    (Ats = kE("pty")
      .add(
        zd("pty")
          .add(
            MH("shells", dAe.shells, { query: jo, success: zs(On(xiH), "List of shells") }).annotateMerge(
              Fn({
                identifier: "pty.shells",
                summary: "List available shells",
                description: "Get a list of available shells on the system.",
              }),
            ),
            MH("list", dAe.list, { query: jo, success: zs(On(mMt), "List of sessions") }).annotateMerge(
              Fn({
                identifier: "pty.list",
                summary: "List PTY sessions",
                description: "Get a list of all active pseudo-terminal (PTY) sessions managed by OpenCode.",
              }),
            ),
            sc("create", dAe.create, {
              query: jo,
              payload: xua,
              success: zs(mMt, "Created session"),
              error: PA,
            }).annotateMerge(
              Fn({
                identifier: "pty.create",
                summary: "Create PTY session",
                description:
                  "Create a new pseudo-terminal (PTY) session for running shell commands and processes.",
              }),
            ),
            MH("get", dAe.get, {
              params: { ptyID: ox },
              query: jo,
              success: zs(mMt, "Session info"),
              error: F7,
            }).annotateMerge(
              Fn({
                identifier: "pty.get",
                summary: "Get PTY session",
                description: "Retrieve detailed information about a specific pseudo-terminal (PTY) session.",
              }),
            ),
            c0r("update", dAe.update, {
              params: { ptyID: ox },
              query: jo,
              payload: Sua,
              success: zs(mMt, "Updated session"),
              error: [F7, PA],
            }).annotateMerge(
              Fn({
                identifier: "pty.update",
                summary: "Update PTY session",
                description: "Update properties of an existing pseudo-terminal (PTY) session.",
              }),
            ),
            P8("remove", dAe.remove, {
              params: { ptyID: ox },
              query: jo,
              success: zs(Vi, "Session removed"),
              error: F7,
            }).annotateMerge(
              Fn({
                identifier: "pty.remove",
                summary: "Remove PTY session",
                description: "Remove and terminate a specific pseudo-terminal (PTY) session.",
              }),
            ),
            sc("connectToken", dAe.connectToken, {
              params: { ptyID: ox },
              query: jo,
              success: zs(xrH, "WebSocket connect token"),
              error: [sYe, F7],
            }).annotateMerge(
              Fn({
                identifier: "pty.connectToken",
                summary: "Create PTY WebSocket token",
                description: "Create a short-lived ticket for opening a PTY WebSocket connection.",
              }),
            ),
          )
          .annotateMerge(Fn({ title: "pty", description: "Experimental HttpApi PTY routes." }))
          .middleware(Fm)
          .middleware(Nm)
          .middleware(tm),
      )
      .annotateMerge(
        Fn({
          title: "opencode experimental HttpApi",
          version: "0.0.1",
          description: "Experimental HttpApi surface for selected instance routes.",
        }),
      )),
    (Gwe = kE("pty-connect").add(
      zd("pty-connect")
        .add(
          MH("connect", dAe.connect, {
            params: MiH,
            success: zs(Vi, "Connected session"),
            error: [NSi, FSi],
          }).annotateMerge(
            Fn({
              identifier: "pty.connect",
              summary: "Connect to PTY session",
              description:
                "Establish a WebSocket connection to interact with a pseudo-terminal (PTY) session in real-time.",
              transform: (e) => ({
                ...e,
                parameters: [
                  ...(e.parameters ?? []),
                  ...["directory", "workspace", "cursor", Kwt].map((t) => ({
                    in: "query",
                    name: t,
                    schema: { type: "string" },
                  })),
                ],
              }),
            }),
          ),
        )
        .annotateMerge(Fn({ title: "pty", description: "PTY websocket route." }))
        .middleware(Fm)
        .middleware(Nm)
        .middleware(Nwe),
    )));
});