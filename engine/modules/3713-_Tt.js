
var _Tt = (e) => {
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
  Pl,
  Kbe = (e) => ({ status: "dirty", value: e }),
  Fw = (e) => ({ status: "valid", value: e }),
  CIr = (e) => e.status === "aborted",
  wIr = (e) => e.status === "dirty",
  xhe = (e) => e.status === "valid",
  $5e = (e) => typeof Promise < "u" && e instanceof Promise;