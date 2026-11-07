
var Ch,
  uQ = (e) => /^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/.test(e),
  YDe = (e) =>
    e === ".references-v6.json" ||
    /^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}(?:\.json|\.prepared\.json)?$/.test(
      e,
    ),
  CC = (e) => y8s("sha256").update(e).digest("hex"),
  xj = () => Error("This backup could not be verified. Your current data has not been restored."),
  wJt = (e) => !!e && typeof e === "object" && !Array.isArray(e),
  ttn = (e) =>
    e === "database.sqlite"
      ? Ch.database
      : e === "settings.json"
        ? Ch.settings
        : e === "attachments/.references-v6.json"
          ? 524288
          : e.endsWith(".json")
            ? 1048576
            : Ch.attachment,
  j8s = (e) =>
    e === "database.sqlite" ||
    e === "settings.json" ||
    e === "projects.json" ||
    (e.startsWith("attachments/") && YDe(e.slice(12)));