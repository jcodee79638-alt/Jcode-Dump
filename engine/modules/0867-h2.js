
var h2 = ne(() => {
  h2();
  OH();
  Gt();
  ude();
  rV();
  ((US = K1e), (mdn = US.make("build")), (_DH = pdn), (LVs = ddn));
  MG = class MG extends _i()("@opencode/v2/Agent") {};
  ((_dn = Es(
    MG,
    ft(function* () {
      let e = lde({
          initial: () => ({ agents: new Map() }),
          draft: (s) => ({
            list: () => Xg(s.agents.values()),
            get: (a) => s.agents.get(a),
            default: (a) => {
              s.default = a;
            },
            update: (a, H) => {
              let u = s.agents.get(a) ?? LVs.empty(a);
              if (!s.agents.has(a)) s.agents.set(a, u);
              (H(u), (u.id = a));
            },
            remove: (a) => {
              s.agents.delete(a);
            },
          }),
        }),
        t = (s) => (s && s.mode !== "subagent" && !s.hidden ? s : void 0),
        r = () => {
          let s = e.get(),
            a = s.default ? t(s.agents.get(s.default)) : void 0;
          if (a) return a;
          let H = t(s.agents.get(US.make("build")));
          if (H) return H;
          for (let u of s.agents.values()) {
            let f = t(u);
            if (f) return f;
          }
        };
      return MG.of({
        transform: e.transform,
        reload: e.reload,
        get: Ge("AgentV2.get")(function* (s) {
          return e.get().agents.get(s);
        }),
        default: Ge("AgentV2.default")(function* () {
          return r();
        }),
        resolve: Ge("AgentV2.resolve")(function* (s) {
          if (s !== void 0) return e.get().agents.get(US.make(s));
          return r();
        }),
        select: Ge("AgentV2.select")(function* (s) {
          if (s !== void 0) {
            let H = US.make(s);
            return { id: H, info: e.get().agents.get(H) };
          }
          let a = r();
          return { id: a?.id ?? mdn, info: a };
        }),
        all: Ge("AgentV2.all")(function* () {
          return Xg(e.get().agents.values());
        }),
      });
    }),
  )),
    (hdn = _dn),
    (s3e = Ua({ service: MG, layer: _dn, deps: [] })));
});