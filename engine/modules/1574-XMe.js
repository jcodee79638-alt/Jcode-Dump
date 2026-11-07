
var XMe,
  x2,
  pWe = (e) => {
    if (e._tag === "StandardCommand") return e.args.length ? `${e.command} ${e.args.join(" ")}` : e.command;
    return `${pWe(e.left)} | ${pWe(e.right)}`;
  },
  q_t = (e, t) => (t instanceof XMe ? t : new XMe({ command: e, cause: t })),
  RDn = (e) => {
    let t = e.reason;
    if (t instanceof Error) return t;
    let r = Error("Aborted");
    return ((r.name = "AbortError"), r);
  },
  G_t = (e) =>
    Fd((t) => {
      if (e.aborted) {
        t(bn(RDn(e)));
        return;
      }
      let r = () => t(bn(RDn(e)));
      return (e.addEventListener("abort", r, { once: !0 }), jn(() => e.removeEventListener("abort", r)));
    }),
  CQs = (e) =>
    typeof e === "string" ? c2(new TextEncoder().encode(e)) : e instanceof Uint8Array ? c2(e) : e,
  GMe = (e, t) =>
    $cn(
      e,
      () => ({ chunks: [], bytes: 0, truncated: !1 }),
      (r, s) => {
        if (t === void 0) return (r.chunks.push(s), (r.bytes += s.length), r);
        let a = t - r.bytes;
        if (a > 0) r.chunks.push(a >= s.length ? s : s.slice(0, a));
        return ((r.bytes += s.length), (r.truncated = r.truncated || r.bytes > t), r);
      },
    ).pipe(Vn((r) => ({ buffer: Buffer.concat(r.chunks), truncated: r.truncated }))),
  wQs,
  IY;