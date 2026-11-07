
var Dns = ne(async () => {
  Ql();
  qTt();
  Gw();
  lb();
  Ekt();
  Cwe();
  BA();
  Rwt();
  zwt();
  Gt();
  Cf();
  $H();
  ise();
  Sx();
  iYe();
  await Jn([ebe(), jZ(), qd(), Zve(), Jy(), akt()]);
  ((gns = ft(function* () {
    let e = yield* Fh,
      t = yield* bI;
    return { directory: e?.directory, workspaceID: t };
  })),
    (Ens = Kd(eh, "pty", (e) =>
      ft(function* () {
        let t = yield* h$e,
          r = yield* L$e,
          s = yield* IT,
          a = yield* Xj,
          H = q5e((T) => oL(a.invalidate(Rv.make({ directory: bo.make(T) }))));
        yield* sL(() => jn(H));
        let u = ni(function* (T) {
            return yield* T.pipe(vj(a.get(Rv.make({ directory: bo.make((yield* Jc).directory) }))));
          }),
          f = Ge("PtyHttpApi.shells")(function* () {
            return yield* nA(() => _ua());
          }),
          d = Ge("PtyHttpApi.list")(function* () {
            return (yield* u(uT.use((C) => C.list()))).filter((C) => C.status === "running");
          }),
          _ = Ge("PtyHttpApi.create")(function* (T) {
            let C = T.payload.cwd || (yield* Jc).directory,
              O = yield* s.trigger("shell.env", { cwd: C }, { env: {} });
            return yield* u(
              uT.use((B) =>
                B.create({
                  ...T.payload,
                  args: T.payload.args ? [...T.payload.args] : void 0,
                  cwd: C,
                  env: { ...T.payload.env, ...O.env },
                }),
              ),
            );
          }),
          L = Ge("PtyHttpApi.get")(function* (T) {
            return yield* u(uT.use((C) => C.get(T.params.ptyID))).pipe(
              EA(
                "Pty.NotFoundError",
                (C) => new F7({ ptyID: C.ptyID, message: `PTY session not found: ${C.ptyID}` }),
              ),
              Hi((C) =>
                C.status === "running"
                  ? Jt(C)
                  : new F7({ ptyID: T.params.ptyID, message: `PTY session not found: ${T.params.ptyID}` }),
              ),
            );
          }),
          I = Ge("PtyHttpApi.update")(function* (T) {
            return (
              yield* L(T),
              yield* u(
                uT.use((C) =>
                  C.update(T.params.ptyID, {
                    ...T.payload,
                    size: T.payload.size ? { ...T.payload.size } : void 0,
                  }),
                ),
              ).pipe(
                EA(
                  "Pty.NotFoundError",
                  (C) => new F7({ ptyID: C.ptyID, message: `PTY session not found: ${C.ptyID}` }),
                ),
              )
            );
          }),
          D = Ge("PtyHttpApi.remove")(function* (T) {
            return (
              yield* L(T),
              yield* u(uT.use((C) => C.remove(T.params.ptyID))).pipe(
                EA(
                  "Pty.NotFoundError",
                  (C) => new F7({ ptyID: C.ptyID, message: `PTY session not found: ${C.ptyID}` }),
                ),
              ),
              !0
            );
          }),
          S = Ge("PtyHttpApi.connectToken")(function* (T) {
            let C = yield* Md;
            if (C.headers[ces] !== Aes || !$ns(C, r))
              return yield* new sYe({ message: "Invalid PTY connect token request" });
            return (yield* L(T), yield* t.issue({ ptyID: T.params.ptyID, ...(yield* gns) }));
          });
        return e
          .handle("shells", f)
          .handle("list", d)
          .handle("create", _)
          .handle("get", L)
          .handle("update", I)
          .handle("remove", D)
          .handle("connectToken", S);
      }),
    ).pipe(ou(bZ))),
    (Ins = Kd(Gwe, "pty-connect", (e) =>
      ft(function* () {
        let t = yield* h$e,
          r = yield* L$e,
          s = yield* Xj,
          a = q5e((u) => oL(s.invalidate(Rv.make({ directory: bo.make(u) }))));
        yield* sL(() => jn(a));
        let H = ni(function* (u) {
          return yield* u.pipe(vj(s.get(Rv.make({ directory: bo.make((yield* Jc).directory) }))));
        });
        return e.handleRaw(
          "connect",
          Ge("PtyHttpApi.connect")(function* (u) {
            if (!$ns(u.request, r)) return Rd({ status: 403 });
            let f = new URL(u.request.url, "http://localhost").searchParams.get(Kwt);
            if (f && !(yield* t.consume({ ticket: f, ptyID: u.params.ptyID, ...(yield* gns) })))
              return Rd({ status: 403 });
            if (
              !(yield* H(uT.use((q) => q.get(u.params.ptyID))).pipe(
                Vn((q) => q.status === "running"),
                EA("Pty.NotFoundError", () => Jt(!1)),
              ))
            )
              return Rd({ status: 404 });
            let _ = kv(cts)(yield* ose);
            if (vl(_)) return Rd({ status: 400 });
            let L = _.value.cursor === void 0 ? void 0 : Number(_.value.cursor),
              I = L !== void 0 && Number.isSafeInteger(L) && L >= -1 ? L : void 0,
              D = yield* on(u.request.upgrade),
              S = yield* D.writer,
              T = (q) =>
                D.runRaw(() => ti, { onOpen: S(q).pipe($s(() => ti)) }).pipe(
                  vW("1 second"),
                  GC("SocketError", "SocketCloseError", () => ti),
                  $s(() => ti),
                );
            if (!(yield* Ses(S(nYe())))) return (yield* T(nYe()), Rd());
            let O = yield* dYt(),
              B = yield* H(
                uT.use((q) =>
                  q.attach(u.params.ptyID, {
                    cursor: I,
                    onData: (Z) => JM(O, Z),
                    onEnd: () => JM(O, new Fv(1000)),
                  }),
                ),
              ).pipe(
                LQt({
                  "Pty.NotFoundError": () => T(new Fv(4404, "session not found")).pipe(eu(void 0)),
                  "Pty.ExitedError": () => T(new Fv(4404, "session not found")).pipe(eu(void 0)),
                }),
              );
            if (!B) return Rd();
            for (let q of hns(B.replay)) JM(O, q);
            (JM(O, _ns(B.cursor)), B.activate());
            let V = ft(function* () {
              while (!0) {
                let q = yield* Fie(O);
                if ((yield* S(q), q instanceof Fv)) return;
              }
            });
            return (
              yield* Wsn(
                V,
                D.runRaw((q) => {
                  let Z = Lns(q);
                  if (Z !== void 0) B.write(Z);
                }),
              ).pipe(
                GC("SocketError", "SocketCloseError", () => ti),
                up(jn(() => B.detach())),
                on,
              ),
              Rd()
            );
          }),
        );
      }),
    ).pipe(ou(bZ))));
});