
function kce(e) {
  let t =
    e.icon_url || e.icon_url_override || e.icon_color
      ? { url: e.icon_url ?? void 0, override: e.icon_url_override ?? void 0, color: e.icon_color ?? void 0 }
      : void 0;
  return {
    id: e.id,
    worktree: e.worktree,
    vcs: e.vcs ? E1(_ir)(e.vcs) : void 0,
    name: e.name ?? void 0,
    icon: t,
    time: { created: e.time_created, updated: e.time_updated, initialized: e.time_initialized ?? void 0 },
    sandboxes: e.sandboxes,
    commands: e.commands ?? void 0,
  };
}