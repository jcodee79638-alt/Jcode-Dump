
var wts = (e, t) =>
  zd("server.permission")
    .add(
      MH("permission.request.list", "/api/permission/request", { query: fp, success: Dy(On(Nj)) })
        .annotateMerge(pp)
        .annotateMerge(
          Fn({
            identifier: "v2.permission.request.list",
            summary: "List pending permission requests",
            description: "Retrieve pending permission requests for a location.",
          }),
        ),
    )
    .add(
      MH("permission.saved.list", "/api/permission/saved", {
        query: nt({ projectID: S2.pipe(be) }),
        success: nt({ data: On(avn) }),
      }).annotateMerge(
        Fn({
          identifier: "v2.permission.saved.list",
          summary: "List saved permissions",
          description: "Retrieve saved permissions, optionally filtered by project.",
        }),
      ),
    )
    .add(
      P8("permission.saved.remove", "/api/permission/saved/:id", {
        params: { id: Xor },
        success: lf,
      }).annotateMerge(
        Fn({
          identifier: "v2.permission.saved.remove",
          summary: "Remove saved permission",
          description: "Remove a saved permission by ID.",
        }),
      ),
    )
    .middleware(e)
    .add(
      sc("session.permission.create", "/api/session/:sessionID/permission", {
        params: { sessionID: P$ },
        payload: nt({
          id: cde.pipe(be),
          action: Nj.fields.action,
          resources: Nj.fields.resources,
          save: Nj.fields.save,
          metadata: Nj.fields.metadata,
          source: Nj.fields.source,
          agent: K1e.pipe(be),
        }),
        success: nt({ data: nt({ id: cde, effect: Hdt }) }),
        error: Wf,
      })
        .middleware(t)
        .annotateMerge(
          Fn({
            identifier: "v2.session.permission.create",
            summary: "Create permission request",
            description:
              "Evaluate and, when approval is required, create a permission request for a session.",
          }),
        ),
    )
    .add(
      MH("session.permission.list", "/api/session/:sessionID/permission", {
        params: { sessionID: P$ },
        success: nt({ data: On(Nj) }),
        error: Wf,
      })
        .middleware(t)
        .annotateMerge(
          Fn({
            identifier: "v2.session.permission.list",
            summary: "List session permission requests",
            description: "Retrieve pending permission requests owned by a session.",
          }),
        ),
    )
    .add(
      MH("session.permission.get", "/api/session/:sessionID/permission/:requestID", {
        params: { sessionID: P$, requestID: cde },
        success: nt({ data: Nj }),
        error: [Wf, kwe],
      })
        .middleware(t)
        .annotateMerge(
          Fn({
            identifier: "v2.session.permission.get",
            summary: "Get permission request",
            description: "Retrieve a pending permission request owned by a session.",
          }),
        ),
    )
    .add(
      sc("session.permission.reply", "/api/session/:sessionID/permission/:requestID/reply", {
        params: { sessionID: P$, requestID: cde },
        payload: nt({ reply: ftr, message: re.pipe(be) }),
        success: lf,
        error: [Wf, kwe],
      })
        .middleware(t)
        .annotateMerge(
          Fn({
            identifier: "v2.session.permission.reply",
            summary: "Reply to pending permission request",
            description: "Respond to a pending permission request owned by a session.",
          }),
        ),
    )
    .annotateMerge(Fn({ title: "permissions", description: "Experimental permission routes." }));