
var C_t,
  BG = (e, t, r = {}) =>
    new MD({
      module: "WebSocketExecutor",
      method: e,
      reason: new TMe({ message: t, url: r.url, kind: r.kind }),
    }),
  WIn = (e) => {
    if ("message" in e && typeof e.message === "string") return e.message;
    return e.type;
  },
  vzs = (e) => {
    if (e instanceof Uint8Array) return e;
    if (e instanceof ArrayBuffer) return new Uint8Array(e);
    if (ArrayBuffer.isView(e)) return new Uint8Array(e.buffer, e.byteOffset, e.byteLength);
    return;
  },
  bzs = (e, t) => {
    if (e.readyState === globalThis.WebSocket.OPEN) return ti;
    if (e.readyState === globalThis.WebSocket.CLOSING || e.readyState === globalThis.WebSocket.CLOSED)
      return bn(
        BG("open", `WebSocket closed before opening (state ${e.readyState})`, { url: t.url, kind: "open" }),
      );
    return Fd((r, s) => {
      let a = () => {
          (e.removeEventListener("open", u),
            e.removeEventListener("error", f),
            e.removeEventListener("close", d),
            s.removeEventListener("abort", H));
        },
        H = () => {
          if (
            (a(),
            e.readyState !== globalThis.WebSocket.CLOSED && e.readyState !== globalThis.WebSocket.CLOSING)
          )
            e.close(1000);
        },
        u = () => {
          (a(), r(ti));
        },
        f = (_) => {
          (a(), r(bn(BG("open", `Failed to open WebSocket: ${WIn(_)}`, { url: t.url, kind: "open" }))));
        },
        d = (_) => {
          (a(),
            r(
              bn(
                BG("open", `WebSocket closed before opening with code ${_.code}`, {
                  url: t.url,
                  kind: "open",
                }),
              ),
            ));
        };
      (e.addEventListener("open", u, { once: !0 }),
        e.addEventListener("error", f, { once: !0 }),
        e.addEventListener("close", d, { once: !0 }),
        s.addEventListener("abort", H, { once: !0 }));
    });
  },
  jzs = (e) =>
    ZA({
      try: () => {
        let t = new URL(e);
        if (t.protocol === "https:") return ((t.protocol = "wss:"), t.toString());
        if (t.protocol === "http:") return ((t.protocol = "ws:"), t.toString());
        throw Error(`Unsupported WebSocket URL protocol ${t.protocol}`);
      },
      catch: (t) =>
        BG("prepare", t instanceof Error ? t.message : "Invalid WebSocket URL", {
          url: e,
          kind: "websocket",
        }),
    }),
  VIn = (e) =>
    ZA({
      try: () => new globalThis.WebSocket(e.url, { headers: e.headers }),
      catch: (t) =>
        BG("open", t instanceof Error ? t.message : "Failed to construct WebSocket", {
          url: e.url,
          kind: "open",
        }),
    }).pipe(Hi((t) => qIn(t, e))),
  Pzs,
  qIn = (e, t) =>
    ft(function* () {
      yield* bzs(e, t);
      let r = yield* n1e(128),
        s = (f) => {
          if (typeof f.data === "string") return JM(r, f.data);
          let d = vzs(f.data);
          if (d) return JM(r, d);
          OW(r, fie(BG("message", "Unsupported WebSocket message payload", { url: t.url, kind: "message" })));
        },
        a = (f) => {
          OW(r, fie(BG("message", `WebSocket error: ${WIn(f)}`, { url: t.url, kind: "message" })));
        },
        H = (f) => {
          if (f.code === 1000 || f.code === 1005) return i1e(r);
          OW(r, fie(BG("message", `WebSocket closed with code ${f.code}`, { url: t.url, kind: "close" })));
        },
        u = jn(() => {
          (e.removeEventListener("message", s),
            e.removeEventListener("error", a),
            e.removeEventListener("close", H));
        }).pipe(Zu(Nie(r)));
      return (
        e.addEventListener("message", s),
        e.addEventListener("error", a),
        e.addEventListener("close", H),
        {
          sendText: (f) =>
            ZA({
              try: () => e.send(f),
              catch: (d) =>
                BG("sendText", d instanceof Error ? d.message : "Failed to send WebSocket message", {
                  url: t.url,
                  kind: "write",
                }),
            }),
          messages: Bie(r),
          close: u.pipe(
            Zu(
              jn(() => {
                if (
                  e.readyState === globalThis.WebSocket.CLOSED ||
                  e.readyState === globalThis.WebSocket.CLOSING
                )
                  return;
                e.close(1000);
              }),
            ),
          ),
        }
      );
    }),
  GIn = (e, t) => (typeof e === "string" ? e : t.decode(e)),
  eir = (e) => ({
    id: "websocket-json",
    with: (t) => eir({ ...e, ...t }),
    prepare: (t) =>
      ft(function* () {
        let r = yield* Qnr({ ...t });
        return {
          url: yield* jzs(r.url),
          headers: r.headers,
          message: e.encodeMessage(yield* e.toMessage(r.jsonBody)),
        };
      }),
    frames: (t, r, s) => {
      let a = s.webSocket;
      if (!a)
        return NW(
          BG("json", "WebSocket JSON transport requires WebSocketExecutor.Service", {
            url: t.url,
            kind: "websocket",
          }),
        );
      let H = new TextDecoder();
      return hh(
        ft(function* () {
          let u = yield* Bd(a.open({ url: t.url, headers: t.headers }), (f) => f.close);
          return (yield* u.sendText(t.message), u.messages.pipe(xE((f) => GIn(f, H))));
        }),
      );
    },
  }),
  Czs,
  w_t,
  k_t;