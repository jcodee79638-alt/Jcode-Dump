var s = require("electron");
function l(e) {
  let o = e instanceof Error ? e.message : "Jac Code could not complete this request. Try again.";
  return Error(o.replace(/^Error invoking remote method 'jac:invoke': (?:Error: )?/, ""));
}
var c = new Set(),
  i = new Map(),
  p = new Map(),
  d = 0,
  t = (e, o) => {
    let r = s.ipcRenderer.invoke("jac:invoke", e, o).catch((n) => {
      throw l(n);
    });
    if (e === "saveSettings" || e === "setAccessMode") {
      let n = ++d,
        u =
          e === "setAccessMode" ? ["accessMode"] : o && typeof o === "object" ? Object.keys(o) : ["settings"];
      (c.add(r),
        r.then(
          () => {
            (u.forEach((a) => {
              if ((p.set(a, Math.max(p.get(a) ?? 0, n)), (i.get(a) ?? 0) <= n)) i.delete(a);
            }),
              c.delete(r));
          },
          () => {
            (u.forEach((a) => {
              if ((p.get(a) ?? 0) < n) i.set(a, Math.max(i.get(a) ?? 0, n));
            }),
              c.delete(r));
          },
        ));
    }
    if (
      [
        "queuePrompt",
        "updateQueuedPrompt",
        "queueAction",
        "pauseQueue",
        "saveRunProfile",
        "removeRunProfile",
        "configureBackups",
        "saveContext",
      ].includes(e)
    )
      (c.add(r), r.finally(() => c.delete(r)).catch(() => {}));
    return r;
  };
s.ipcRenderer.on("jac:flush", () => {
  (async () => {
    await new Promise((e) => setTimeout(e, 500));
    while (c.size) await Promise.allSettled([...c]);
    if (i.size) throw Error("Your latest draft or settings could not be saved. Retry saving before closing.");
    await s.ipcRenderer.invoke("jac:flushed");
  })().catch(() => {});
});
var m = {
    connection: () => t("connection"),
    reconnect: (e) => t("reconnect", e),
    recoverTask: (e) => t("recoverTask", e),
    queueState: () => t("queueState"),
    queuePrompt: (e) => t("queuePrompt", e),
    updateQueuedPrompt: (e) => t("updateQueuedPrompt", e),
    queueAction: (e) => t("queueAction", e),
    pauseQueue: (e) => t("pauseQueue", e),
    taskTimeline: (e) => t("taskTimeline", e),
    restoreTaskFile: (e) => t("restoreTaskFile", e),
    compareTasks: (e) => t("compareTasks", e),
    searchProject: (e) => t("searchProject", e),
    projectSetup: (e) => t("projectSetup", e),
    runProfiles: (e) => t("runProfiles", e),
    saveRunProfile: (e) => t("saveRunProfile", e),
    removeRunProfile: (e) => t("removeRunProfile", e),
    runProfile: (e) => t("runProfile", e),
    profileRuns: (e) => t("profileRuns", e),
    cancelProfile: (e) => t("cancelProfile", e),
    completionReview: (e) => t("completionReview", e),
    attachmentReferences: (e) => t("attachmentReferences", e),
    attachmentContent: (e) => t("attachmentContent", e),
    chatAttachmentReferences: (e) => t("chatAttachmentReferences", e),
    backupStatus: () => t("backupStatus"),
    configureBackups: (e) => t("configureBackups", e),
    createBackup: () => t("createBackup"),
    inspectBackup: (e) => t("inspectBackup", e),
    restoreBackup: (e) => t("restoreBackup", e),
    supportReport: (e) => t("supportReport", e),
    exportSupportReport: (e) => t("exportSupportReport", e),
  },
  f = {
    ...m,
    openPlans: () => t("openPlans"),
    planKey: (e) => t("planKey", e),
    taskDiff: (e) => t("taskDiff", e),
    mcpServers: (e) => t("mcpServers", e),
    saveMcp: (e) => t("saveMcp", e),
    mcpAction: (e) => t("mcpAction", e),
    mcpCatalog: (e) => t("mcpCatalog", e),
    mcpRead: (e) => t("mcpRead", e),
    mcpPrompt: (e) => t("mcpPrompt", e),
    tasks: (e) => t("tasks", e),
    restoreTask: (e) => t("restoreTask", e),
    branchTask: (e) => t("branchTask", e),
    openArtifact: (e) => t("openArtifact", e),
    exportArtifacts: (e) => t("exportArtifacts", e),
    projectContext: (e) => t("projectContext", e),
    saveContext: (e) => t("saveContext", e),
    openChatFolder: (e) => t("openChatFolder", e),
    setAccessMode: (e) => t("setAccessMode", e),
    bootstrap: () => t("bootstrap"),
    openProject: () => t("openProject"),
    projects: () => t("projects"),
    chats: (e) => t("chats", e),
    createChat: (e) => t("createChat", e),
    loadChat: (e) => t("loadChat", e),
    send: (e) => t("send", e),
    cancel: (e) => t("cancel", e),
    renameChat: (e) => t("renameChat", e),
    archiveChat: (e) => t("archiveChat", e),
    pickAttachments: () => t("pickAttachments"),
    addAttachment: (e) => t("addAttachment", e),
    files: (e) => t("files", e),
    readFile: (e) => t("readFile", e),
    changes: (e) => t("changes", e),
    diff: (e) => t("diff", e),
    stage: (e) => t("stage", e),
    restore: (e) => t("restore", e),
    previewStatus: (e) => t("previewStatus", e),
    preview: (e) => t("preview", e),
    permission: (e) => t("permission", e),
    answer: (e) => t("answer", e),
    login: (e) => t("login", e),
    register: (e) => t("register", e),
    changePassword: (e) => t("changePassword", e),
    logout: () => t("logout"),
    account: () => t("account"),
    redeemReset: (e) => t("redeemReset", e),
    announcements: () => t("announcements"),
    acknowledge: (e) => t("acknowledge", e),
    announcementSeen: (e) => t("announcementSeen", e),
    settings: () => t("settings"),
    saveSettings: (e) => t("saveSettings", e),
    checkUpdate: () => t("checkUpdate"),
    installUpdate: () => t("installUpdate"),
    window: (e) => t("window", e),
    subscribe(e) {
      let o = (r, n) => e(n);
      return (s.ipcRenderer.on("jac:event", o), () => s.ipcRenderer.removeListener("jac:event", o));
    },
  };
s.contextBridge.exposeInMainWorld("jac", Object.freeze(f));
