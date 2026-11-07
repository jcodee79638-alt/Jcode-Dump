
var nY = ne(() => {
  nY();
  Gt();
  Hu();
  g_();
  aw();
  Hu();
  ((cde = re.check(k6("per")).pipe(
    Jl("PermissionV2.ID"),
    Bl((e) => ({ create: (t) => e.make(t ?? "per_" + t0()) })),
  )),
    (udn = Io([nt({ type: ri("tool"), messageID: re, callID: re })]).annotate({
      identifier: "PermissionV2.Source",
    })),
    (hVs = {
      sessionID: gf,
      action: re,
      resources: On(re),
      save: On(re).pipe(Gn),
      metadata: ks(re, PH).pipe(Gn),
      source: udn.pipe(Gn),
    }),
    (Nj = nt({ id: cde, ...hVs }).annotate({ identifier: "PermissionV2.Request" })),
    (ftr = Jo(["once", "always", "reject"]).annotate({ identifier: "PermissionV2.Reply" })),
    (cdn = ua({ type: "permission.v2.asked", schema: Nj.fields })),
    (Adn = ua({ type: "permission.v2.replied", schema: { sessionID: gf, requestID: cde, reply: ftr } })),
    (ldn = { Asked: cdn, Replied: Adn, Definitions: jl(cdn, Adn) }),
    (Hdt = Jo(["allow", "deny", "ask"]).annotate({ identifier: "PermissionV2.Effect" })),
    (fdn = nt({ action: re, resource: re, effect: Hdt }).annotate({ identifier: "PermissionV2.Rule" })),
    (i3e = On(fdn).annotate({ identifier: "PermissionV2.Ruleset" })));
});