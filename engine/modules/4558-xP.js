
var xP = ne(async () => {
  au();
  YM();
  OBi();
  cRi();
  dRi();
  LRi();
  Xbt();
  g7();
  o0();
  OY();
  OMr();
  FMr();
  ijt();
  Gt();
  Ql();
  _w();
  Use();
  _Pe();
  ojt();
  cxr();
  await Jn([XXe(), ZL(), L7(), xP()]);
  ((J2a = { capabilities: { roots: {} } }),
    (K2a = nt({ name: re, uri: re, description: be(re), mimeType: be(re), client: re }).annotate({
      identifier: "McpResource",
    })),
    (h3i = bRi),
    (z2a = jRi),
    (leA = ud.create("MCPFailed", { name: re })));
  g3i = class g3i extends ki()("MCP.NotFoundError", { name: re }) {};
  ((Q2a = nt({ status: ri("connected") }).annotate({ identifier: "MCPStatusConnected" })),
    (Y2a = nt({ status: ri("disabled") }).annotate({ identifier: "MCPStatusDisabled" })),
    (Z2a = nt({ status: ri("failed"), error: re }).annotate({ identifier: "MCPStatusFailed" })),
    (eBa = nt({ status: ri("needs_auth") }).annotate({ identifier: "MCPStatusNeedsAuth" })),
    (tBa = nt({ status: ri("needs_client_registration"), error: re }).annotate({
      identifier: "MCPStatusNeedsClientRegistration",
    })),
    (ljt = Io([Q2a, Y2a, Z2a, eBa, tBa]).annotate({ identifier: "MCPStatus", discriminator: "status" })),
    (LPe = new Map()));
  MP = class MP extends _i()("@opencode/MCP") {};
  ((feA = vm(MP)),
    (rBa = Es(
      MP,
      ft(function* () {
        let e = yield* kS,
          t = yield* fPe,
          r = yield* B$,
          s = yield* zXe,
          a = Ge("MCP.connectTransport")(function* (et, ut) {
            let ht = yield* xX;
            return yield* Ipe(
              Jt(et),
              (Et) =>
                bl({
                  try: () => {
                    let tr = L3i(ht);
                    return APe(tr.connect(Et), ut).then(() => tr);
                  },
                  catch: (tr) => (tr instanceof Error ? tr : Error(String(tr))),
                }),
              (Et, tr) => (LI(tr) ? bl(() => Et.close()).pipe(FA) : ti),
            );
          }),
          H = { status: { status: "disabled" } },
          u = Ge("MCP.connectRemote")(function* (et, ut) {
            let ht = ut.oauth === !1,
              Et = typeof ut.oauth === "object" ? ut.oauth : void 0,
              tr = $3i(ut.url);
            if (!tr)
              return { client: void 0, status: { status: "failed", error: `Invalid MCP URL for "${et}"` } };
            let Rr;
            if (!ht)
              Rr = new Ybt(
                et,
                ut.url,
                {
                  clientId: Et?.clientId,
                  clientSecret: Et?.clientSecret,
                  scope: Et?.scope,
                  callbackPort: Et?.callbackPort,
                  redirectUri: Et?.redirectUri,
                },
                { onRedirect: async () => {} },
                t,
              );
            let Vt = [
                {
                  name: "StreamableHTTP",
                  transport: new Jbt(tr, { authProvider: Rr, fetch: ujt(tr, ut.headers) }),
                },
                { name: "SSE", transport: new PMr(tr, { authProvider: Rr, fetch: ujt(tr, ut.headers) }) },
              ],
              Br = ut.timeout ?? _3i,
              Dt;
            for (let { name: St, transport: wt } of Vt) {
              let Qr = yield* a(wt, Br).pipe(
                Vn((Li) => ({ client: Li, transportName: St })),
                $s((Li) => {
                  let sr = Li instanceof Error ? Li : Error(String(Li));
                  if (Li instanceof Lb || (Rr && sr.message.includes("OAuth")))
                    if (sr.message.includes("registration") || sr.message.includes("client_id"))
                      return (
                        (Dt = {
                          status: "needs_client_registration",
                          error:
                            "Server does not support dynamic client registration. Please provide clientId in config.",
                        }),
                        r
                          .publish(Lee, {
                            title: "MCP Authentication Required",
                            message: `Server "${et}" requires a pre-registered client ID. Add clientId to your config.`,
                            variant: "warning",
                            duration: 8000,
                          })
                          .pipe(FA, eu(void 0))
                      );
                    else
                      return (
                        LPe.set(et, { transport: wt }),
                        (Dt = { status: "needs_auth" }),
                        r
                          .publish(Lee, {
                            title: "MCP Authentication Required",
                            message: `Server "${et}" requires authentication. Run: opencode mcp auth ${et}`,
                            variant: "warning",
                            duration: 8000,
                          })
                          .pipe(FA, eu(void 0))
                      );
                  return ((Dt = { status: "failed", error: sr.message }), ti);
                }),
              );
              if (Qr) return { client: Qr.client, status: { status: "connected" } };
              if (Dt?.status === "needs_auth" || Dt?.status === "needs_client_registration") break;
            }
            return { client: void 0, status: Dt ?? { status: "failed", error: "Unknown error" } };
          }),
          f = Ge("MCP.connectLocal")(function* (et, ut) {
            let [ht, ...Et] = ut.command,
              tr = yield* xX,
              Rr = ut.cwd ? G2a.resolve(tr, ut.cwd) : tr,
              Vt = new Qbt({
                stderr: "pipe",
                command: ht,
                args: Et,
                cwd: Rr,
                env: {
                  ...(process.env.JAC_DESKTOP_MCP === "1" ? m3i(process.env) : process.env),
                  ...(ht === "opencode" ? { BUN_BE_BUN: "1" } : {}),
                  ...ut.environment,
                },
              }),
              Br = ut.timeout ?? _3i;
            return yield* a(Vt, Br).pipe(
              Vn((Dt) => ({ client: Dt, status: { status: "connected" } })),
              $s((Dt) => {
                let St = Dt instanceof Error ? Dt.message : String(Dt);
                return Jt({ client: void 0, status: { status: "failed", error: St } });
              }),
            );
          }),
          d = Ge("MCP.create")(
            function* (et, ut) {
              if (ut.enabled === !1) return H;
              let { client: ht, status: Et } = ut.type === "remote" ? yield* u(et, ut) : yield* f(et, ut);
              if (!ht) {
                if (Et.status !== "connected" && Et.status !== "disabled")
                  yield* lp("server unavailable", { key: et, type: ut.type, status: Et.status });
                return { status: Et };
              }
              return yield* ft(function* () {
                let tr = ht.getServerCapabilities()?.tools ? yield* WMr(ht, ut.timeout) : [];
                if (!tr) return yield* bn(Error("Failed to get tools"));
                return { mcpClient: ht, status: Et, defs: tr, instructions: ht.getInstructions()?.trim() };
              }).pipe(jf((tr) => bl(() => ht.close()).pipe(FA, Zu(NL(tr)))));
            },
            Vn((et) => et),
            jf((et) => {
              if (d1(et)) return PS;
              let ut = hI(et);
              return Jt({
                status: { status: "failed", error: ut instanceof Error ? ut.message : String(ut) },
              });
            }),
          ),
          _ = yield* Eg,
          L = ni(
            function* (et) {
              return [];
            },
            FL,
            $s(() => Jt([])),
          );
        function I(et, ut, ht, Et, tr) {
          if (
            ((ht.onclose = () => {
              if (et.clients[ut] !== ht) return;
              (delete et.clients[ut],
                delete et.defs[ut],
                delete et.instructions[ut],
                (et.status[ut] = { status: "failed", error: "Connection closed" }),
                Et.fork(
                  lp("MCP connection closed", { server: ut }).pipe(Zu(r.publish(h3i, { server: ut })), FA),
                ));
            }),
            ht.setNotificationHandler(Pyr, (Rr) => Et.promise(D(ut, Rr.params))),
            !ht.getServerCapabilities()?.tools)
          )
            return;
          ht.setNotificationHandler(SXe, async () => {
            if (et.clients[ut] !== ht || et.status[ut]?.status !== "connected") return;
            let Rr = await Et.promise(WMr(ht, tr));
            if (!Rr) return;
            if (et.clients[ut] !== ht || et.status[ut]?.status !== "connected") return;
            ((et.defs[ut] = Rr), await Et.promise(r.publish(h3i, { server: ut }).pipe(FA)));
          });
        }
        function D(et, ut) {
          let ht = { server: et, logger: ut.logger, level: ut.level, data: ut.data };
          switch (ut.level) {
            case "debug":
              return plt("MCP server log", ht);
            case "info":
            case "notice":
              return fH("MCP server log", ht);
            case "warning":
              return lp("MCP server log", ht);
            case "error":
            case "critical":
            case "alert":
            case "emergency":
              return cf("MCP server log", ht);
          }
        }
        let S = yield* cx(
          Ge("MCP.state")(function* () {
            let et = yield* _.get(),
              ut = yield* lee(),
              ht = et.mcp ?? {},
              Et = { config: {}, status: {}, clients: {}, defs: {}, instructions: {} };
            return (
              yield* ja(
                Object.entries(ht),
                ([tr, Rr]) =>
                  ft(function* () {
                    if (!QXe(Rr)) {
                      yield* cf("Ignoring MCP config entry without type", { key: tr });
                      return;
                    }
                    if (Rr.enabled === !1) {
                      Et.status[tr] = { status: "disabled" };
                      return;
                    }
                    let Vt = yield* d(tr, Rr);
                    if (((Et.status[tr] = Vt.status), Vt.mcpClient)) {
                      if (((Et.clients[tr] = Vt.mcpClient), (Et.defs[tr] = Vt.defs), Vt.instructions))
                        Et.instructions[tr] = Vt.instructions;
                      I(Et, tr, Vt.mcpClient, ut, Rr.timeout);
                    }
                  }),
                { concurrency: "unbounded" },
              ),
              yield* sL(() =>
                ft(function* () {
                  let tr = Object.values(Et.clients);
                  ((Et.clients = {}),
                    (Et.defs = {}),
                    (Et.instructions = {}),
                    yield* ja(
                      tr,
                      (Rr) =>
                        ft(function* () {
                          let Vt = Rr.transport instanceof Qbt ? Rr.transport.pid : null;
                          if (typeof Vt === "number") {
                            let Br = yield* L(Vt);
                            for (let Dt of Br)
                              try {
                                process.kill(Dt, "SIGTERM");
                              } catch {}
                          }
                          yield* bl(() => Rr.close()).pipe(FA);
                        }),
                      { concurrency: "unbounded" },
                    ),
                    LPe.clear());
                }),
              ),
              Et
            );
          }),
        );
        function T(et, ut) {
          let ht = et.clients[ut];
          if ((delete et.clients[ut], delete et.defs[ut], delete et.instructions[ut], !ht)) return ti;
          return bl(() => ht.close()).pipe(FA);
        }
        let C = ni(function* (et, ut, ht, Et, tr, Rr) {
            let Vt = yield* lee(),
              Br = et.clients[ut];
            if (((et.status[ut] = { status: "connected" }), (et.clients[ut] = ht), (et.defs[ut] = Et), tr))
              et.instructions[ut] = tr;
            else delete et.instructions[ut];
            if ((I(et, ut, ht, Vt, Rr), Br)) yield* bl(() => Br.close()).pipe(FA);
            return et.status[ut];
          }),
          O = Ge("MCP.status")(function* () {
            let et = yield* Eu(S),
              ht = (yield* _.get()).mcp ?? {},
              Et = {};
            for (let [tr, Rr] of Object.entries(ht)) {
              if (!QXe(Rr)) continue;
              Et[tr] = et.status[tr] ?? { status: "disabled" };
            }
            for (let tr of Object.keys(et.config)) Et[tr] = et.status[tr] ?? { status: "disabled" };
            return Et;
          }),
          B = Ge("MCP.clients")(function* () {
            return (yield* Eu(S)).clients;
          }),
          V = Ge("MCP.instructions")(function* () {
            let et = yield* Eu(S);
            return Object.entries(et.instructions)
              .filter(([ut]) => et.status[ut]?.status === "connected")
              .sort(([ut], [ht]) => ut.localeCompare(ht))
              .map(([ut, ht]) => ({
                name: ut,
                instructions: ht,
                tools: (et.defs[ut] ?? []).map((Et) => vRi(ut, Et.name)),
              }));
          }),
          q = Ge("MCP.createAndStore")(function* (et, ut) {
            let ht = yield* Eu(S),
              Et = yield* d(et, ut);
            if (((ht.status[et] = Et.status), !Et.mcpClient))
              return (yield* T(ht, et), delete ht.clients[et], Et.status);
            return yield* C(ht, et, Et.mcpClient, Et.defs, Et.instructions, ut.timeout);
          }),
          Z = Ge("MCP.add")(function* (et, ut) {
            let ht = yield* Eu(S);
            return ((ht.config[et] = ut), yield* q(et, ut), { status: ht.status });
          }),
          se = Ge("MCP.connect")(function* (et) {
            let ut = yield* Pe(et);
            yield* q(et, { ...ut, enabled: !0 });
          }),
          ae = Ge("MCP.disconnect")(function* (et) {
            yield* Pe(et);
            let ut = yield* Eu(S);
            (yield* T(ut, et), delete ut.clients[et], (ut.status[et] = { status: "disabled" }));
          });
        function z(et, ut, ht, Et) {
          let tr = ht && QXe(ht) ? ht.timeout : void 0;
          return et.config[ut]?.timeout ?? tr ?? Et;
        }
        let Ae = Ge("MCP.tools")(function* () {
          let et = {},
            ut = yield* Eu(S),
            ht = yield* _.get(),
            Et = ht.mcp ?? {},
            tr = ht.experimental?.mcp_timeout;
          for (let [Rr, Vt] of Object.entries(ut.clients)) {
            if (ut.status[Rr]?.status !== "connected") continue;
            let Br = Et[Rr],
              Dt = ut.defs[Rr];
            if (!Dt) {
              yield* lp("missing cached tools for connected server", { clientName: Rr });
              continue;
            }
            let St = z(ut, Rr, Br, tr);
            for (let wt of Dt) et[vRi(Rr, wt.name)] = { def: wt, client: Vt, timeout: St };
          }
          return et;
        });
        function le(et, ut, ht, Et, tr) {
          return ft(function* () {
            let Rr = yield* _.get();
            return yield* ja(
              Object.entries(et.clients).filter(
                ([Vt]) => et.status[Vt]?.status === "connected" && (!tr || Vt === tr),
              ),
              ([Vt, Br]) =>
                GFa(
                  Vt,
                  Br,
                  (Dt) => ut(Dt, z(et, Vt, Rr.mcp?.[Vt], Rr.experimental?.mcp_timeout)),
                  ht,
                  Et,
                ).pipe(Vn((Dt) => Object.entries(Dt ?? {}))),
              { concurrency: "unbounded" },
            ).pipe(Vn((Vt) => Object.fromEntries(Vt.flat())));
          });
        }
        let Be = Ge("MCP.prompts")(function* () {
            return yield* le(yield* Eu(S), XFa, "prompts");
          }),
          Te = Ge("MCP.resources")(function* (et) {
            return yield* le(yield* Eu(S), JFa, "resources", (ut) => ut.uri, et);
          }),
          Lt = Ge("MCP.resourceTemplates")(function* (et) {
            return yield* le(yield* Eu(S), KFa, "resource templates", (ut) => ut.uriTemplate, et);
          }),
          Ht = ni(function* (et, ut, ht, Et) {
            let tr = yield* Eu(S),
              Rr = tr.clients[et];
            if (!Rr) {
              yield* lp(`client not found for ${ht}`, { clientName: et });
              return;
            }
            let Vt = yield* _.get();
            return yield* bl({
              try: () => ut(Rr, z(tr, et, Vt.mcp?.[et], Vt.experimental?.mcp_timeout)),
              catch: (Br) => Br,
            }).pipe(
              kye((Br) =>
                cf(`failed to ${ht}`, {
                  clientName: et,
                  ...Et,
                  error: Br instanceof Error ? Br.message : String(Br),
                }),
              ),
              PU(() => {
                return;
              }),
            );
          }),
          Se = Ge("MCP.getPrompt")(function* (et, ut, ht) {
            return yield* Ht(
              et,
              (Et, tr) => Et.getPrompt({ name: ut, arguments: ht }, { timeout: tr }),
              "getPrompt",
              { promptName: ut },
            );
          }),
          _e = Ge("MCP.readResource")(function* (et, ut) {
            return yield* Ht(et, (ht, Et) => ht.readResource({ uri: ut }, { timeout: Et }), "readResource", {
              resourceUri: ut,
            });
          }),
          we = ni(function* (et) {
            let ut = yield* Eu(S);
            if (ut.config[et]) return ut.config[et];
            let Et = (yield* _.get()).mcp?.[et];
            if (!Et || !QXe(Et)) return;
            return Et;
          }),
          Pe = ni(function* (et) {
            let ut = yield* we(et);
            if (!ut) return yield* new g3i({ name: et });
            return ut;
          }),
          ye = Ge("MCP.startAuth")(function* (et) {
            let ut = yield* Pe(et);
            if (ut.type !== "remote") throw Error(`MCP server ${et} is not a remote server`);
            if (ut.oauth === !1) throw Error(`MCP server ${et} has OAuth explicitly disabled`);
            let ht = $3i(ut.url);
            if (!ht) throw Error(`Invalid MCP URL for "${et}"`);
            let Et = typeof ut.oauth === "object" ? ut.oauth : void 0,
              tr =
                Et?.redirectUri ?? (Et?.callbackPort ? `http://127.0.0.1:${Et.callbackPort}${ice}` : void 0);
            yield* nA(() => vFa(tr));
            let Rr = Array.from(crypto.getRandomValues(new Uint8Array(32)))
              .map((wt) => wt.toString(16).padStart(2, "0"))
              .join("");
            yield* t.updateOAuthState(et, Rr);
            let Vt,
              Br = new kMr(
                et,
                ut.url,
                { clientId: Et?.clientId, clientSecret: Et?.clientSecret, scope: Et?.scope, redirectUri: tr },
                {
                  onRedirect: async (wt) => {
                    Vt = wt;
                  },
                },
                t,
              ),
              Dt = new Jbt(ht, { authProvider: Br, fetch: ujt(ht, ut.headers) }),
              St = yield* xX;
            return yield* bl({
              try: () => {
                let wt = L3i(St);
                return wt
                  .connect(Dt)
                  .then(
                    async () => (await Br.commit(), { authorizationUrl: "", oauthState: Rr, client: wt }),
                  );
              },
              catch: (wt) => wt,
            }).pipe(
              $s((wt) => {
                if (wt instanceof Lb && Vt)
                  return (
                    LPe.set(et, { transport: Dt, provider: Br }),
                    Jt({ authorizationUrl: Vt.toString(), oauthState: Rr })
                  );
                return No(wt);
              }),
            );
          }),
          ot = Ge("MCP.authenticate")(function* (et, ut) {
            let ht = yield* ye(et);
            if (!ht.authorizationUrl) {
              let Vt = "client" in ht ? ht.client : void 0,
                Br = yield* Pe(et).pipe(kye(() => bl(() => Vt?.close() ?? Promise.resolve()).pipe(FA))),
                Dt = Vt ? (Vt.getServerCapabilities()?.tools ? yield* WMr(Vt, Br.timeout) : []) : void 0;
              if (!Vt || !Dt)
                return (
                  yield* bl(() => Vt?.close() ?? Promise.resolve()).pipe(FA),
                  { status: "failed", error: "Failed to get tools" }
                );
              let St = yield* Eu(S);
              return (
                yield* t.clearOAuthState(et),
                yield* C(St, et, Vt, Dt, Vt.getInstructions()?.trim(), Br.timeout)
              );
            }
            let Et = bFa(ht.oauthState, et);
            (ut?.(ht.authorizationUrl),
              yield* s
                .open(ht.authorizationUrl)
                .pipe($s(() => r.publish(z2a, { mcpName: et, url: ht.authorizationUrl }).pipe(FA))));
            let tr = yield* nA(() => Et);
            if ((yield* t.getOAuthState(et)) !== ht.oauthState)
              throw (yield* t.clearOAuthState(et), Error("OAuth state mismatch - potential CSRF attack"));
            return (yield* t.clearOAuthState(et), yield* Ee(et, tr));
          }),
          Ee = Ge("MCP.finishAuth")(function* (et, ut) {
            yield* Pe(et);
            let ht = LPe.get(et);
            if (!ht) throw Error(`No pending OAuth flow for MCP server: ${et}`);
            let Et = yield* bl({ try: () => ht.transport.finishAuth(ut), catch: (Rr) => Rr }).pipe(
              yie({
                onFailure: (Rr) => (Rr instanceof Error ? Rr.message : String(Rr)),
                onSuccess: () => {
                  return;
                },
              }),
            );
            if (Et) return { status: "failed", error: `OAuth completion failed: ${Et}` };
            (yield* nA(() => ht.provider?.commit() ?? Promise.resolve()),
              yield* t.clearCodeVerifier(et),
              LPe.delete(et));
            let tr = yield* Pe(et);
            return yield* q(et, { ...tr, enabled: !0 });
          }),
          Ve = Ge("MCP.removeAuth")(function* (et) {
            (yield* t.remove(et), jFa(et), LPe.delete(et));
          }),
          Fe = Ge("MCP.supportsOAuth")(function* (et) {
            let ut = yield* Pe(et);
            return ut.type === "remote" && ut.oauth !== !1;
          }),
          it = Ge("MCP.hasStoredTokens")(function* (et) {
            return !!(yield* t.get(et))?.tokens;
          }),
          At = Ge("MCP.getAuthStatus")(function* (et) {
            let ht = ((yield* JTa(S)) ? (yield* Eu(S)).config[et] : void 0) ?? (yield* _.get()).mcp?.[et];
            if (!ht || !QXe(ht) || ht.type !== "remote") return "not_authenticated";
            let Et = yield* t.getForUrl(et, ht.url);
            if (!Et?.tokens) return "not_authenticated";
            if (Et.tokens.expiresAt && Et.tokens.expiresAt < Date.now() / 1000) return "expired";
            return "authenticated";
          });
        return MP.of({
          status: O,
          clients: B,
          instructions: V,
          tools: Ae,
          prompts: Be,
          resources: Te,
          resourceTemplates: Lt,
          add: Z,
          connect: se,
          disconnect: ae,
          getPrompt: Se,
          readResource: _e,
          startAuth: ye,
          authenticate: ot,
          finishAuth: Ee,
          removeAuth: Ve,
          supportsOAuth: Fe,
          hasStoredTokens: it,
          getAuthStatus: At,
        });
      }),
    )),
    ($Pe = Ll({ service: MP, layer: rBa, deps: [qMe, RMr, q1, Ab, V2a] })));
});