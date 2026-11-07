
async function Fbr(e, t, r = { load: KGe, save: mvi }) {
  let s = $v(t),
    a =
      e === "saveMcp"
        ? ["directory", "name", "config", "enabled"]
        : e === "mcpAction"
          ? ["directory", "name", "action"]
          : e === "mcpRead"
            ? ["directory", "server", "uri"]
            : e === "mcpPrompt"
              ? ["directory", "server", "name", "args"]
              : ["directory"];
  if (!["mcpServers", "saveMcp", "mcpAction", "mcpCatalog", "mcpRead", "mcpPrompt", "mcpSync"].includes(e))
    throw Error("Unsupported MCP operation.");
  $$(s, a);
  let H = lW(s.directory),
    u = async () => {
      await Oce();
      await wCe();
      await Promise.resolve().then(() => Gw());
      let I = await KPt({ directory: H }),
        D = await r.load();
      return o9.runPromise(
        ft(function* () {
          let S = yield* MP;
          if ((yield* Obr(I.directory, D, S), e === "mcpSync")) return !0;
          if (e === "saveMcp") {
            let O = zPt(s.name),
              B = { ...D, [O]: C4i(s.config, Gne(s.enabled)) };
            if (Object.keys(B).length > 8 || Buffer.byteLength(JSON.stringify(B)) > 65536)
              throw Error("Keep MCP settings within eight servers and 64 KB.");
            return (yield* nA(() => r.save(B)), yield* Obr(I.directory, B, S), kCe(B, yield* S.status()));
          }
          if (e === "mcpAction") {
            let O = zPt(s.name);
            if (!Object.hasOwn(D, O)) throw Error("MCP server unavailable.");
            let B = iL(s.action, 20);
            if (!["connect", "disconnect", "remove", "auth", "logout"].includes(B))
              throw Error("Choose an MCP server action.");
            if (B === "auth") return (yield* S.authenticate(O), kCe(D, yield* S.status()));
            if (B === "logout")
              return (yield* S.removeAuth(O), yield* S.disconnect(O), kCe(D, yield* S.status()));
            let V =
              B === "remove"
                ? Object.fromEntries(Object.entries(D).filter(([q]) => q !== O))
                : { ...D, [O]: { ...D[O], enabled: B === "connect" } };
            if ((yield* nA(() => r.save(V)), yield* Obr(I.directory, V, S), B === "remove"))
              yield* S.removeAuth(O);
            if (B === "connect" && D[O].enabled !== !1) yield* S.connect(O);
            return kCe(V, yield* S.status());
          }
          if (e === "mcpServers") return kCe(D, yield* S.status());
          if (e === "mcpCatalog") {
            let [O, B, V, q] = yield* Km([S.tools(), S.resources(), S.prompts(), S.resourceTemplates()], {
              concurrency: "unbounded",
            });
            return {
              tools: Object.entries(O)
                .slice(0, 100)
                .map(([Z, se]) => ({ name: Z, description: (se.def.description ?? "").slice(0, 1000) })),
              resources: Object.values(B)
                .slice(0, 100)
                .map((Z) => ({ name: Z.name.slice(0, 256), uri: Z.uri.slice(0, 4096), server: Z.client })),
              prompts: Object.values(V)
                .slice(0, 100)
                .map((Z) => ({
                  name: Z.name.slice(0, 256),
                  description: (Z.description ?? "").slice(0, 1000),
                  server: Z.client,
                })),
              resourceTemplates: Object.values(q)
                .slice(0, 100)
                .map((Z) => ({
                  name: Z.name.slice(0, 256),
                  uriTemplate: Z.uriTemplate.slice(0, 4096),
                  server: Z.client,
                })),
            };
          }
          let T = zPt(s.server);
          if (!Object.hasOwn(D, T)) throw Error("MCP server unavailable.");
          if (e === "mcpRead") {
            let O = yield* S.readResource(T, iL(s.uri, 4096));
            if (!O) throw Error("MCP resource unavailable.");
            return Ubr(O);
          }
          let C = yield* S.getPrompt(
            T,
            iL(s.name, 256),
            s.args === void 0 ? void 0 : Nbr(s.args, "arguments"),
          );
          if (!C) throw Error("MCP prompt unavailable.");
          return Ubr(C);
        }).pipe(IA(Fh, I), vW(e === "mcpAction" && s.action === "auth" ? "2 minutes" : "20 seconds")),
      );
    };
  if (e !== "saveMcp" && e !== "mcpAction") return u();
  if (e === "mcpAction" && s.action === "auth") return u();
  let f = j4i.pending.then(u);
  return (
    (j4i.pending = f.then(
      () => {
        return;
      },
      () => {
        return;
      },
    )),
    f
  );
}