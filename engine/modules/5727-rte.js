
var rte = ne(async () => {
  au();
  vy();
  Gt();
  YM();
  Cf();
  Ef();
  Ef();
  Ef();
  pW();
  w3e();
  jA();
  Ry();
  mme();
  ILt();
  vV();
  Kj();
  cee();
  jZi();
  Gw();
  QWe();
  await Jn([
    qL(),
    m7(),
    fL(),
    ZL(),
    JS(),
    wwt(),
    fjt(),
    e$(),
    l$e(),
    jI(),
    wX(),
    tte(),
    cR(),
    kwt(),
    BQe(),
    rte(),
  ]);
  ((cAe = nt({ ...YXe.fields, timeUsed: Aa }).annotate({ identifier: "Workspace" })),
    (prH = $or),
    (PZi = Ame));
  ((drH = nt({
    id: be(YS),
    type: cAe.fields.type,
    branch: cAe.fields.branch,
    projectID: z_,
    extra: be(cAe.fields.extra),
  })),
    (wZi = nt({ workspaceID: w6(YS), sessionID: Ec, copyChanges: be(Vi) })));
  ECr = class ECr extends ki()("WorkspaceSyncHttpError", { message: re, status: Aa, body: be(re) }) {};
  DCr = class DCr extends ki()("WorkspaceNotFoundError", { message: re, workspaceID: YS }) {};
  kZi = class kZi extends ki()("WorkspaceSessionEventsNotFoundError", { message: re, sessionID: Ec }) {};
  ICr = class ICr extends (
    ki()("WorkspaceSessionWarpHttpError", {
      message: re,
      workspaceID: YS,
      sessionID: Ec,
      status: Aa,
      body: re,
    })
  ) {};
  OZi = class OZi extends ki()("WorkspaceSyncTimeoutError", { message: re, state: ks(re, Aa) }) {};
  UZi = class UZi extends ki()("WorkspaceSyncAbortedError", { message: re, cause: be(yd()) }) {};
  DR = class DR extends _i()("@opencode/Workspace") {};
  ((eCA = vm(DR)),
    (mrH = Es(
      DR,
      ft(function* () {
        let e = yield* TX,
          t = yield* Mg,
          r = yield* Ewe,
          s = yield* gy,
          a = yield* B$,
          H = yield* iAe,
          u = yield* NE,
          f = yield* ui.Service,
          { db: d } = yield* Vd,
          _ = new Map(),
          L = yield* gWs(),
          I = (Ht, Se) => {
            if (_.get(Ht)?.status === Se) return;
            let we = { workspaceID: Ht, status: Se };
            (_.set(Ht, we),
              g$.emit("event", {
                directory: "global",
                workspace: Ht,
                payload: { type: PZi.Status.type, properties: we },
              }));
          },
          D = Ge("Workspace.connectSSE")(function* (Ht, Se) {
            let _e = yield* s.execute(
              KM(Pwe(Ht, "/global/event"), { headers: new Headers(Se), accept: "text/event-stream" }),
            );
            if (_e.status < 200 || _e.status >= 300)
              return yield* new ECr({
                message: `Workspace sync HTTP failure: ${_e.status}`,
                status: _e.status,
              });
            return _e.stream;
          }),
          S = Ge("Workspace.parseSSE")(function* (Ht, Se) {
            yield* Ht.pipe(
              C6(),
              d1e,
              $Fs(
                () => ({ data: [], id: void 0, retry: 1000 }),
                (_e, we) => {
                  if (we === "") {
                    if (!_e.data.length) return [_e, []];
                    return [
                      { ..._e, data: [] },
                      [
                        {
                          data: _e.data.join(`
`),
                          id: _e.id,
                          retry: _e.retry,
                        },
                      ],
                    ];
                  }
                  let Pe = we.indexOf(":"),
                    ye = Pe === -1 ? we : we.slice(0, Pe),
                    ot = Pe === -1 ? "" : we.slice(Pe + (we[Pe + 1] === " " ? 2 : 1));
                  if (ye === "data") return [{ ..._e, data: [..._e.data, ot] }, []];
                  if (ye === "id") return [{ ..._e, id: ot }, []];
                  if (ye === "retry") {
                    let Ee = Number.parseInt(ot, 10);
                    return [Number.isNaN(Ee) ? _e : { ..._e, retry: Ee }, []];
                  }
                  return [_e, []];
                },
                {
                  onHalt: (_e) =>
                    _e.data.length
                      ? [
                          {
                            data: _e.data.join(`
`),
                            id: _e.id,
                            retry: _e.retry,
                          },
                        ]
                      : [],
                },
              ),
              xE((_e) => {
                try {
                  return JSON.parse(_e.data);
                } catch {
                  return {
                    type: "sse.message",
                    properties: { data: _e.data, id: _e.id || void 0, retry: _e.retry },
                  };
                }
              }),
              FW(Se),
            );
          }),
          T = (Ht) =>
            ft(function* () {
              if (!Ht.workspaceID) return yield* Ht.local();
              let Se = yield* z(Ht.workspaceID);
              if (!Se) return Ht.fallback;
              let _e = yield* jwe(Se);
              if (_e.type === "local")
                return yield* (yield* HR).provide({ directory: _e.directory }, Ht.local());
              let we = yield* s
                .execute(Ht.remote({ workspace: Se, target: _e }))
                .pipe(
                  $s((ye) =>
                    lp("workspace target request failed", { workspaceID: Se.id, error: THe(ye) }).pipe(
                      eu(void 0),
                    ),
                  ),
                );
              if (!we) return Ht.fallback;
              if (we.status < 200 || we.status >= 300) {
                let ye = yield* we.text.pipe($s(() => Jt("")));
                return (
                  yield* lp("workspace target request failed", {
                    workspaceID: Se.id,
                    status: we.status,
                    body: ye,
                  }),
                  Ht.fallback
                );
              }
              return yield* (Ht.response === "text" ? we.text : we.json).pipe(
                Vn((ye) => ye),
                $s((ye) =>
                  lp("workspace target response decode failed", { workspaceID: Se.id, error: THe(ye) }).pipe(
                    eu(Ht.fallback),
                  ),
                ),
              );
            }),
          C = Ge("Workspace.syncHistory")(function* (Ht, Se, _e) {
            let we = (yield* d
                .select({ id: la.id })
                .from(la)
                .where(Pi(la.workspace_id, Ht.id))
                .all()
                .pipe(on)).map((Ee) => Ee.id),
              Pe = we.length
                ? Object.fromEntries(
                    (yield* d.select().from(j$).where(Wv(j$.aggregate_id, we)).all().pipe(on)).map((Ee) => [
                      Ee.aggregate_id,
                      Ee.seq,
                    ]),
                  )
                : {},
              ye = yield* s.execute(u2(Pwe(Se, "/sync/history"), { headers: new Headers(_e), body: QW(Pe) }));
            if (ye.status < 200 || ye.status >= 300) {
              let Ee = yield* ye.text;
              return yield* new ECr({
                message: `Workspace history HTTP failure: ${ye.status} ${Ee}`,
                status: ye.status,
                body: Ee,
              });
            }
            let ot = yield* ye.json;
            yield* ja(
              ot,
              (Ee) =>
                a
                  .replay(
                    {
                      id: b2.make(Ee.id),
                      aggregateID: Ee.aggregate_id,
                      seq: Ee.seq,
                      type: Ee.type,
                      data: Ee.data,
                    },
                    { publish: !0, ownerID: Ht.id },
                  )
                  .pipe(IA(bI, Ht.id)),
              { discard: !0 },
            );
          }),
          O = Ge("Workspace.syncWorkspaceLoop")(function* (Ht) {
            let Se = yield* jwe(Ht);
            if (Se.type === "local") return;
            let _e = 0;
            while (!0) {
              I(Ht.id, "connecting");
              let we = yield* D(Se.url, Se.headers).pipe(
                DE(() => C(Ht, Se.url, Se.headers)),
                $s((Pe) =>
                  ft(function* () {
                    return (
                      I(Ht.id, "error"),
                      yield* lp("failed to connect to global sync", { workspace: Ht.name, error: THe(Pe) }),
                      null
                    );
                  }),
                ),
              );
              if (we)
                ((_e = 0),
                  I(Ht.id, "connected"),
                  yield* S(we, (Pe) =>
                    ft(function* () {
                      if (!Pe || typeof Pe !== "object" || !("payload" in Pe)) return;
                      let ye = Pe.payload;
                      if (ye.type === "server.heartbeat") return;
                      if (ye.type === "sync" && ye.syncEvent) {
                        if (
                          yield* a.replay(ye.syncEvent, { publish: !0, ownerID: Ht.id }).pipe(
                            eu(!1),
                            jf((Ee) =>
                              lp("failed to replay global event", Ee).pipe(
                                wU({ workspaceID: Ht.id }),
                                eu(!0),
                              ),
                            ),
                          )
                        )
                          return;
                      }
                      try {
                        let ot = Pe;
                        g$.emit("event", {
                          directory: ot.directory,
                          project: ot.project,
                          workspace: Ht.id,
                          payload: ot.payload,
                        });
                      } catch (ot) {
                        yield* lp("failed to emit global event", { workspaceID: Ht.id, error: THe(ot) });
                      }
                    }),
                  ),
                  I(Ht.id, "disconnected"));
              (yield* Qq(`${Math.min(120000, 1000 * 2 ** _e)} millis`), (_e += 1));
            }
          }),
          B = Ge("Workspace.startSync")(function* (Ht) {
            if (!u.experimentalWorkspaces) return;
            let Se = yield* jwe(Ht).pipe(
              $s((we) =>
                ft(function* () {
                  return (
                    I(Ht.id, "error"),
                    yield* lp("workspace target failed", { workspaceID: Ht.id, error: THe(we) }),
                    null
                  );
                }),
              ),
            );
            if (!Se) return;
            if (Se.type === "local") {
              I(Ht.id, (yield* f.existsSafe(Se.directory)) ? "connected" : "error");
              return;
            }
            if ((yield* opn(L, Ht.id)) && _.get(Ht.id)?.status !== "error") return;
            (I(Ht.id, "disconnected"),
              yield* MWs(
                L,
                Ht.id,
                O(Ht).pipe(
                  $s((we) =>
                    ft(function* () {
                      (I(Ht.id, "error"),
                        yield* lp("workspace listener failed", { workspaceID: Ht.id, error: THe(we) }));
                    }),
                  ),
                ),
              ));
          }),
          V = Ge("Workspace.stopSync")(function* (Ht) {
            (yield* DWs(L, Ht), _.delete(Ht));
          }),
          q = Ge("Workspace.create")(function* (Ht) {
            let Se = YS.ascending(Ht.id),
              _e = WQe(Ht.projectID, Ht.type),
              we = yield* ArH(_e, {
                ...Ht,
                id: Se,
                name: Yv.create(),
                directory: null,
                extra: Ht.extra ?? null,
              }),
              Pe = {
                id: Se,
                type: we.type,
                branch: we.branch ?? null,
                name: we.name ?? null,
                directory: we.directory ?? null,
                extra: we.extra ?? null,
                projectID: Ht.projectID,
                timeUsed: Date.now(),
              };
            yield* d
              .insert(x1)
              .values({
                id: Pe.id,
                type: Pe.type,
                branch: Pe.branch,
                name: Pe.name,
                directory: Pe.directory,
                extra: Pe.extra,
                project_id: Pe.projectID,
                time_used: Pe.timeUsed,
              })
              .run()
              .pipe(on);
            let ye = {
              OPENCODE_AUTH_CONTENT: JSON.stringify(yield* e.all()),
              OPENCODE_WORKSPACE_ID: we.id,
              OPENCODE_EXPERIMENTAL_WORKSPACES: "true",
              OTEL_EXPORTER_OTLP_HEADERS: process.env.OTEL_EXPORTER_OTLP_HEADERS,
              OTEL_EXPORTER_OTLP_ENDPOINT: process.env.OTEL_EXPORTER_OTLP_ENDPOINT,
              OTEL_RESOURCE_ATTRIBUTES: process.env.OTEL_RESOURCE_ATTRIBUTES,
            };
            return (
              yield* urH(_e, we, ye),
              yield* Km(
                [
                  $Cr({
                    timeout: CZi,
                    fn(ot) {
                      if (ot.workspace === Pe.id && ot.payload.type === PZi.Status.type) {
                        let { status: Ee } = ot.payload.properties;
                        return Ee === "error" || Ee === "connected";
                      }
                      return !1;
                    },
                  }),
                  B(Pe),
                ],
                { concurrency: 2, discard: !0 },
              ),
              Pe
            );
          }),
          Z = Ge("Workspace.sessionWarp")(function* (Ht) {
            return yield* ft(function* () {
              let Se = yield* d
                .select({ workspaceID: la.workspace_id })
                .from(la)
                .where(Pi(la.id, Ht.sessionID))
                .get()
                .pipe(on);
              if (Se?.workspaceID) {
                let it = yield* z(Se.workspaceID);
                if (it) {
                  let At = yield* jwe(it);
                  if (At.type === "remote")
                    yield* C(it, At.url, At.headers).pipe(
                      $s((et) =>
                        lp("session warp final source sync failed", {
                          workspaceID: it.id,
                          sessionID: Ht.sessionID,
                          error: THe(et),
                        }),
                      ),
                    );
                  else yield* r.cancel(Ht.sessionID);
                  yield* a.claim(Ht.sessionID, Ht.workspaceID ?? it.projectID);
                }
              }
              let _e =
                Ht.copyChanges && Se?.workspaceID
                  ? yield* T({
                      workspaceID: Se?.workspaceID ?? void 0,
                      local: () => H.diffRaw(),
                      remote: ({ target: it }) =>
                        KM(Pwe(it.url, "/vcs/diff/raw"), { headers: new Headers(it.headers) }),
                      fallback: "",
                      response: "text",
                    }).pipe(vj(m$e(Gze)))
                  : "";
              if (_e)
                yield* T({
                  workspaceID: Ht.workspaceID ?? void 0,
                  local: () => H.apply({ patch: _e }),
                  remote: ({ target: it }) =>
                    u2(Pwe(it.url, "/vcs/apply"), {
                      headers: new Headers(it.headers),
                      body: QW({ patch: _e }),
                    }),
                  fallback: { applied: !1 },
                }).pipe(vj(m$e(Gze)));
              if (Ht.workspaceID === null) {
                yield* t.setWorkspace({ sessionID: Ht.sessionID, workspaceID: void 0 });
                return;
              }
              let we = Ht.workspaceID,
                Pe = yield* z(we);
              if (!Pe) return yield* new DCr({ message: `Workspace not found: ${we}`, workspaceID: we });
              let ye = yield* jwe(Pe);
              if (ye.type === "local") {
                yield* t.setWorkspace({ sessionID: Ht.sessionID, workspaceID: Ht.workspaceID });
                return;
              }
              let ot = yield* d
                .select({
                  id: E_.id,
                  aggregateID: E_.aggregate_id,
                  seq: E_.seq,
                  type: E_.type,
                  data: E_.data,
                })
                .from(E_)
                .where(Pi(E_.aggregate_id, Ht.sessionID))
                .orderBy(Qm(E_.seq))
                .all()
                .pipe(on);
              if (ot.length === 0)
                return yield* new kZi({
                  message: `No events found for session: ${Ht.sessionID}`,
                  sessionID: Ht.sessionID,
                });
              let Ee = vOs(ot, 10),
                Ve = TOs(Ee);
              yield* ja(
                Ee,
                (it, At) =>
                  ft(function* () {
                    let et = yield* s.execute(
                      u2(Pwe(ye.url, "/sync/replay"), {
                        headers: new Headers(ye.headers),
                        body: QW({ directory: Pe.directory ?? "", events: it }),
                      }),
                    );
                    if (et.status < 200 || et.status >= 300) {
                      let ut = yield* et.text;
                      return yield* new ICr({
                        message: `Failed to warp session ${Ht.sessionID} into workspace ${we}: HTTP ${et.status} ${ut}`,
                        workspaceID: we,
                        sessionID: Ht.sessionID,
                        status: et.status,
                        body: ut,
                      });
                    }
                  }),
                { discard: !0 },
              );
              let Fe = yield* s.execute(
                u2(Pwe(ye.url, "/sync/steal"), {
                  headers: new Headers(ye.headers),
                  body: QW({ sessionID: Ht.sessionID }),
                }),
              );
              if (Fe.status < 200 || Fe.status >= 300) {
                let it = yield* Fe.text;
                return yield* new ICr({
                  message: `Failed to steal session ${Ht.sessionID} into workspace ${we}: HTTP ${Fe.status} ${it}`,
                  workspaceID: we,
                  sessionID: Ht.sessionID,
                  status: Fe.status,
                  body: it,
                });
              }
              yield* t.setWorkspace({ sessionID: Ht.sessionID, workspaceID: Ht.workspaceID });
            });
          }),
          se = Ge("Workspace.list")(function* (Ht) {
            if (!u.experimentalWorkspaces) return [];
            return (yield* d.select().from(x1).where(Pi(x1.project_id, Ht.id)).all().pipe(on))
              .map(Owt)
              .sort((Se, _e) => Se.id.localeCompare(_e.id));
          }),
          ae = Ge("Workspace.syncList")(function* (Ht) {
            let Se = new Set((yield* se(Ht)).map((we) => we.name)),
              _e = yield* ja(
                LCr(Ht.id),
                ([we, Pe]) =>
                  lrH(Pe).pipe(
                    jf((ye) => lp("workspace adapter list failed", { type: we, error: ye }).pipe(eu([]))),
                  ),
                { concurrency: "unbounded" },
              ).pipe(Vn((we) => we.flat()));
            yield* ja(
              _e,
              (we) =>
                ft(function* () {
                  if (Se.has(we.name)) return;
                  Se.add(we.name);
                  let Pe = {
                    id: YS.ascending(),
                    type: we.type,
                    branch: we.branch,
                    name: we.name,
                    directory: we.directory,
                    extra: we.extra,
                    projectID: we.projectID,
                    timeUsed: Date.now(),
                  };
                  (yield* d
                    .insert(x1)
                    .values({
                      id: Pe.id,
                      type: Pe.type,
                      branch: Pe.branch,
                      name: Pe.name,
                      directory: Pe.directory,
                      extra: Pe.extra,
                      project_id: Pe.projectID,
                      time_used: Pe.timeUsed,
                    })
                    .run()
                    .pipe(on),
                    yield* B(Pe));
                }),
              { concurrency: 1 },
            );
          }),
          z = Ge("Workspace.get")(function* (Ht) {
            let Se = yield* d.select().from(x1).where(Pi(x1.id, Ht)).get().pipe(on);
            if (!Se) return;
            return Owt(Se);
          }),
          Ae = Ge("Workspace.remove")(function* (Ht) {
            let Se = yield* d
                .select({ id: la.id, parentID: la.parent_id })
                .from(la)
                .where(Pi(la.workspace_id, Ht))
                .all()
                .pipe(on),
              _e = new Set(Se.map((ye) => ye.id));
            yield* ja(
              Se.filter((ye) => !ye.parentID || !_e.has(ye.parentID)),
              (ye) => t.remove(ye.id).pipe(GM(Xw.isInstance, () => ti)),
              { discard: !0 },
            );
            let we = yield* d.select().from(x1).where(Pi(x1.id, Ht)).get().pipe(on);
            if (!we) return;
            yield* V(Ht);
            let Pe = Owt(we);
            return (
              yield* jf(
                ft(function* () {
                  yield* frH(Pe);
                }),
                () => cf("adapter not available when removing workspace", { type: we.type }),
              ),
              yield* d.delete(x1).where(Pi(x1.id, Ht)).run().pipe(on),
              Pe
            );
          }),
          le = Ge("Workspace.status")(function* () {
            return [..._.values()];
          }),
          Be = Ge("Workspace.isSyncing")(function* (Ht) {
            return (yield* opn(L, Ht)) && _.get(Ht)?.status !== "error";
          }),
          Te = Ge("Workspace.waitForSync")(function* (Ht, Se, _e, we = CZi) {
            if (yield* FZi(d, Se)) return;
            yield* $s(NZi({ db: d, workspaceID: Ht, state: Se, signal: _e, timeout: we }), () =>
              _e?.aborted
                ? bn(
                    new UZi({
                      message: _e.reason instanceof Error ? _e.reason.message : "Request aborted",
                      cause: _e.reason,
                    }),
                  )
                : bn(
                    new OZi({
                      message: `Timed out waiting for sync fence: ${JSON.stringify(Se)}`,
                      state: Se,
                    }),
                  ),
            );
          }),
          Lt = Ge("Workspace.startWorkspaceSyncing")(function* (Ht) {
            if (!u.experimentalWorkspaces) return;
            let Se = yield* d
              .selectDistinct({ workspace: x1 })
              .from(x1)
              .where(Pi(x1.project_id, Ht))
              .all()
              .pipe(on);
            for (let { workspace: _e } of Se)
              yield* B(Owt(_e)).pipe(
                $s((we) =>
                  jn(() => {
                    I(_e.id, "error");
                  }),
                ),
                LNs,
              );
          });
        return DR.of({
          create: q,
          sessionWarp: Z,
          list: se,
          syncList: ae,
          get: z,
          remove: Ae,
          status: le,
          isSyncing: Be,
          waitForSync: Te,
          startWorkspaceSyncing: Lt,
        });
      }),
    )));
  yZi = Ll({ service: DR, layer: mrH, deps: [pje, WB, XPr, Q0, q1, vQe, WN, ui.node, DD] });
});