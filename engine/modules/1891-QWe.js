
var QWe = ne(() => {
  QWe();
  Gt();
  g_();
  ZRe();
  (($or = nt({ workspaceID: tY, status: Jo(["connected", "connecting", "disconnected", "error"]) }).annotate({
    identifier: "WorkspaceEvent.ConnectionStatus",
  })),
    (hTn = ua({ type: "workspace.ready", schema: { name: re } })),
    (LTn = ua({ type: "workspace.failed", schema: { message: re } })),
    ($Tn = ua({ type: "workspace.status", schema: $or.fields })),
    (gTn = jl(hTn, LTn, $Tn)));
});