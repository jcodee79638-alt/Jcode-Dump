
function zt(e) {
  let t = j(e),
    n = Q(t.time),
    i = Q(Q(t.metadata).jac_branch_source);
  return {
    id: M(t.id),
    title: M(t.title),
    directory: M(t.directory),
    projectId: M(t.projectID) || void 0,
    parentId: M(t.parentID) || void 0,
    ...(M(i.id) && M(i.directory) ? { branchOf: { id: M(i.id), directory: M(i.directory) } } : {}),
    createdAt: Mt(n.created),
    updatedAt: Mt(n.updated),
    archivedAt: Mt(n.archived) || void 0,
    accessMode: wi(Q(t.metadata).jac_access_mode),
  };
}