
function zsH(e) {
  let t = e.components?.schemas;
  if (!t) return;
  if (t.AgentConfig) t.AgentConfig.additionalProperties = {};
  if (t.Command?.properties?.template) t.Command.properties.template = { type: "string" };
  if (t.Workspace?.properties)
    ((t.Workspace.properties.branch = Qwe(t.Workspace.properties.branch)),
      (t.Workspace.properties.directory = Qwe(t.Workspace.properties.directory)),
      (t.Workspace.properties.extra = Qwe(t.Workspace.properties.extra)));
  if (t.GlobalSession?.properties?.project)
    t.GlobalSession.properties.project = Qwe(t.GlobalSession.properties.project);
  let r = t.ProviderConfig?.properties?.options;
  if (r) r.additionalProperties = {};
  let s = t.ProviderConfig?.properties?.models?.additionalProperties,
    a = typeof s === "object" ? s.properties?.variants?.additionalProperties : void 0;
  if (a && typeof a === "object") a.additionalProperties = {};
  let H = t.SyncEventSessionUpdated?.properties?.data?.properties?.info;
  if (H?.properties) Drs(H.properties);
}