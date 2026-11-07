
var VFe,
  otn,
  wAt = (e) => '"' + e.replaceAll('"', '""') + '"',
  NM = (e) => !!e && typeof e === "object" && !Array.isArray(e),
  UM = (e) =>
    C8s(e).then(
      () => !0,
      (t) => {
        if (t.code === "ENOENT") return !1;
        throw t;
      },
    ),
  Ap = () =>
    Error("The local backup could not be restored safely. Recoverable originals have been retained."),
  ZDe;