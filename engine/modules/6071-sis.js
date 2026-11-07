
var sis = ne(async () => {
  Ekt();
  Cwe();
  Gt();
  Cf();
  $H();
  ise();
  Rwt();
  Xy();
  Zwt();
  GQe();
  await Jn([ebe(), qd(), tM(), ak()]);
  ((nis = ft(function* () {
    let e = yield* bm;
    return { directory: e.directory, workspaceID: e.workspaceID };
  })),
    (iis = Kd(rm, "server.pty", (e) =>
      ft(function* () {
        let t = yield* h$e,
          r = yield* L$e,
          s = yield* _$e;
        return e
          .handle(
            "pty.list",
            Ge(function* () {
              return yield* Rh((yield* uT).list());
            }),
          )
          .handle(
            "pty.create",
            Ge(function* (a) {
              let H = yield* uT,
                u = yield* bm,
                f = a.payload.cwd || u.directory;
              return yield* Rh(
                H.create({
                  ...a.payload,
                  args: a.payload.args ? [...a.payload.args] : void 0,
                  cwd: f,
                  env: { ...a.payload.env, ...(yield* s.get({ directory: u.directory, cwd: f })) },
                }),
              );
            }),
          )
          .handle(
            "pty.get",
            Ge(function* (a) {
              let H = yield* uT;
              return yield* Rh(
                H.get(a.params.ptyID).pipe(
                  EA(
                    "Pty.NotFoundError",
                    () =>
                      new MR({ ptyID: a.params.ptyID, message: `PTY session not found: ${a.params.ptyID}` }),
                  ),
                ),
              );
            }),
          )
          .handle(
            "pty.update",
            Ge(function* (a) {
              let H = yield* uT;
              return yield* Rh(
                H.update(a.params.ptyID, {
                  ...a.payload,
                  size: a.payload.size ? { ...a.payload.size } : void 0,
                }).pipe(
                  EA(
                    "Pty.NotFoundError",
                    () =>
                      new MR({ ptyID: a.params.ptyID, message: `PTY session not found: ${a.params.ptyID}` }),
                  ),
                ),
              );
            }),
          )
          .handle(
            "pty.remove",
            Ge(function* (a) {
              return (
                yield* (yield* uT)
                  .remove(a.params.ptyID)
                  .pipe(
                    EA(
                      "Pty.NotFoundError",
                      () =>
                        new MR({
                          ptyID: a.params.ptyID,
                          message: `PTY session not found: ${a.params.ptyID}`,
                        }),
                    ),
                  ),
                lf.make()
              );
            }),
          )
          .handle(
            "pty.connectToken",
            Ge(function* (a) {
              let H = yield* Md;
              if (H.headers[mes] !== _es || !zQe(H.headers.origin, H.headers.host, r))
                return yield* new Uwe({ message: "Invalid PTY connect token request" });
              return (
                yield* (yield* uT)
                  .get(a.params.ptyID)
                  .pipe(
                    EA(
                      "Pty.NotFoundError",
                      () =>
                        new MR({
                          ptyID: a.params.ptyID,
                          message: `PTY session not found: ${a.params.ptyID}`,
                        }),
                    ),
                  ),
                yield* Rh(t.issue({ ptyID: a.params.ptyID, ...(yield* nis) }))
              );
            }),
          )
          .handleRaw(
            "pty.connect",
            Ge("PtyHandler.connect")(function* (a) {
              if (!zQe(a.request.headers.origin, a.request.headers.host, r)) return Rd({ status: 403 });
              let H = new URL(a.request.url, "http://localhost"),
                u = H.searchParams.get(Ywt);
              if (u && !(yield* t.consume({ ticket: u, ptyID: a.params.ptyID, ...(yield* nis) })))
                return Rd({ status: 403 });
              let f = yield* uT;
              if (
                !(yield* f.get(a.params.ptyID).pipe(
                  eu(!0),
                  EA("Pty.NotFoundError", () => Jt(!1)),
                ))
              )
                return Rd({ status: 404 });
              let _ = H.searchParams.get("cursor"),
                L = _ === null ? void 0 : Number(_),
                I = L !== void 0 && Number.isSafeInteger(L) && L >= -1 ? L : void 0,
                D = yield* on(a.request.upgrade),
                S = yield* D.writer,
                T = (V) =>
                  D.runRaw(() => ti, { onOpen: S(V).pipe($s(() => ti)) }).pipe(
                    vW("1 second"),
                    GC("SocketError", "SocketCloseError", () => ti),
                    $s(() => ti),
                  ),
                C = yield* dYt(),
                O = yield* f
                  .attach(a.params.ptyID, {
                    cursor: I,
                    onData: (V) => JM(C, V),
                    onEnd: () => JM(C, new Fv(1000)),
                  })
                  .pipe(
                    LQt({
                      "Pty.NotFoundError": () => T(new Fv(4404, "session not found")).pipe(eu(void 0)),
                      "Pty.ExitedError": () => T(new Fv(4404, "session exited")).pipe(eu(void 0)),
                    }),
                  );
              if (!O) return Rd();
              for (let V of hns(O.replay)) JM(C, V);
              (JM(C, _ns(O.cursor)), O.activate());
              let B = ft(function* () {
                while (!0) {
                  let V = yield* Fie(C);
                  if ((yield* S(V), V instanceof Fv)) return;
                }
              });
              return (
                yield* Wsn(
                  B,
                  D.runRaw((V) => {
                    let q = Lns(V);
                    if (q !== void 0) O.write(q);
                  }),
                ).pipe(
                  GC("SocketError", "SocketCloseError", () => ti),
                  up(jn(() => O.detach())),
                  on,
                ),
                Rd()
              );
            }),
          );
      }),
    )));
});