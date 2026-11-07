
var b_t = (e, t = {}) => ({ ...t, path: e }),
  nzs = (e, t) => ({
    ...e,
    ...t,
    baseURL: t.baseURL ?? e.baseURL,
    path: t.path ?? e.path,
    query: t.query === void 0 ? e.query : { ...e.query, ...t.query },
  }),
  izs = (e, t) => (typeof e === "function" ? e(t) : e),
  TIn = (e, t) => {
    let r = new URL(`${yIn(e.baseURL ?? "")}${izs(e.path, t)}`);
    for (let [s, a] of Object.entries(e.query ?? {})) r.searchParams.set(s, a);
    return r;
  };