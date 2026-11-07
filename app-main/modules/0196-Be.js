
var Be = {
    total: 134217728,
    snapshot: 62914560,
    database: 33554432,
    settings: 4194304,
    attachments: 25165824,
    attachment: 10485760,
    files: 1024,
    manifest: 262144,
    rows: 200000,
  },
  er = (e) => /^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/.test(e),
  Ca = (e) =>
    e === ".references-v6.json" ||
    /^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}(?:\.json|\.prepared\.json)?$/.test(
      e,
    ),
  Aa = (e) => Fe.createHash("sha256").update(e).digest("hex"),
  ae = () => Error("This backup could not be verified. Your current data has not been restored."),
  tr = (e) => !!e && typeof e === "object" && !Array.isArray(e),
  io = (e) =>
    e === "database.sqlite"
      ? Be.database
      : e === "settings.json"
        ? Be.settings
        : e === "attachments/.references-v6.json"
          ? 524288
          : e.endsWith(".json")
            ? 1048576
            : Be.attachment,
  Pa = (e) =>
    e === "database.sqlite" ||
    e === "settings.json" ||
    e === "projects.json" ||
    (e.startsWith("attachments/") && Ca(e.slice(12)));