
var G5e = ne(() => {
  GTt();
  ((kDr = a8i("instance")),
    (ree = {
      async provide(e) {
        return kDr.provide({ workspaceID: e.workspaceID }, () => e.fn());
      },
      restore(e, t) {
        return kDr.provide({ workspaceID: e }, t);
      },
      get workspaceID() {
        try {
          return kDr.use().workspaceID;
        } catch {
          return;
        }
      },
    }));
});