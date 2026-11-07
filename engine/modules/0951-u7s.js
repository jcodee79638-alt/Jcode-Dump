
var u7s,
  sMe,
  Zdn = async (e, t, r, s) => {
    if (!r) return { type: "skip" };
    let { type: a, tables: H } = r;
    if ((a === "insert" || a === "update" || a === "delete") && H.length > 0)
      return { type: "invalidate", tables: H };
    if (!s) return { type: "skip" };
    if (!s.enabled) return { type: "skip" };
    if (a === "select")
      return {
        type: "try",
        key: s.tag ?? (await Idt(e, t)),
        isTag: typeof s.tag < "u",
        autoInvalidate: s.autoInvalidate,
        tables: r.tables,
        config: s.config,
      };
    return { type: "skip" };
  };