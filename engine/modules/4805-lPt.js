
var lPt,
  eTr = (e, t, r) => {
    if (!e) return;
    if (oVi(lPt, e)) return e;
    Wy(r).warn(`${t} was set to ${JSON.stringify(e)}, expected one of ${JSON.stringify(Object.keys(lPt))}`);
    return;
  },
  KRa,
  jVi,
  kee = (e) => {
    if (e.options) ((e.options = { ...e.options }), delete e.options.headers);
    if (e.headers)
      e.headers = Object.fromEntries(
        (e.headers instanceof Headers ? [...e.headers] : Object.entries(e.headers)).map(([t, r]) => [
          t,
          t.toLowerCase() === "authorization" ||
          t.toLowerCase() === "api-key" ||
          t.toLowerCase() === "x-api-key" ||
          t.toLowerCase() === "cookie" ||
          t.toLowerCase() === "set-cookie"
            ? "***"
            : r,
        ]),
      );
    if ("retryOfRequestLogID" in e) {
      if (e.retryOfRequestLogID) e.retryOf = e.retryOfRequestLogID;
      delete e.retryOfRequestLogID;
    }
    return e;
  };