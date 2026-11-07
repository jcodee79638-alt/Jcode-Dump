
var C0a,
  i0r = "~effect/httpapi/HttpApiSchema/Stream",
  k0a = (e) => LZt.pipe(w0a(e)),
  lf,
  O0a,
  ISi = (e) => {
    let t = e.events ?? (e.data === void 0 ? void 0 : nt({ id: XW(re), event: re, data: U0a(e.data) }));
    if (t === void 0) throw Error("StreamSse requires either an events schema or a data schema");
    return cd(O0a.ast, {
      [i0r]: i0r,
      _tag: "StreamSse",
      mode: "sse",
      sseMode: e.events === void 0 ? "data" : "events",
      contentType: e.contentType ?? N0a("sse"),
      events: t,
      error: e.error ?? Wft,
    });
  },
  U0a = (e) => {
    let t = CBe(e.ast);
    return t === void 0 ? Cj(e) : Cj(e).annotate({ identifier: `${t}Stream` });
  },
  vN = (e) => GW(e) && Ma(e, i0r),
  zxt = (e) => vN(e) && e._tag === "StreamSse",
  DSi = (e) => vN(e) && e._tag === "StreamUint8Array",
  lhe = (e) => {
    if (jlt(e)) return !0;
    let t = ME(e);
    if (jlt(t)) return !0;
    let r = e.encoding?.[0].to;
    if (r === void 0) return !1;
    return jlt(r);
  },
  xSi,
  SSi,
  TSi,
  R0a;