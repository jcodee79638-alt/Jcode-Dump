
var ebe = ne(async () => {
  OH();
  Gt();
  Yve();
  iLr();
  await Jn([ebe(), Kv(), fL(), qd(), Zve()]);
  ((Mua = lLt(() => Promise.resolve().then(() => (bEi(), vEi)))),
    (mMt = X_e),
    (xua = pEi),
    (Sua = dEi),
    (dMt = fEi));
  PEi = class PEi extends ki()("Pty.NotFoundError", { ptyID: ox }) {};
  CEi = class CEi extends ki()("Pty.ExitedError", { ptyID: ox }) {};
  uT = class uT extends _i()("@opencode/v2/Pty") {};
  ((wEi = Es(
    uT,
    ft(function* () {
      let e = yield* lL,
        t = yield* bm,
        r = yield* ZM,
        s = yield* Qg(),
        a = G0(s),
        H = new Map(),
        u = [];
      function f(V, q) {
        for (let Z of V.subscribers.values()) {
          if (!Z.active) {
            Z.end = q;
            continue;
          }
          try {
            Z.onEnd(q);
          } catch {}
        }
        V.subscribers.clear();
      }
      function d(V) {
        for (let q of V.listeners) q.dispose();
        if (((V.listeners.length = 0), V.info.status === "running"))
          try {
            V.process.kill();
          } catch {}
        f(V, {});
      }
      yield* sL(() =>
        jn(() => {
          for (let V of H.values()) d(V);
          (H.clear(), (u.length = 0));
        }),
      );
      let _ = Ge("Pty.requireSession")(function* (V) {
          let q = H.get(V);
          if (!q) return yield* new PEi({ ptyID: V });
          return q;
        }),
        L = ni(function* (V) {
          let q = H.get(V);
          if (!q) return;
          H.delete(V);
          let Z = u.indexOf(V);
          if (Z !== -1) u.splice(Z, 1);
          (yield* fH("removing session", { id: V }), d(q), yield* e.publish(dMt.Deleted, { id: q.info.id }));
        }),
        I = Ge("Pty.remove")(function* (V) {
          (yield* _(V), yield* L(V));
        }),
        D = Ge("Pty.list")(function* () {
          return Array.from(H.values()).map((V) => V.info);
        }),
        S = Ge("Pty.get")(function* (V) {
          return (yield* _(V)).info;
        }),
        T = Ge("Pty.create")(function* (V) {
          let q = ox.ascending(),
            Z = V.command || uMt(Uht(yield* r.entries(), "shell")),
            se = fua(Z) ? [...(V.args ?? []), "-l"] : [...(V.args ?? [])],
            ae = V.cwd || t.directory,
            z = { ...process.env, ...V.env, TERM: "xterm-256color", OPENCODE_TERMINAL: "1" };
          ((z.LC_ALL = "C.UTF-8"),
            (z.LC_CTYPE = "C.UTF-8"),
            (z.LANG = "C.UTF-8"),
            yield* fH("creating session", { id: q, cmd: Z, args: se, cwd: ae }));
          let { spawn: Ae } = yield* nA(() => Mua()),
            le = yield* jn(() => Ae(Z, se, { name: "xterm-256color", cwd: ae, env: z })),
            Be = {
              id: q,
              title: V.title || `Terminal ${q.slice(-4)}`,
              command: Z,
              args: se,
              cwd: ae,
              status: "running",
              pid: le.pid,
            },
            Te = {
              info: Be,
              process: le,
              buffer: "",
              bufferCursor: 0,
              cursor: 0,
              subscribers: new Map(),
              listeners: [],
            };
          return (
            H.set(q, Te),
            Te.listeners.push(
              le.onData((Lt) => {
                Te.cursor += Lt.length;
                for (let [Se, _e] of Te.subscribers.entries()) {
                  if (!_e.active) {
                    _e.pending.push(Lt);
                    continue;
                  }
                  try {
                    _e.onData(Lt);
                  } catch {
                    Te.subscribers.delete(Se);
                  }
                }
                if (((Te.buffer += Lt), Te.buffer.length <= jEi)) return;
                let Ht = Te.buffer.length - jEi;
                ((Te.buffer = Te.buffer.slice(Ht)), (Te.bufferCursor += Ht));
              }),
              le.onExit(({ exitCode: Lt }) => {
                if (Te.info.status === "exited") return;
                ((Te.info.status = "exited"),
                  (Te.info.exitCode = Lt),
                  f(Te, { exitCode: Lt }),
                  u.push(q),
                  a(
                    ft(function* () {
                      (yield* fH("session exited", { id: q, exitCode: Lt }),
                        yield* e.publish(dMt.Exited, { id: q, exitCode: Lt }));
                      while (u.length > yua) {
                        let Ht = u[0];
                        if (!Ht) break;
                        yield* L(Ht);
                      }
                    }),
                  ));
              }),
            ),
            yield* e.publish(dMt.Created, { info: Be }),
            Be
          );
        }),
        C = Ge("Pty.update")(function* (V, q) {
          let Z = yield* _(V);
          if (q.title) Z.info.title = q.title;
          if (q.size && Z.info.status === "running") Z.process.resize(q.size.cols, q.size.rows);
          return (yield* e.publish(dMt.Updated, { info: Z.info }), Z.info);
        }),
        O = Ge("Pty.write")(function* (V, q) {
          let Z = yield* _(V);
          if (Z.info.status === "running") Z.process.write(q);
        }),
        B = Ge("Pty.attach")(function* (V, q) {
          let Z = yield* _(V);
          if (Z.info.status !== "running") return yield* new CEi({ ptyID: V });
          yield* fH("client attached to session", { id: V, directory: t.directory });
          let se = {},
            ae = { onData: q.onData, onEnd: q.onEnd, active: !1, detached: !1, pending: [] };
          Z.subscribers.set(se, ae);
          let { bufferCursor: z, cursor: Ae } = Z,
            le =
              q.cursor === -1
                ? Ae
                : typeof q.cursor === "number" && Number.isSafeInteger(q.cursor)
                  ? Math.max(0, q.cursor)
                  : 0;
          return {
            replay: (() => {
              if (!Z.buffer || le >= Ae) return "";
              let Te = Math.max(0, le - z);
              if (Te >= Z.buffer.length) return "";
              return Z.buffer.slice(Te);
            })(),
            cursor: Ae,
            write: (Te) => {
              if (Z.info.status === "running") Z.process.write(Te);
            },
            activate: () => {
              if (ae.active || ae.detached) return;
              ae.active = !0;
              try {
                for (let Te of ae.pending) ae.onData(Te);
                if (((ae.pending.length = 0), ae.end)) ae.onEnd(ae.end);
              } catch {
                Z.subscribers.delete(se);
              }
            },
            detach: () => {
              ((ae.detached = !0), (ae.pending.length = 0), (ae.end = void 0), Z.subscribers.delete(se));
            },
          };
        });
      return uT.of({ list: D, get: S, create: T, update: C, remove: I, write: O, attach: B });
    }),
  )),
    (DIc = wEi.pipe(ou(Nht))),
    (Tua = Ua({ service: uT, layer: wEi, deps: [zS, KS, PY] })));
});