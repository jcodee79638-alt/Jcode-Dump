
var sns = ne(async () => {
  Gt();
  $H();
  Sx();
  await Jn([xP(), Jy(), ZCr()]);
  ins = Kd(eh, "mcp", (e) =>
    ft(function* () {
      let t = yield* MP,
        r = Ge("McpHttpApi.status")(function* () {
          return yield* t.status();
        }),
        s = Ge("McpHttpApi.add")(function* (L) {
          let I = (yield* t.add(L.payload.name, L.payload.config)).status;
          return yield* G_(YCr)("status" in I ? { [L.payload.name]: I } : I).pipe(Zo(() => new PA({})));
        }),
        a = Ge("McpHttpApi.authStart")(function* (L) {
          return yield* ft(function* () {
            if (!(yield* t.supportsOAuth(L.params.name)))
              return yield* new qwe({ error: `MCP server ${L.params.name} does not support OAuth` });
            return yield* t.startAuth(L.params.name);
          }).pipe(
            EA("MCP.NotFoundError", (I) =>
              bn(new ok({ name: I.name, message: `MCP server not found: ${I.name}` })),
            ),
          );
        }),
        H = Ge("McpHttpApi.authCallback")(function* (L) {
          return yield* t
            .finishAuth(L.params.name, L.payload.code)
            .pipe(
              EA("MCP.NotFoundError", (I) =>
                bn(new ok({ name: I.name, message: `MCP server not found: ${I.name}` })),
              ),
            );
        }),
        u = Ge("McpHttpApi.authAuthenticate")(function* (L) {
          return yield* ft(function* () {
            if (!(yield* t.supportsOAuth(L.params.name)))
              return yield* new qwe({ error: `MCP server ${L.params.name} does not support OAuth` });
            return yield* t.authenticate(L.params.name);
          }).pipe(
            EA("MCP.NotFoundError", (I) =>
              bn(new ok({ name: I.name, message: `MCP server not found: ${I.name}` })),
            ),
          );
        }),
        f = Ge("McpHttpApi.authRemove")(function* (L) {
          let I = yield* t.status();
          if (!(L.params.name in I))
            return yield* new ok({ name: L.params.name, message: `MCP server not found: ${L.params.name}` });
          return (yield* t.removeAuth(L.params.name), { success: !0 });
        }),
        d = Ge("McpHttpApi.connect")(function* (L) {
          return (
            yield* t
              .connect(L.params.name)
              .pipe(
                EA("MCP.NotFoundError", (I) =>
                  bn(new ok({ name: I.name, message: `MCP server not found: ${I.name}` })),
                ),
              ),
            !0
          );
        }),
        _ = Ge("McpHttpApi.disconnect")(function* (L) {
          return (
            yield* t
              .disconnect(L.params.name)
              .pipe(
                EA("MCP.NotFoundError", (I) =>
                  bn(new ok({ name: I.name, message: `MCP server not found: ${I.name}` })),
                ),
              ),
            !0
          );
        });
      return e
        .handle("status", r)
        .handle("add", s)
        .handle("authStart", a)
        .handle("authCallback", H)
        .handle("authAuthenticate", u)
        .handle("authRemove", f)
        .handle("connect", d)
        .handle("disconnect", _);
    }),
  );
});