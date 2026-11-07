
function hja(e) {
  return {
    id: e.id,
    project_id: e.projectID,
    workspace_id: e.workspaceID,
    parent_id: e.parentID,
    slug: e.slug,
    directory: e.directory,
    path: e.path,
    title: e.title,
    agent: e.agent,
    model: e.model,
    version: e.version,
    share_url: e.share?.url,
    summary_additions: e.summary?.additions,
    summary_deletions: e.summary?.deletions,
    summary_files: e.summary?.files,
    summary_diffs: e.summary?.diffs,
    metadata: e.metadata,
    cost: e.cost ?? 0,
    tokens_input: (e.tokens ?? Ije).input,
    tokens_output: (e.tokens ?? Ije).output,
    tokens_reasoning: (e.tokens ?? Ije).reasoning,
    tokens_cache_read: (e.tokens ?? Ije).cache.read,
    tokens_cache_write: (e.tokens ?? Ije).cache.write,
    revert: e.revert
      ? {
          messageID: wf.make(e.revert.messageID),
          partID: e.revert.partID,
          snapshot: e.revert.snapshot,
          diff: e.revert.diff,
        }
      : null,
    permission: e.permission,
    time_created: e.time.created,
    time_updated: e.time.updated,
    time_compacting: e.time.compacting,
    time_archived: e.time.archived,
  };
}