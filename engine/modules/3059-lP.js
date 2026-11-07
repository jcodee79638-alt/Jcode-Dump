
var lP = ne(async () => {
  CE();
  Gt();
  ixe();
  PLr();
  AP();
  ww();
  OH();
  await Jn([lP(), SMt()]);
  sbe = class sbe extends _i()("@opencode/v2/ToolRegistry") {};
  ((ela = Es(
    sbe,
    ft(function* () {
      let e = yield* Vqe,
        t = yield* z_e,
        r = new Map(),
        s = Ge("ToolRegistry.settle")(function* (a, H) {
          let u = r.get(a.call.name)?.at(-1)?.registration ?? e.entries().get(a.call.name);
          if (!u)
            return {
              result: {
                type: "error",
                value: H ? `Stale tool call: ${a.call.name}` : `Unknown tool: ${a.call.name}`,
              },
            };
          if (H && u.identity !== H)
            return { result: { type: "error", value: `Stale tool call: ${a.call.name}` } };
          let f = yield* mIi(u.tool, a.call, {
            sessionID: a.sessionID,
            agent: a.agent,
            assistantMessageID: a.assistantMessageID,
            toolCallID: a.call.id,
          }).pipe(
            Vn((I) => ({ output: I })),
            EA("LLM.ToolFailure", (I) => Jt({ result: { type: "error", value: I.message } })),
          );
          if ("result" in f) return f;
          let d = f.output,
            _ = yield* t.bound({ sessionID: a.sessionID, toolCallID: a.call.id, output: d }),
            L = _V.toResultValue(_.output);
          if (L.type === "error")
            return _.outputPaths.length > 0 ? { result: L, outputPaths: _.outputPaths } : { result: L };
          return _.outputPaths.length > 0
            ? { result: L, output: _.output, outputPaths: _.outputPaths }
            : { result: L, output: _.output };
        });
      return sbe.of({
        register: Ge("ToolRegistry.register")(function* (a) {
          let H = Object.entries(a);
          if (H.length === 0) return;
          (yield* ja(H, ([u]) => bLr(u), { discard: !0 }),
            yield* BL(
              ft(function* () {
                let u = {};
                for (let [f, d] of H)
                  r.set(f, [...(r.get(f) ?? []), { token: u, registration: { identity: {}, tool: d } }]);
                yield* sL(() =>
                  jn(() => {
                    for (let [f] of H) {
                      let d = r.get(f)?.filter((_) => _.token !== u) ?? [];
                      if (d.length > 0) r.set(f, d);
                      else r.delete(f);
                    }
                  }),
                );
              }),
            ));
        }),
        materialize: Ge("ToolRegistry.materialize")(function* (a = []) {
          let H = new Map(e.entries());
          for (let [u, f] of r) {
            let d = f.at(-1)?.registration;
            if (d) H.set(u, d);
          }
          for (let [u, f] of H) if (tla(pIi(f.tool, u), a)) H.delete(u);
          return {
            definitions: Array.from(H, ([u, f]) => dIi(u, f.tool)),
            settle: (u) => {
              let f = H.get(u.call.name);
              if (f) return s(u, f.identity);
              return Jt({ result: { type: "error", value: `Unknown tool: ${u.call.name}` } });
            },
          };
        }),
      });
    }),
  )),
    (LIi = Es(
      uP,
      sbe.use((e) => Jt(uP.of({ register: e.register }))),
    ).pipe(Jm(ela))));
  ((T8 = Ua({ service: sbe, layer: LIi, deps: [_Ii, SLr] })),
    (rla = Ua({ service: uP, layer: LIi, deps: [_Ii, SLr] })));
});