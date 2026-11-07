
function eo(e) {
  let { task: t, account: n } = e,
    i = t?.checks.map(va) ?? [];
  return {
    version: 1,
    createdAt: Date.now(),
    supportId: Xs.randomUUID(),
    appVersion: /^\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(e.appVersion) ? e.appVersion : "unknown",
    platform: e.platform === void 0 ? Zs(process.platform) : Zs(e.platform),
    architecture: ga(e.architecture ?? process.arch),
    connection:
      e.connection.state === "connected" || e.connection.state === "reconnecting"
        ? e.connection.state
        : "stopped",
    ...(t
      ? {
          task: {
            id: /^task_[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(t.id)
              ? t.id
              : "unavailable",
            supportId: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(t.supportId)
              ? t.supportId
              : "unavailable",
            state: ya(t.state),
            startedAt: Qs(t.startedAt),
            ...(t.endedAt === void 0 ? {} : { endedAt: Qs(t.endedAt) }),
            files: Jt(t.files.length),
            checks: {
              passed: Jt(i.filter((r) => r === "passed").length),
              failed: Jt(i.filter((r) => r === "failed").length),
              unknown: Jt(i.filter((r) => r === "unknown").length),
            },
          },
        }
      : {}),
    ...(n
      ? {
          account: {
            plan: ba(n.plan),
            weeklyPercent: Ks(n.weekly.remainingPercent),
            ...(n.fiveHour ? { fiveHourPercent: Ks(n.fiveHour.remainingPercent) } : {}),
            admission: ka(n.admission.code),
          },
        }
      : {}),
    counts: { queued: Jt(e.queued), running: Jt(e.running) },
    omissions: [
      "messages",
      "prompts",
      "command output",
      "filenames and paths",
      "emails",
      "credentials",
      "headers",
      "environment and configuration",
      "errors and stacks",
      "provider identity",
    ],
  };
}