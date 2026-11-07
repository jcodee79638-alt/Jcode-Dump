
var ude = ne(() => {
  ude();
  Gt();
  Hu();
  tV();
  nY();
  Hde();
  Hu();
  ((K1e = re.pipe(Jl("AgentV2.ID"))),
    (pdn = Io([
      re.check(cRe(/^#[0-9a-fA-F]{6}$/)),
      Jo(["primary", "secondary", "accent", "success", "warning", "error", "info"]),
    ]).annotate({ identifier: "Agent.Color" })),
    (ddn = nt({
      id: K1e,
      model: IG.pipe(Gn),
      request: n3e,
      system: re.pipe(Gn),
      description: re.pipe(Gn),
      mode: Jo(["subagent", "primary", "all"]),
      hidden: Vi,
      color: pdn.pipe(Gn),
      steps: qc.pipe(Gn),
      permissions: i3e,
    })
      .annotate({ identifier: "AgentV2.Info" })
      .pipe(
        Bl((e) => ({
          empty: (t) =>
            e.make({ id: t, request: { headers: {}, body: {} }, mode: "all", hidden: !1, permissions: [] }),
        })),
      )));
});