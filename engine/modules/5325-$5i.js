
async function $5i(e) {
  let t = e.instance,
    r = QCe.createMessageConnection(
      new QCe.StreamMessageReader(e.server.process.stdout),
      new QCe.StreamMessageWriter(e.server.process.stdin),
    );
  e.server.process.stderr?.resume();
  let s = new Map(),
    a = new Map(),
    H = new Map(),
    u = new Map(),
    f = new Set(),
    d = new Set(),
    _ = (_e) => h5i([...(s.get(_e) ?? []), ...(a.get(_e) ?? [])]),
    L = (_e, we) => {
      s.set(_e, we);
      for (let Pe of d) Pe({ path: _e, serverID: e.serverID });
    },
    I = (_e, we) => {
      a.set(_e, we);
    },
    D = () => {
      for (let _e of [...f]) _e();
    };
  (r.onNotification("textDocument/publishDiagnostics", (_e) => {
    let we = Djr(_e.uri);
    if (!we) return;
    if (
      (H.set(we, { at: Date.now(), version: typeof _e.version === "number" ? _e.version : void 0 }),
      vGa(e.serverID) && !s.has(we))
    ) {
      s.set(we, _e.diagnostics);
      return;
    }
    L(we, _e.diagnostics);
  }),
    r.onRequest("window/workDoneProgress/create", (_e) => null),
    r.onRequest("workspace/configuration", async (_e) =>
      (_e.items ?? []).map((Pe) => TGa(e.server.initialization, Pe.section)),
    ),
    r.onRequest("client/registerCapability", async (_e) => {
      let we = _e.registrations ?? [],
        Pe = !1;
      for (let ye of we) {
        if (ye.method !== "textDocument/diagnostic") continue;
        (u.set(ye.id, ye), (Pe = !0));
      }
      if (Pe) D();
    }),
    r.onRequest("client/unregisterCapability", async (_e) => {
      let we = _e.unregisterations ?? [],
        Pe = !1;
      for (let ye of we) {
        if (ye.method !== "textDocument/diagnostic") continue;
        (u.delete(ye.id), (Pe = !0));
      }
      if (Pe) D();
    }),
    r.onRequest("workspace/workspaceFolders", async () => [{ name: "workspace", uri: Wce(e.root).href }]),
    r.onRequest("workspace/diagnostic/refresh", async () => null),
    r.listen());
  let S = await APe(
      r.sendRequest("initialize", {
        rootUri: Wce(e.root).href,
        processId: e.server.process.pid,
        workspaceFolders: [{ name: "workspace", uri: Wce(e.root).href }],
        initializationOptions: { ...e.server.initialization },
        capabilities: {
          window: { workDoneProgress: !0 },
          workspace: {
            configuration: !0,
            didChangeWatchedFiles: { dynamicRegistration: !0 },
            diagnostics: { refreshSupport: !1 },
          },
          textDocument: {
            synchronization: { didOpen: !0, didChange: !0 },
            diagnostic: { dynamicRegistration: !0, relatedDocumentSupport: !0 },
            publishDiagnostics: { versionSupport: !1 },
          },
        },
      }),
      IGa,
    ).catch((_e) => {
      throw new L5i({ serverID: e.serverID, cause: _e });
    }),
    T = xGa(S.capabilities),
    C = Boolean(S.capabilities?.diagnosticProvider);
  if ((await r.sendNotification("initialized", {}), e.server.initialization))
    await r.sendNotification("workspace/didChangeConfiguration", { settings: e.server.initialization });
  let O = {},
    B = (_e, we) => {
      let Pe = we.some((Ee) => Ee.handled),
        ye = we.some((Ee) => Ee.matched);
      if (!Pe) return { handled: !1, matched: !1 };
      let ot = new Map();
      for (let Ee of we)
        for (let [Ve, Fe] of Ee.byFile.entries()) {
          let it = ot.get(Ve) ?? [];
          ot.set(Ve, it.concat(Fe));
        }
      if (ye && !ot.has(_e)) ot.set(_e, []);
      for (let [Ee, Ve] of ot.entries()) I(Ee, h5i(Ve));
      return { handled: Pe, matched: ye };
    };
  async function V(_e, we) {
    let Pe = await APe(
      r.sendRequest("textDocument/diagnostic", {
        ...(we ? { identifier: we } : {}),
        textDocument: { uri: Wce(_e).href },
      }),
      _5i,
    ).catch(() => null);
    if (!Pe) return { handled: !1, matched: !1, byFile: new Map() };
    let ye = new Map(),
      ot = (Fe, it) => {
        let At = ye.get(Fe) ?? [];
        ye.set(Fe, At.concat(it));
      },
      Ee = !1,
      Ve = !1;
    if (Array.isArray(Pe.items)) (ot(_e, Pe.items), (Ee = !0), (Ve = !0));
    for (let [Fe, it] of Object.entries(Pe.relatedDocuments ?? {})) {
      let At = Djr(Fe);
      if (!At || !Array.isArray(it.items)) continue;
      (ot(At, it.items), (Ee = !0), (Ve = Ve || At === _e));
    }
    return { handled: Ee, matched: Ve, byFile: ye };
  }
  async function q(_e, we) {
    let Pe = await APe(
      r.sendRequest("workspace/diagnostic", { ...(we ? { identifier: we } : {}), previousResultIds: [] }),
      _5i,
    ).catch(() => null);
    if (!Pe) return { handled: !1, matched: !1, byFile: new Map() };
    let ye = new Map(),
      ot = !1;
    for (let Ee of Pe.items ?? []) {
      let Ve = Ee.uri ? Djr(Ee.uri) : void 0;
      if (!Ve || !Array.isArray(Ee.items)) continue;
      let Fe = ye.get(Ve) ?? [];
      (ye.set(Ve, Fe.concat(Ee.items)), (ot = ot || Ve === _e));
    }
    return { handled: !0, matched: ot, byFile: ye };
  }
  function Z() {
    let _e = [...u.values()].filter((we) => we.registerOptions?.workspaceDiagnostics !== !0);
    return {
      documentIdentifiers: [...new Set(_e.flatMap((we) => we.registerOptions?.identifier ?? []))],
      supported: C || _e.length > 0,
    };
  }
  function se() {
    let _e = [...u.values()].filter((we) => we.registerOptions?.workspaceDiagnostics === !0);
    return {
      workspaceIdentifiers: [...new Set(_e.flatMap((we) => we.registerOptions?.identifier ?? []))],
      supported: _e.length > 0,
    };
  }
  let ae = (_e, we) => we.some((Pe) => (Pe.byFile.get(_e)?.length ?? 0) > 0);
  async function z(_e, we, Pe) {
    if (!we.length) return { handled: !1, matched: !1 };
    let ye = [];
    return new Promise((ot) => {
      let Ee = we.length,
        Ve = !1,
        Fe = (it, At = !1) => {
          if (Ve) return;
          if (!At && !Pe(ye)) return;
          ((Ve = !0), ot(it));
        };
      for (let it of we)
        it.then((At) => {
          (ye.push(At), (Ee -= 1));
          let et = B(_e, ye);
          if ((Fe(et), Ee === 0)) Fe(et, !0);
        });
    });
  }
  async function Ae(_e) {
    let we = Z();
    if (!we.supported) return { handled: !1, matched: !1 };
    return z(_e, [V(_e), ...we.documentIdentifiers.map((Pe) => V(_e, Pe))], (Pe) => ae(_e, Pe));
  }
  async function le(_e) {
    let we = Z(),
      Pe = se();
    if (!we.supported && !Pe.supported) return { handled: !1, matched: !1 };
    return B(
      _e,
      await Promise.all([
        ...(we.supported ? [V(_e)] : []),
        ...we.documentIdentifiers.map((ye) => V(_e, ye)),
        ...(Pe.supported ? [q(_e)] : []),
        ...Pe.workspaceIdentifiers.map((ye) => q(_e, ye)),
      ]),
    );
  }
  function Be(_e) {
    if (_e <= 0) return Promise.resolve(!1);
    return new Promise((we) => {
      let Pe = !1,
        ye,
        ot = (Ve) => {
          if (Pe) return;
          if (((Pe = !0), ye)) clearTimeout(ye);
          (f.delete(Ee), we(Ve));
        },
        Ee = () => ot(!0);
      (f.add(Ee), (ye = setTimeout(() => ot(!1), _e)));
    });
  }
  function Te(_e) {
    if (_e.timeout <= 0) return Promise.resolve(!1);
    return new Promise((we) => {
      let Pe = !1,
        ye,
        ot,
        Ee,
        Ve = (At) => {
          if (Pe) return;
          if (((Pe = !0), ye)) clearTimeout(ye);
          if (ot) clearTimeout(ot);
          (Ee?.(), we(At));
        },
        Fe = () => {
          let At = H.get(_e.path);
          if (!At) return;
          if (typeof At.version === "number" && At.version !== _e.version) return;
          if (At.at < _e.after && At.version !== _e.version) return;
          if (ye) clearTimeout(ye);
          ye = setTimeout(() => Ve(!0), Math.max(0, EGa - (Date.now() - At.at)));
        };
      ot = setTimeout(() => Ve(!1), _e.timeout);
      let it = (At) => {
        if (At.path !== _e.path || At.serverID !== e.serverID) return;
        Fe();
      };
      (d.add(it), (Ee = () => d.delete(it)), Fe());
    });
  }
  async function Lt(_e) {
    let we = _e.after ?? Date.now(),
      Pe = Te({ path: _e.path, version: _e.version, after: we, timeout: Ejr });
    while (Date.now() - we < Ejr) {
      if ((await Ae(_e.path)).matched) return;
      let ot = Ejr - (Date.now() - we);
      if (ot <= 0) return;
      if (
        (await Promise.race([
          Pe.then((Ve) => (Ve ? "push" : "timeout")),
          Be(ot).then((Ve) => (Ve ? "registration" : "timeout")),
        ])) !== "registration"
      )
        return;
    }
  }
  async function Ht(_e) {
    let we = _e.after ?? Date.now(),
      Pe = Te({ path: _e.path, version: _e.version, after: we, timeout: Ijr });
    while (Date.now() - we < Ijr) {
      let ye = await le(_e.path);
      if (ye.handled || ye.matched) return;
      let ot = Ijr - (Date.now() - we);
      if (ot <= 0) return;
      if (
        (await Promise.race([
          Pe.then((Ve) => (Ve ? "push" : "timeout")),
          Be(ot).then((Ve) => (Ve ? "registration" : "timeout")),
        ])) !== "registration"
      )
        return;
    }
  }
  return {
    root: e.root,
    get serverID() {
      return e.serverID;
    },
    get connection() {
      return r;
    },
    notify: {
      async open(_e) {
        _e.path = GDr(nQe.isAbsolute(_e.path) ? _e.path : nQe.resolve(e.directory, _e.path));
        let we = await eXe(_e.path),
          Pe = nQe.extname(_e.path),
          ye = d5i[Pe] ?? "plaintext",
          ot = O[_e.path];
        if (ot !== void 0) {
          await r.sendNotification("workspace/didChangeWatchedFiles", {
            changes: [{ uri: Wce(_e.path).href, type: yGa }],
          });
          let Ee = ot.version + 1;
          return (
            (O[_e.path] = { version: Ee, text: we }),
            await r.sendNotification("textDocument/didChange", {
              textDocument: { uri: Wce(_e.path).href, version: Ee },
              contentChanges:
                T === MGa
                  ? [{ range: { start: { line: 0, character: 0 }, end: SGa(ot.text) }, text: we }]
                  : [{ text: we }],
            }),
            Ee
          );
        }
        return (
          await r.sendNotification("workspace/didChangeWatchedFiles", {
            changes: [{ uri: Wce(_e.path).href, type: DGa }],
          }),
          s.delete(_e.path),
          a.delete(_e.path),
          await r.sendNotification("textDocument/didOpen", {
            textDocument: { uri: Wce(_e.path).href, languageId: ye, version: 0, text: we },
          }),
          (O[_e.path] = { version: 0, text: we }),
          0
        );
      },
    },
    get diagnostics() {
      let _e = new Map();
      for (let we of new Set([...s.keys(), ...a.keys()])) _e.set(we, _(we));
      return _e;
    },
    async waitForDiagnostics(_e) {
      let we = GDr(nQe.isAbsolute(_e.path) ? _e.path : nQe.resolve(e.directory, _e.path));
      if (_e.mode === "document") {
        await Lt({ path: we, version: _e.version, after: _e.after });
        return;
      }
      await Ht({ path: we, version: _e.version, after: _e.after });
    },
    async shutdown() {
      (r.end(), r.dispose(), await $jr(e.server.process));
    },
  };
}