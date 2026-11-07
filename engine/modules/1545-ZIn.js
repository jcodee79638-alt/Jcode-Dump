
function ZIn(e) {
  let t = e.protocol,
    r = Kie(Cj(t.body.schema)),
    s = G_(t.stream.event),
    a = (u) => (f) =>
      s(f).pipe(Zo(() => NG(e.id, `Invalid ${u} stream event`, typeof f === "string" ? f : Cse(f)))),
    H = (u) => {
      let f = {
        id: u.id,
        provider: u.provider === void 0 ? void 0 : IMe.make(u.provider),
        protocol: t.id,
        endpoint: u.endpoint,
        auth: u.auth ?? Pse,
        transport: u.transport,
        defaults: u.defaults ?? {},
        body: t.body,
        with: (d) => {
          let { id: _, provider: L, auth: I, transport: D, endpoint: S, ...T } = d;
          return H({
            ...u,
            id: _ ?? u.id,
            provider: L ?? u.provider,
            auth: I ?? u.auth,
            endpoint: S ? nzs(u.endpoint, S) : u.endpoint,
            transport: D ?? u.transport,
            defaults: QIn(f.defaults, T),
          });
        },
        model: (d) => Vzs(f, d),
        prepareTransport: (d, _) =>
          u.transport.prepare({
            body: d,
            request: _,
            endpoint: u.endpoint,
            auth: u.auth ?? Pse,
            encodeBody: r,
            headers: u.headers,
          }),
        streamPrepared: (d, _, L) => {
          let I = `${_.model.provider}/${_.model.route.id}`;
          return u.transport
            .frames(d, _, L)
            .pipe(f1e(a(I)), t.stream.terminal ? p1e(t.stream.terminal) : (S) => S)
            .pipe(
              gFs(
                () => t.stream.initial(_),
                t.stream.step,
                t.stream.onHalt ? { onHalt: t.stream.onHalt } : void 0,
              ),
              zBe((S) => NW(Kzs(I, `Failed to read ${I} stream`, S))),
            );
        },
      };
      return f;
    };
  return H({ ...e, defaults: QIn(void 0, e.defaults ?? {}) });
}