
var zjt = (e) => {
    let { data: t, path: r, errorMaps: s, issueData: a } = e,
      H = [...r, ...(a.path || [])],
      u = { ...a, path: H };
    if (a.message !== void 0) return { ...a, path: H, message: a.message };
    let f = "",
      d = s
        .filter((_) => !!_)
        .slice()
        .reverse();
    for (let _ of d) f = _(u, { data: t, defaultError: f }).message;
    return { ...a, path: H, message: f };
  },
  wl,
  UPe = (e) => ({ status: "dirty", value: e }),
  Qw = (e) => ({ status: "valid", value: e }),
  SSr = (e) => e.status === "aborted",
  TSr = (e) => e.status === "dirty",
  LLe = (e) => e.status === "valid",
  XJe = (e) => typeof Promise < "u" && e instanceof Promise;