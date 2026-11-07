
var Bzi = ne(async () => {
  g7();
  Gt();
  wzi();
  _Pe();
  lb();
  await Jn([Vy(), xP(), Jw(), e$(), ET()]);
  Ozi = nt({ code: re.annotate({ description: "Script body executed by the confined interpreter." }) });
  ((PQa = Ge("CodeMode.invokeChildTool")(function* (e) {
    yield* e.plugin.trigger(
      "tool.execute.before",
      { tool: e.entry.key, sessionID: e.ctx.sessionID, callID: e.callID },
      { args: e.args },
    );
    let t = yield* ft(function* () {
      return (
        yield* e.ctx.ask({ permission: e.entry.key, metadata: {}, patterns: ["*"], always: ["*"] }),
        yield* nA(async () => {
          let r = await e.entry.tool.client.callTool({ name: e.entry.tool.def.name, arguments: e.args }, NX, {
            resetTimeoutOnProgress: !0,
            signal: e.ctx.abort,
            timeout: e.entry.tool.timeout,
            onprogress: () => {},
          });
          if (r.isError)
            throw Error(
              r.content.flatMap((s) => (s.type === "text" ? [s.text] : [])).filter((s) => s.trim()).join(`

`) || "MCP tool returned an error",
            );
          return r;
        })
      );
    }).pipe(
      gI("Tool.execute", {
        attributes: {
          "tool.name": e.entry.key,
          "tool.call_id": e.callID,
          "session.id": e.ctx.sessionID,
          "message.id": e.ctx.messageID,
        },
      }),
    );
    return (
      yield* e.plugin.trigger(
        "tool.execute.after",
        { tool: e.entry.key, sessionID: e.ctx.sessionID, callID: e.callID, args: e.args },
        t,
      ),
      t
    );
  })),
    (CQa = t_(
      hwe,
      ft(function* () {
        let e = yield* MP,
          t = yield* DP,
          r = yield* Mg,
          s = yield* IT;
        return {
          description: TQa,
          parameters: Ozi,
          execute: Ge("CodeMode.execute")(function* (H, u) {
            if (u.abort.aborted)
              return { title: hwe, metadata: { toolCalls: [], error: !0 }, output: "Execution cancelled." };
            let f = yield* t.get(u.agent),
              d = yield* r.get(u.sessionID).pipe(on),
              _ = gT(f.permission, d.permission ?? []),
              L = c8i(yield* e.tools(), _),
              I = Object.keys(yield* e.clients()).map(mPe),
              D = [...Uzi(L, I).values()].flat(),
              S = [],
              T = [],
              C = () => u.metadata({ title: hwe, metadata: { toolCalls: S.map((le) => ({ ...le })) } }),
              O = 0,
              B = (le) => (Be) =>
                ft(function* () {
                  O += 1;
                  let Te = yield* PQa({
                    plugin: s,
                    entry: le,
                    args: Be ?? {},
                    callID: `${u.callID ?? le.key}/${O}`,
                    ctx: u,
                  });
                  return jQa(Te, (Lt) => void T.push(Lt));
                }).pipe(
                  jf((Te) => {
                    if (d1(Te)) return PS;
                    let Lt = hI(Te);
                    return bn(i$e(Lt instanceof Error ? Lt.message : String(Lt), Lt));
                  }),
                ),
              V = vzi({
                tools: Nzi(D, B),
                onToolCallStart: ({ index: le, name: Be, input: Te }) =>
                  yH(() => {
                    let Lt = (() => {
                      if (Te === null || Te === void 0) return;
                      if (typeof Te === "object" && !Array.isArray(Te)) {
                        let Ht = Te;
                        return Object.keys(Ht).length > 0 ? Ht : void 0;
                      }
                      return { input: Te };
                    })();
                    return ((S[le] = { tool: Be, status: "running", ...(Lt ? { input: Lt } : {}) }), C());
                  }),
                onToolCallEnd: ({ index: le, outcome: Be }) =>
                  yH(() => {
                    let Te = S[le];
                    if (Te) S[le] = { ...Te, status: Be === "success" ? "completed" : "error" };
                    return C();
                  }),
              }),
              q = Fd((le) => {
                if (u.abort.aborted) return le(ti);
                let Be = () => le(ti);
                return (
                  u.abort.addEventListener("abort", Be, { once: !0 }),
                  jn(() => u.abort.removeEventListener("abort", Be))
                );
              }),
              Z = () => ({
                ok: !1,
                error: { kind: "ExecutionFailure", message: "Execution cancelled." },
                toolCalls: S.map((le) => ({ name: le.tool })),
              }),
              se = yield* Yq(V.execute(H.code), q.pipe(Vn(Z))),
              ae = se.logs ?? [],
              z = (le) => {
                if (ae.length === 0) return le;
                return le.length > 0
                  ? `${le}

Logs:
${ae.join(`
`)}`
                  : `Logs:
${ae.join(`
`)}`;
              };
            if (!se.ok) {
              if (u.abort.aborted)
                return { title: hwe, metadata: { toolCalls: S, error: !0 }, output: "Execution cancelled." };
              let le = (se.error.suggestions ?? []).filter((Be) => !se.error.message.includes(Be));
              return yield* bn(
                Error(
                  z(
                    [se.error.message, ...le].join(`
`),
                  ),
                ),
              );
            }
            let Ae =
              typeof se.value === "string"
                ? se.value
                : (JSON.stringify(se.value, null, 2) ?? String(se.value));
            return {
              title: hwe,
              metadata: { toolCalls: S },
              output: z(Ae),
              ...(T.length > 0 ? { attachments: T } : {}),
            };
          }, on),
        };
      }),
    )));
});
import Rzi from "path";
import { pathToFileURL as wQa } from "url";