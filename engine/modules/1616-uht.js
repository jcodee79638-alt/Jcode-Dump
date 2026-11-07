
var uht = ne(() => {
  uht();
  Gt();
  g_();
  T2();
  Hu();
  aw();
  ((GG = re.check(k6("per")).pipe(
    Jl("PermissionID"),
    Bl((e) => ({ ascending: (t) => e.make(t ?? "per_" + t0()) })),
  )),
    (eYs = Jo(["allow", "deny", "ask"]).annotate({ identifier: "PermissionAction" })),
    (tYs = nt({ permission: re, pattern: re, action: eYs }).annotate({ identifier: "PermissionRule" })),
    (Jde = On(tYs).annotate({ identifier: "PermissionRuleset" })),
    (bir = nt({
      id: GG,
      sessionID: gf,
      permission: re,
      patterns: On(re),
      metadata: ks(re, PH),
      always: On(re),
      tool: be(nt({ messageID: re, callID: re })),
    }).annotate({ identifier: "PermissionRequest" })),
    (Aht = Jo(["once", "always", "reject"])),
    (rYs = nt({ reply: Aht, message: be(re) }).annotate({ identifier: "PermissionReplyBody" })),
    (YVH = nt({ projectID: S2, patterns: On(re) }).annotate({ identifier: "PermissionApproval" })),
    (ZVH = nt({ ...bir.fields, id: be(GG), ruleset: Jde }).annotate({ identifier: "PermissionAskInput" })),
    (e7H = nt({ requestID: GG, ...rYs.fields }).annotate({ identifier: "PermissionReplyInput" })),
    ($yn = ua({ type: "permission.asked", schema: bir.fields })),
    (gyn = ua({ type: "permission.replied", schema: { sessionID: gf, requestID: GG, reply: Aht } })),
    (Eyn = { Asked: $yn, Replied: gyn, Definitions: jl($yn, gyn) }));
});