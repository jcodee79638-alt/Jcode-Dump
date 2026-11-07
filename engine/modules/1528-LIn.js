
var LIn,
  JKs,
  Cse,
  KKs,
  CMe,
  hV = (e) => be(On(e)),
  AL = (e) => be(w6(e)),
  S_t = (e, t, r) => {
    if (r !== void 0) return r;
    if (e === void 0 && t === void 0) return;
    return (e ?? 0) + (t ?? 0);
  },
  $In = (e, t) => {
    if (e === void 0) return;
    if (t === void 0) return e;
    return Math.max(0, e - t);
  },
  gIn = (...e) => {
    if (e.every((t) => t === void 0)) return;
    return e.reduce((t, r) => t + (r ?? 0), 0);
  },
  NG = (e, t, r) =>
    new MD({ module: "ProviderShared", method: "stream", reason: new Nde({ route: e, message: t, raw: r }) }),
  zKs = (e, t, r) => ZA({ try: () => JKs(t), catch: () => NG(e, r, t) }),
  T_t = (e) =>
    e.map((t) => t.text).join(`
`),
  QKs = (e) => e.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;"),
  YKs = (e) => `<system-update>
${QKs(T_t(e))}
</system-update>`,
  EIn,
  Vnr,
  IIn = (e, t, r) => zKs(e, r || "{}", `Invalid JSON input for ${e} tool call ${t}`),
  wMe,
  ZKs,
  ezs,
  RRH,
  hIn = 29360128,
  x_t = 20971520,
  tzs,
  v_t,
  DIn = (e, t, r) => v_t(e, { type: "media", mediaType: t.mime, data: t.uri, filename: t.name }, r),
  yIn = (e) => e.replace(/\/+$/, ""),
  qnr = (e) => {
    if (e.result.type === "text") return String(e.result.value);
    if (e.result.type === "error") {
      let t = e.result.value,
        r = typeof t === "object" && t !== null && !Array.isArray(t) && Object.getPrototypeOf(t);
      return (Array.isArray(t) || r === Object.prototype || r === null) && KKs(t) ? Cse(t) : String(t);
    }
    return Cse(e.result.value);
  },
  MIn = (e) => {
    if (e instanceof Error) return e.message;
    if (typeof e === "string") return e;
    if (typeof e === "number" || typeof e === "boolean" || typeof e === "bigint") return String(e);
    if (e === null) return "null";
    if (e === void 0) return "undefined";
    return "Unknown stream error";
  },
  xIn = (e) =>
    e.pipe(
      C6(),
      Wie(mIn()),
      hFs("Retry", () => $1),
      aG((t) => t.data.length > 0 && t.data !== "[DONE]"),
      xE((t) => t.data),
    ),
  XS = (e) => new MD({ module: "ProviderShared", method: "request", reason: new bse({ message: e }) }),
  Gnr = (e, t, r) =>
    ft(function* () {
      if (t.type === "auto") return r.auto();
      if (t.type === "none") return r.none();
      if (t.type === "required") return r.required();
      if (!t.name) return yield* XS(`${e} tool choice requires a tool name`);
      return r.tool(t.name);
    }),
  rzs = (e) => {
    if (e.length <= 1) return e[0] ?? "";
    if (e.length === 2) return `${e[0]} and ${e[1]}`;
    return `${e.slice(0, -1).join(", ")}, and ${e.at(-1)}`;
  },
  aWe = (e, t) => t.includes(e.type),
  $Y = (e, t, r) => XS(`${e} ${t} messages only support ${rzs(r)} content for now`),
  Xnr = (e) => (t) => e(t).pipe(Zo((r) => XS(r.message))),
  SIn = (e) =>
    u2(e.url).pipe(
      YW(mG(SE(e.headers), "content-type", "application/json")),
      eRs(e.body, "application/json"),
    );