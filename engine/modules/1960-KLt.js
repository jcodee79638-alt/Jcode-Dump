
function KLt(e) {
  return qao.make({
    id: Jj.make(e.id),
    projectID: z_.make(e.project_id),
    title: e.title,
    parentID: e.parent_id ? Jj.make(e.parent_id) : void 0,
    agent: e.agent ? US.make(e.agent) : void 0,
    model: e.model
      ? {
          id: WL.make(e.model.id),
          providerID: Kp.make(e.model.providerID),
          variant: H3e.make(e.model.variant ?? "default"),
        }
      : void 0,
    cost: e.cost,
    tokens: {
      input: e.tokens_input,
      output: e.tokens_output,
      reasoning: e.tokens_reasoning,
      cache: { read: e.tokens_cache_read, write: e.tokens_cache_write },
    },
    location: Rv.make({
      directory: bo.make(e.directory),
      workspaceID: e.workspace_id ? YS.make(e.workspace_id) : void 0,
    }),
    subpath: e.path ? du.make(e.path) : void 0,
    revert: e.revert ? { ...e.revert, messageID: wf.make(e.revert.messageID) } : void 0,
    time: {
      created: Fye(e.time_created),
      updated: Fye(e.time_updated),
      archived: e.time_archived ? Fye(e.time_archived) : void 0,
    },
  });
}