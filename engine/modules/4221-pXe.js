
function pXe(e) {
  let t =
      e.summary_additions !== null || e.summary_deletions !== null || e.summary_files !== null
        ? {
            additions: e.summary_additions ?? 0,
            deletions: e.summary_deletions ?? 0,
            files: e.summary_files ?? 0,
            diffs: e.summary_diffs ?? void 0,
          }
        : void 0,
    r = e.share_url ? { url: e.share_url } : void 0,
    s = e.revert
      ? {
          messageID: Td.make(e.revert.messageID),
          partID: e.revert.partID ? Zp.make(e.revert.partID) : void 0,
          snapshot: e.revert.snapshot,
          diff: e.revert.diff,
        }
      : void 0;
  return {
    id: e.id,
    slug: e.slug,
    projectID: e.project_id,
    workspaceID: e.workspace_id ?? void 0,
    directory: e.directory,
    path: e.path ?? void 0,
    parentID: e.parent_id ?? void 0,
    title: e.title,
    agent: e.agent ?? void 0,
    model: e.model
      ? { id: WL.make(e.model.id), providerID: Kp.make(e.model.providerID), variant: e.model.variant }
      : void 0,
    version: e.version,
    summary: t,
    cost: e.cost,
    tokens: {
      input: e.tokens_input,
      output: e.tokens_output,
      reasoning: e.tokens_reasoning,
      cache: { read: e.tokens_cache_read, write: e.tokens_cache_write },
    },
    share: r,
    metadata: e.metadata ?? void 0,
    revert: s,
    permission: e.permission ? [...e.permission] : void 0,
    time: {
      created: e.time_created,
      updated: e.time_updated,
      compacting: e.time_compacting ?? void 0,
      archived: e.time_archived ?? void 0,
    },
  };
}