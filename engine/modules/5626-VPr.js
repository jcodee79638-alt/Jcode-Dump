
var VPr = ne(async () => {
  Ohe();
  _Pe();
  aQe();
  lb();
  EHe();
  Gt();
  zM();
  iXe();
  Ry();
  await Jn([xP(), ET(), A$e(), SX(), jI(), L7(), VPr()]);
  ((ete = {
    list: "list_mcp_resources",
    listTemplates: "list_mcp_resource_templates",
    read: "read_mcp_resource",
  }),
    (iQi = new Set(["application/pdf", "image/gif", "image/jpeg", "image/png", "image/webp"])),
    (tYa = Ge("SessionTools.resolve")(function* (e) {
      let t = {},
        r = yield* lee(),
        s = yield* IT,
        a = yield* FB,
        H = yield* nAe,
        u = yield* MP,
        f = yield* RN,
        d = yield* NE,
        _ = (I, D) => ({
          sessionID: e.session.id,
          abort: D.abortSignal,
          messageID: e.processor.message.id,
          callID: D.toolCallId,
          extra: { model: e.model, bypassAgentCheck: e.bypassAgentCheck, promptOps: e.promptOps },
          agent: e.agent.name,
          messages: e.messages,
          metadata: (S) =>
            e.processor.updateToolCall(D.toolCallId, (T) => {
              if (!["running", "pending"].includes(T.state.status)) return T;
              return {
                ...T,
                state: {
                  title: S.title,
                  metadata: S.metadata,
                  status: "running",
                  input: I,
                  time: T.state.status === "running" ? T.state.time : { start: Date.now() },
                },
              };
            }),
          ask: (S) =>
            a
              .ask({
                ...S,
                sessionID: e.session.id,
                tool: { messageID: e.processor.message.id, callID: D.toolCallId },
                ruleset: gT(e.agent.permission, e.session.permission ?? []),
              })
              .pipe(on),
        });
      for (let I of yield* H.tools({
        modelID: WL.make(e.model.api.id),
        providerID: e.model.providerID,
        agent: e.agent,
        permission: e.session.permission,
      })) {
        let D = Q5e(e.model, sXi(I));
        t[I.id] = MX({
          description: I.description,
          inputSchema: ub(D),
          execute(S, T) {
            return r.promise(
              ft(function* () {
                let C = _(S, T);
                yield* s.trigger(
                  "tool.execute.before",
                  { tool: I.id, sessionID: C.sessionID, callID: C.callID },
                  { args: S },
                );
                let O = yield* I.execute(S, C),
                  B = {
                    ...O,
                    attachments: O.attachments?.map((V) => ({
                      ...V,
                      id: Zp.ascending(),
                      sessionID: C.sessionID,
                      messageID: e.processor.message.id,
                    })),
                  };
                if (
                  (yield* s.trigger(
                    "tool.execute.after",
                    { tool: I.id, sessionID: C.sessionID, callID: C.callID, args: S },
                    B,
                  ),
                  T.abortSignal?.aborted)
                )
                  yield* e.processor.completeToolCall(T.toolCallId, B);
                return B;
              }),
            );
          },
        });
      }
      if (Object.values(yield* u.clients()).some((I) => !!I.getServerCapabilities()?.resources))
        ((t[ete.list] = MX({
          description:
            "Lists resources provided by connected MCP servers. Resources provide context such as files, database schemas, or application-specific information.",
          inputSchema: ub(
            Q5e(e.model, {
              type: "object",
              properties: {
                server: {
                  type: "string",
                  description:
                    "Optional MCP server name. When omitted, lists resources from every connected server.",
                },
              },
              additionalProperties: !1,
            }),
          ),
          execute(I, D) {
            return r.promise(
              ft(function* () {
                let S = rQi(I),
                  T = _(SQe(I), D),
                  C = yield* u.clients(),
                  O = Object.entries(C)
                    .filter((z) => !!z[1].getServerCapabilities()?.resources)
                    .map((z) => z[0])
                    .sort((z, Ae) => z.localeCompare(Ae));
                if (S.server && !O.includes(S.server))
                  throw Error(
                    O.length === 0
                      ? `MCP server "${S.server}" does not support resources`
                      : `MCP server "${S.server}" does not support resources. Available resource servers: ${O.join(", ")}`,
                  );
                let B = S.server ? [`mcp:${S.server}:*`] : O.map((z) => `mcp:${z}:*`);
                (yield* s.trigger(
                  "tool.execute.before",
                  { tool: ete.list, sessionID: T.sessionID, callID: D.toolCallId },
                  { args: I },
                ),
                  yield* T.ask({
                    permission: "read",
                    metadata: S.server ? { server: S.server } : {},
                    patterns: B,
                    always: B,
                  }));
                let q = Object.values(yield* u.resources(S.server))
                    .filter((z) => !S.server || z.client === S.server)
                    .toSorted((z, Ae) =>
                      (z.client + "\x00" + z.name + "\x00" + z.uri).localeCompare(
                        Ae.client + "\x00" + Ae.name + "\x00" + Ae.uri,
                      ),
                    ),
                  Z = JSON.stringify({ resources: q.map(nYa) }, null, 2),
                  se = yield* f.output(Z, {}, e.agent),
                  ae = {
                    title: S.server ? `MCP resources: ${S.server}` : "MCP resources",
                    metadata: {
                      count: q.length,
                      servers: O,
                      ...(S.server ? { server: S.server } : {}),
                      truncated: se.truncated,
                      ...(se.truncated && { outputPath: se.outputPath }),
                    },
                    output: se.content,
                  };
                if (
                  (yield* s.trigger(
                    "tool.execute.after",
                    { tool: ete.list, sessionID: T.sessionID, callID: D.toolCallId, args: I },
                    ae,
                  ),
                  D.abortSignal?.aborted)
                )
                  yield* e.processor.completeToolCall(D.toolCallId, ae);
                return ae;
              }),
            );
          },
        })),
          (t[ete.listTemplates] = MX({
            description:
              "Lists resource templates provided by connected MCP servers. Resource templates are parameterized resources that can be read after filling in their URI template.",
            inputSchema: ub(
              Q5e(e.model, {
                type: "object",
                properties: {
                  server: {
                    type: "string",
                    description:
                      "Optional MCP server name. When omitted, lists resource templates from every connected server.",
                  },
                },
                additionalProperties: !1,
              }),
            ),
            execute(I, D) {
              return r.promise(
                ft(function* () {
                  let S = rQi(I),
                    T = _(SQe(I), D),
                    C = yield* u.clients(),
                    O = Object.entries(C)
                      .filter((z) => !!z[1].getServerCapabilities()?.resources)
                      .map((z) => z[0])
                      .sort((z, Ae) => z.localeCompare(Ae));
                  if (S.server && !O.includes(S.server))
                    throw Error(
                      O.length === 0
                        ? `MCP server "${S.server}" does not support resources`
                        : `MCP server "${S.server}" does not support resources. Available resource servers: ${O.join(", ")}`,
                    );
                  let B = S.server ? [`mcp:${S.server}:*`] : O.map((z) => `mcp:${z}:*`);
                  (yield* s.trigger(
                    "tool.execute.before",
                    { tool: ete.listTemplates, sessionID: T.sessionID, callID: D.toolCallId },
                    { args: I },
                  ),
                    yield* T.ask({
                      permission: "read",
                      metadata: S.server ? { server: S.server } : {},
                      patterns: B,
                      always: B,
                    }));
                  let q = Object.values(yield* u.resourceTemplates(S.server))
                      .filter((z) => !S.server || z.client === S.server)
                      .toSorted((z, Ae) =>
                        (z.client + "\x00" + z.name + "\x00" + z.uriTemplate).localeCompare(
                          Ae.client + "\x00" + Ae.name + "\x00" + Ae.uriTemplate,
                        ),
                      ),
                    Z = JSON.stringify({ resourceTemplates: q.map(iYa) }, null, 2),
                    se = yield* f.output(Z, {}, e.agent),
                    ae = {
                      title: S.server ? `MCP resource templates: ${S.server}` : "MCP resource templates",
                      metadata: {
                        count: q.length,
                        servers: O,
                        ...(S.server ? { server: S.server } : {}),
                        truncated: se.truncated,
                        ...(se.truncated && { outputPath: se.outputPath }),
                      },
                      output: se.content,
                    };
                  if (
                    (yield* s.trigger(
                      "tool.execute.after",
                      { tool: ete.listTemplates, sessionID: T.sessionID, callID: D.toolCallId, args: I },
                      ae,
                    ),
                    D.abortSignal?.aborted)
                  )
                    yield* e.processor.completeToolCall(D.toolCallId, ae);
                  return ae;
                }),
              );
            },
          })),
          (t[ete.read] = MX({
            description:
              "Read a specific resource from an MCP server using the server name and resource URI. The URI is an MCP identifier and does not need to be a file URL.",
            inputSchema: ub(
              Q5e(e.model, {
                type: "object",
                properties: {
                  server: {
                    type: "string",
                    description: "MCP server name exactly as returned by list_mcp_resources.",
                  },
                  uri: {
                    type: "string",
                    description:
                      "Resource URI to read. Use the exact URI string returned by list_mcp_resources.",
                  },
                },
                required: ["server", "uri"],
                additionalProperties: !1,
              }),
            ),
            execute(I, D) {
              return r.promise(
                ft(function* () {
                  let S = rYa(I),
                    T = _(SQe(I), D),
                    O = (yield* u.clients())[S.server];
                  if (!O) throw Error(`MCP server "${S.server}" is not connected`);
                  if (!O.getServerCapabilities()?.resources)
                    throw Error(`MCP server "${S.server}" does not support resources`);
                  (yield* s.trigger(
                    "tool.execute.before",
                    { tool: ete.read, sessionID: T.sessionID, callID: D.toolCallId },
                    { args: I },
                  ),
                    yield* T.ask({
                      permission: "read",
                      metadata: { server: S.server, uri: S.uri },
                      patterns: [`mcp:${S.server}:${S.uri}`],
                      always: [`mcp:${S.server}:*`],
                    }));
                  let B = yield* u.readResource(S.server, S.uri);
                  if (!B) throw Error(`Failed to read MCP resource: ${S.server}/${S.uri}`);
                  let V = sYa(S.server, S.uri, B),
                    q = yield* f.output(V.text, {}, e.agent),
                    Z = {
                      title: `MCP resource: ${S.uri}`,
                      metadata: {
                        server: S.server,
                        uri: S.uri,
                        contents: V.contents,
                        attachments: V.attachments.length,
                        truncated: q.truncated,
                        ...(q.truncated && { outputPath: q.outputPath }),
                      },
                      output: q.content,
                      attachments: V.attachments.map((se) => ({
                        ...se,
                        id: Zp.ascending(),
                        sessionID: T.sessionID,
                        messageID: e.processor.message.id,
                      })),
                    };
                  if (
                    (yield* s.trigger(
                      "tool.execute.after",
                      { tool: ete.read, sessionID: T.sessionID, callID: D.toolCallId, args: I },
                      Z,
                    ),
                    D.abortSignal?.aborted)
                  )
                    yield* e.processor.completeToolCall(D.toolCallId, Z);
                  return Z;
                }),
              );
            },
          })));
      if (d.experimentalCodeMode) return t;
      for (let [I, D] of Object.entries(yield* u.tools())) {
        let S = qFa(D.def, D.client, D.timeout),
          T = S.execute;
        if (!T) continue;
        let C = yield* nA(() => Promise.resolve(Rw(S.inputSchema).jsonSchema)),
          O = Q5e(e.model, { ...C, properties: C.properties ?? {} });
        ((S.inputSchema = ub(O)),
          (S.execute = (B, V) =>
            r.promise(
              ft(function* () {
                let q = _(B, V);
                yield* s.trigger(
                  "tool.execute.before",
                  { tool: I, sessionID: q.sessionID, callID: V.toolCallId },
                  { args: B },
                );
                let Z = yield* ft(function* () {
                  return (
                    yield* q.ask({ permission: I, metadata: {}, patterns: ["*"], always: ["*"] }),
                    yield* nA(() => T(B, V))
                  );
                }).pipe(
                  gI("Tool.execute", {
                    attributes: {
                      "tool.name": I,
                      "tool.call_id": V.toolCallId,
                      "session.id": q.sessionID,
                      "message.id": e.processor.message.id,
                    },
                  }),
                );
                yield* s.trigger(
                  "tool.execute.after",
                  { tool: I, sessionID: q.sessionID, callID: V.toolCallId, args: B },
                  Z,
                );
                let se = [],
                  ae = [];
                for (let Be of Z.content)
                  if (Be.type === "text") se.push(Be.text);
                  else if (Be.type === "image")
                    ae.push({
                      type: "file",
                      mime: Be.mimeType,
                      url: `data:${Be.mimeType};base64,${Be.data}`,
                    });
                  else if (Be.type === "resource") {
                    let { resource: Te } = Be;
                    if (Te.text) se.push(Te.text);
                    if (Te.blob) {
                      let Lt = Te.mimeType ?? "application/octet-stream",
                        Ht = oQi(Te.blob);
                      if (!iQi.has(Lt)) {
                        se.push(
                          `[Binary MCP resource omitted: ${Te.uri} (${Lt}, ${gwe(Ht)}) is not a supported attachment type]`,
                        );
                        continue;
                      }
                      if (Ht > awt) {
                        se.push(
                          `[Binary MCP resource omitted: ${Te.uri} (${Lt}, ${gwe(Ht)}) exceeds ${gwe(awt)}]`,
                        );
                        continue;
                      }
                      ae.push({
                        type: "file",
                        mime: Lt,
                        url: `data:${Lt};base64,${Te.blob}`,
                        filename: Te.uri,
                      });
                    }
                  }
                let z = yield* f.output(
                    se.join(`

`),
                    {},
                    e.agent,
                  ),
                  le = {
                    title: "",
                    metadata: {
                      ...Z.metadata,
                      truncated: z.truncated,
                      ...(z.truncated && { outputPath: z.outputPath }),
                    },
                    output: z.content,
                    attachments: ae.map((Be) => ({
                      ...Be,
                      id: Zp.ascending(),
                      sessionID: q.sessionID,
                      messageID: e.processor.message.id,
                    })),
                    content: Z.content,
                  };
                if (V.abortSignal?.aborted) yield* e.processor.completeToolCall(V.toolCallId, le);
                return le;
              }),
            )),
          (t[I] = S));
      }
      return t;
    })));
});
import HQi from "path";
import oYa from "os";
import { pathToFileURL as aYa, fileURLToPath as qPr } from "url";