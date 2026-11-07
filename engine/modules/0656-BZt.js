
var BZt = "~effect/http/HttpBody",
  lun = "~effect/http/HttpBody/HttpBodyError",
  RZt,
  IRe,
  fun,
  Qpe,
  pun,
  WZt = (e, t) => new pun(e, t?.contentType, t?.contentLength),
  dun,
  v1e = (e, t) => new dun(e, t ?? "application/octet-stream", e.length),
  qBs,
  Ype = (e, t) => v1e(qBs.encode(e), t ?? "text/plain"),
  QW = (e, t) => Ype(JSON.stringify(e), t ?? "application/json"),
  VZt = (e, t) =>
    ZA({
      try: () => Ype(JSON.stringify(e), t ?? "application/json"),
      catch: (r) => new RZt({ reason: { _tag: "JsonError" }, cause: r }),
    }),
  qZt = (e, t) => {
    let r = bft(wj(e));
    return (s, a) =>
      r(s, t).pipe(
        Zo((H) => new RZt({ reason: { _tag: "SchemaError", issue: H }, cause: H })),
        Hi((H) => VZt(H, a)),
      );
  },
  mun,
  Zpe = (e, t, r) => new mun(e, t ?? "application/octet-stream", r);