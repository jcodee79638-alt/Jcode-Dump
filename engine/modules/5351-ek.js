
var ek = ne(async () => {
  au();
  jA();
  yjr();
  o0();
  Ree();
  xjr();
  Gt();
  Ql();
  QPt();
  BA();
  Ry();
  ECt();
  vjr();
  await Jn([ZL(), x5i(), ek()]);
  ((D5a = twe),
    (j5i = nt({ line: Ko, character: Ko })),
    (jjr = nt({ start: j5i, end: j5i }).annotate({ identifier: "Range" })),
    (y5a = nt({ name: re, kind: Ko, location: nt({ uri: re, range: jjr }) }).annotate({
      identifier: "Symbol",
    })),
    (TEA = nt({ name: re, detail: be(re), kind: Ko, range: jjr, selectionRange: jjr }).annotate({
      identifier: "DocumentSymbol",
    })),
    (M5a = nt({ id: re, name: re, root: re, status: Jo(["connected", "error"]) }).annotate({
      identifier: "LSPStatus",
    })),
    (x5a = [5, 12, 6, 11, 13, 14, 23, 10]));
  fR = class fR extends _i()("@opencode/LSP") {};
  ((T5a = Es(
    fR,
    ft(function* () {
      let e = yield* Eg,
        t = yield* NE,
        r = yield* B$,
        s = yield* cx(
          Ge("LSP.state")(function* (ae) {
            let z = yield* e.get(),
              Ae = {};
            if (!z.lsp) yield* fH("all LSPs are disabled");
            else {
              for (let Be of Object.values(Tjr)) Ae[Be.id] = Be;
              if ((S5a(Ae, t), z.lsp !== !0))
                for (let [Be, Te] of Object.entries(z.lsp)) {
                  let Lt = Ae[Be];
                  if (Te.disabled) {
                    (yield* fH(`LSP server ${Be} is disabled`), delete Ae[Be]);
                    continue;
                  }
                  Ae[Be] = {
                    ...Lt,
                    id: Be,
                    root: Lt?.root ?? (async (Ht, Se) => Se.directory),
                    extensions: Te.extensions ?? Lt?.extensions ?? [],
                    spawn: async (Ht) => ({
                      process: Df(Te.command[0], Te.command.slice(1), {
                        cwd: Ht,
                        env: { ...process.env, ...Te.env },
                      }),
                      initialization: Te.initialization,
                    }),
                  };
                }
              yield* fH("enabled LSP servers", {
                serverIds: Object.values(Ae)
                  .map((Be) => Be.id)
                  .join(", "),
              });
            }
            let le = { clients: [], servers: Ae, broken: new Set(), spawning: new Map() };
            return (
              yield* sL(() =>
                nA(async () => {
                  await Promise.all(le.clients.map((Be) => Be.shutdown()));
                }),
              ),
              le
            );
          }),
        ),
        a = ni(function* (ae) {
          let z = yield* Jc;
          if (!XLe(ae, z)) return [];
          let Ae = yield* Eu(s),
            le = yield* nA(async () => {
              let Be = bjr.parse(ae).ext || ae,
                Te = [],
                Lt = 0;
              async function Ht(Se, _e, we) {
                let Pe = await Se.spawn(_e, z, t)
                  .then((Ee) => {
                    if (!Ee) Ae.broken.add(we);
                    return Ee;
                  })
                  .catch(() => {
                    Ae.broken.add(we);
                    return;
                  });
                if (!Pe) return;
                let ye = await $5i({
                  serverID: Se.id,
                  server: Pe,
                  root: _e,
                  directory: z.directory,
                  instance: z,
                }).catch(async () => {
                  (Ae.broken.add(we), await $jr(Pe.process));
                  return;
                });
                if (!ye) return;
                let ot = Ae.clients.find((Ee) => Ee.root === _e && Ee.serverID === Se.id);
                if (ot) return (await $jr(Pe.process), ot);
                return (Ae.clients.push(ye), ye);
              }
              for (let Se of Object.values(Ae.servers)) {
                if (Se.extensions.length && !Se.extensions.includes(Be)) continue;
                let _e = await Se.root(ae, z);
                if (!_e) continue;
                if (Ae.broken.has(_e + Se.id)) continue;
                let we = Ae.clients.find((Ee) => Ee.root === _e && Ee.serverID === Se.id);
                if (we) {
                  Te.push(we);
                  continue;
                }
                let Pe = Ae.spawning.get(_e + Se.id);
                if (Pe) {
                  let Ee = await Pe;
                  if (!Ee) continue;
                  Te.push(Ee);
                  continue;
                }
                let ye = Ht(Se, _e, _e + Se.id);
                (Ae.spawning.set(_e + Se.id, ye),
                  ye.finally(() => {
                    if (Ae.spawning.get(_e + Se.id) === ye) Ae.spawning.delete(_e + Se.id);
                  }));
                let ot = await ye;
                if (!ot) continue;
                (Te.push(ot), Lt++);
              }
              return { result: Te, updated: Lt };
            });
          return (
            yield* ja(Array.from({ length: le.updated }), () => r.publish(D5a.Updated, {}), { discard: !0 }),
            le.result
          );
        }),
        H = ni(function* (ae, z) {
          let Ae = yield* a(ae);
          return yield* nA(() => Promise.all(Ae.map((le) => z(le))));
        }),
        u = ni(function* (ae) {
          let z = yield* Eu(s);
          return yield* nA(() => Promise.all(z.clients.map((Ae) => ae(Ae))));
        }),
        f = Ge("LSP.init")(function* () {
          yield* Eu(s);
        }),
        d = Ge("LSP.status")(function* () {
          let ae = yield* Jc,
            z = yield* Eu(s),
            Ae = [];
          for (let le of z.clients)
            Ae.push({
              id: le.serverID,
              name: z.servers[le.serverID].id,
              root: bjr.relative(ae.directory, le.root),
              status: "connected",
            });
          return Ae;
        }),
        _ = Ge("LSP.hasClients")(function* (ae) {
          let z = yield* Jc,
            Ae = yield* Eu(s);
          return yield* nA(async () => {
            let le = bjr.parse(ae).ext || ae;
            for (let Be of Object.values(Ae.servers)) {
              if (Be.extensions.length && !Be.extensions.includes(le)) continue;
              let Te = await Be.root(ae, z);
              if (!Te) continue;
              if (Ae.broken.has(Te + Be.id)) continue;
              return !0;
            }
            return !1;
          });
        }),
        L = Ge("LSP.touchFile")(function* (ae, z) {
          yield* fH("touching file", { file: ae });
          let Ae = yield* a(ae);
          yield* nA(() =>
            Promise.all(
              Ae.map(async (le) => {
                let Be = Date.now(),
                  Te = await le.notify.open({ path: ae });
                if (!z) return;
                return le.waitForDiagnostics({ path: ae, version: Te, mode: z, after: Be });
              }),
            ).catch(() => {}),
          );
        }),
        I = Ge("LSP.diagnostics")(function* () {
          let ae = {},
            z = yield* u(async (Ae) => Ae.diagnostics);
          for (let Ae of z)
            for (let [le, Be] of Ae.entries()) {
              let Te = ae[le] || [];
              (Te.push(...Be), (ae[le] = Te));
            }
          return ae;
        }),
        D = Ge("LSP.hover")(function* (ae) {
          return yield* H(ae.file, (z) =>
            z.connection
              .sendRequest("textDocument/hover", {
                textDocument: { uri: rwe(ae.file).href },
                position: { line: ae.line, character: ae.character },
              })
              .catch(() => null),
          );
        }),
        S = Ge("LSP.definition")(function* (ae) {
          return (yield* H(ae.file, (Ae) =>
            Ae.connection
              .sendRequest("textDocument/definition", {
                textDocument: { uri: rwe(ae.file).href },
                position: { line: ae.line, character: ae.character },
              })
              .catch(() => null),
          ))
            .flat()
            .filter(Boolean);
        }),
        T = Ge("LSP.references")(function* (ae) {
          return (yield* H(ae.file, (Ae) =>
            Ae.connection
              .sendRequest("textDocument/references", {
                textDocument: { uri: rwe(ae.file).href },
                position: { line: ae.line, character: ae.character },
                context: { includeDeclaration: !0 },
              })
              .catch(() => []),
          ))
            .flat()
            .filter(Boolean);
        }),
        C = Ge("LSP.implementation")(function* (ae) {
          return (yield* H(ae.file, (Ae) =>
            Ae.connection
              .sendRequest("textDocument/implementation", {
                textDocument: { uri: rwe(ae.file).href },
                position: { line: ae.line, character: ae.character },
              })
              .catch(() => null),
          ))
            .flat()
            .filter(Boolean);
        }),
        O = Ge("LSP.documentSymbol")(function* (ae) {
          let z = I5a(ae);
          return (yield* H(z, (le) =>
            le.connection
              .sendRequest("textDocument/documentSymbol", { textDocument: { uri: ae } })
              .catch(() => []),
          ))
            .flat()
            .filter(Boolean);
        }),
        B = Ge("LSP.workspaceSymbol")(function* (ae) {
          return (yield* u((Ae) =>
            Ae.connection
              .sendRequest("workspace/symbol", { query: ae })
              .then((le) => le.filter((Be) => x5a.includes(Be.kind)).slice(0, 10))
              .catch(() => []),
          )).flat();
        }),
        V = Ge("LSP.prepareCallHierarchy")(function* (ae) {
          return (yield* H(ae.file, (Ae) =>
            Ae.connection
              .sendRequest("textDocument/prepareCallHierarchy", {
                textDocument: { uri: rwe(ae.file).href },
                position: { line: ae.line, character: ae.character },
              })
              .catch(() => []),
          ))
            .flat()
            .filter(Boolean);
        }),
        q = ni(function* (ae, z) {
          return (yield* H(ae.file, async (le) => {
            let Be = await le.connection
              .sendRequest("textDocument/prepareCallHierarchy", {
                textDocument: { uri: rwe(ae.file).href },
                position: { line: ae.line, character: ae.character },
              })
              .catch(() => []);
            if (!Be?.length) return [];
            return le.connection.sendRequest(z, { item: Be[0] }).catch(() => []);
          }))
            .flat()
            .filter(Boolean);
        }),
        Z = Ge("LSP.incomingCalls")(function* (ae) {
          return yield* q(ae, "callHierarchy/incomingCalls");
        }),
        se = Ge("LSP.outgoingCalls")(function* (ae) {
          return yield* q(ae, "callHierarchy/outgoingCalls");
        });
      return fR.of({
        init: f,
        status: d,
        hasClients: _,
        touchFile: L,
        diagnostics: I,
        hover: D,
        definition: S,
        references: T,
        implementation: C,
        documentSymbol: O,
        workspaceSymbol: B,
        prepareCallHierarchy: V,
        incomingCalls: Z,
        outgoingCalls: se,
      });
    }),
  )),
    (iQe = Ll({ service: fR, layer: T5a, deps: [Ab, WN, ui.node, q1] })));
});