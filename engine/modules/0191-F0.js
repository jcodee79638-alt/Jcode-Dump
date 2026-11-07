
var F0,
  BM = (e) => {
    try {
      if (Ma(e, "toJSON") && Fq(e.toJSON) && e.toJSON.length === 0) return e.toJSON();
      else if (Array.isArray(e)) return e.map(BM);
    } catch {
      return "[toJSON threw]";
    }
    return DU(e);
  },
  XAt = (e, t = 2) => {
    if (typeof e === "string") return e;
    try {
      return typeof e === "object" ? Qfe(e, { space: t }) : String(e);
    } catch {
      return String(e);
    }
  },
  KF,
  _W;