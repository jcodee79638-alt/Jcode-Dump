
var Use = ne(() => {
  VRe();
  e2();
  BH();
  lD();
  RQ();
  Dd();
  Bpe();
  PW();
  Yu();
  BBe();
  aL();
  Gpt();
  Hse();
  OH();
  vy();
  Use();
  ((FDn = Tl(V_t(), 1)),
    (jQs = ft(function* () {
      let e = yield* g1,
        t = yield* rw,
        r = ni(function* (q) {
          if (Iv(q.cwd)) return;
          return (yield* e.access(q.cwd), t.resolve(q.cwd));
        }),
        s = (q) => (q.extendEnv ? { ...globalThis.process.env, ...q.env } : q.env),
        a = (q) => (lg(q) ? "pipe" : q),
        H = (q) => (iG(q) ? "pipe" : q),
        u = (q) => {
          let Z = { stream: "pipe", encoding: "utf-8", endOnDone: !0 };
          if (Iv(q.stdin)) return Z;
          if (typeof q.stdin === "string") return { ...Z, stream: q.stdin };
          if (lg(q.stdin)) return { ...Z, stream: q.stdin };
          return {
            stream: q.stdin.stream,
            encoding: q.stdin.encoding ?? Z.encoding,
            endOnDone: q.stdin.endOnDone ?? Z.endOnDone,
          };
        },
        f = (q, Z) => {
          let se = q[Z];
          if (Iv(se)) return { stream: "pipe" };
          if (typeof se === "string") return { stream: se };
          if (iG(se)) return { stream: se };
          return { stream: se.stream };
        },
        d = (q) => {
          if (Iv(q.additionalFds)) return [];
          return Object.entries(q.additionalFds)
            .flatMap(([Z, se]) => {
              let ae = cse(Z);
              return Iv(ae) ? [] : [{ fd: ae, config: se }];
            })
            .toSorted((Z, se) => Z.fd - se.fd);
        },
        _ = (q, Z, se, ae) => {
          let z = (Be) => (Be === "pipe" ? "overlapped" : Be),
            Ae = [z(a(q.stream)), z(H(Z.stream)), z(H(se.stream))];
          if (ae.length === 0) return Ae;
          let le = ae.reduce((Be, Te) => Math.max(Be, Te.fd), 2);
          for (let Be = 3; Be <= le; Be++) Ae[Be] = "ignore";
          for (let Be of ae) Ae[Be.fd] = z("pipe");
          return Ae;
        },
        L = ni(function* (q, Z, se) {
          if (se.length === 0) return { getInputFd: () => sG, getOutputFd: () => $1 };
          let ae = new Map(),
            z = new Map();
          for (let Ae of se) {
            let le = Z.stdio[Ae.fd];
            switch (Ae.config.type) {
              case "input": {
                let Be = sG;
                if (le && "write" in le)
                  Be = ase({
                    evaluate: () => le,
                    onError: (Te) => WG(`fromWritable(fd${Ae.fd})`, Ose(Te), q),
                    endOnDone: !0,
                  });
                if (Ae.config.stream) yield* EI(Vie(Ae.config.stream, Be));
                ae.set(Ae.fd, Be);
                break;
              }
              case "output": {
                let Be = $1;
                if (le && "read" in le) {
                  let Te = new vQs();
                  (le.on("error", (Lt) => Te.destroy(Ose(Lt))),
                    le.pipe(Te),
                    (Be = B6({
                      evaluate: () => Te,
                      onError: (Lt) => WG(`fromReadable(fd${Ae.fd})`, Ose(Lt), q),
                    })));
                }
                if (Ae.config.sink) Be = Rie(Be, Ae.config.sink);
                z.set(Ae.fd, Be);
                break;
              }
            }
          }
          return { getInputFd: (Ae) => ae.get(Ae) ?? sG, getOutputFd: (Ae) => z.get(Ae) ?? $1 };
        }),
        I = (q, Z, se) =>
          yH(() => {
            let ae = sG;
            if (fQ(Z.stdin))
              ae = ase({
                evaluate: () => Z.stdin,
                onError: (z) => WG("fromWritable(stdin)", Ose(z), q),
                endOnDone: se.endOnDone,
                encoding: se.encoding,
              });
            if (lg(se.stream)) return eu(EI(Vie(se.stream, ae)), ae);
            return Jt(ae);
          }),
        D = (q, Z, se, ae) => {
          let z = Z.stdout
              ? B6({ evaluate: () => Z.stdout, onError: (le) => WG("fromReadable(stdout)", Ose(le), q) })
              : $1,
            Ae = Z.stderr
              ? B6({ evaluate: () => Z.stderr, onError: (le) => WG("fromReadable(stderr)", Ose(le), q) })
              : $1;
          if (iG(se.stream)) z = Rie(z, se.stream);
          if (iG(ae.stream)) Ae = Rie(Ae, ae.stream);
          return { stdout: z, stderr: Ae, all: oG(z, Ae) };
        },
        S = (q, Z) =>
          Fd((se) => {
            let ae = Kg(),
              z = FDn.default(q.command, q.args, Z),
              Ae = !1,
              le;
            return (
              z.on("error", (Be) => {
                se(bn(WG("spawn", Be, q)));
              }),
              z.on("exit", (...Be) => {
                le = Be;
              }),
              z.on("close", (...Be) => {
                if (Ae) return;
                ((Ae = !0), EE(ae, RC(le ?? Be)));
              }),
              z.on("spawn", () => {
                se(Jt([z, ae]));
              }),
              jn(() => {
                z.kill("SIGTERM");
              })
            );
          }),
        T = (q, Z, se) => {
          if (globalThis.process.platform === "win32")
            return Fd((ae) => {
              NDn.exec(`taskkill /pid ${Z.pid} /T /F`, { windowsHide: !0 }, (z) => {
                if (z) return ae(bn(WG("kill", Ose(z), q)));
                ae(ti);
              });
            });
          return ZA({
            try: () => {
              globalThis.process.kill(-Z.pid, se);
            },
            catch: (ae) => WG("kill", Ose(ae), q),
          });
        },
        C = (q, Z, se) =>
          yH(() => {
            if (Z.kill(se)) return ti;
            return bn(WG("kill", Error("Failed to kill child process"), q));
          }),
        O = (q, Z, se) => (ae) => {
          let z = se?.killSignal ?? "SIGTERM";
          if (Iv(se?.forceKillAfter)) return ae(Z, q, z);
          return Tj(ae(Z, q, z), { duration: se.forceKillAfter, orElse: () => ae(Z, q, "SIGKILL") });
        },
        B = (q, Z) => {
          let se = Z ?? "stdout";
          switch (se) {
            case "stdout":
              return q.stdout;
            case "stderr":
              return q.stderr;
            case "all":
              return q.all;
            default: {
              let ae = cse(se);
              return SS(ae) ? q.getOutputFd(ae) : q.stdout;
            }
          }
        },
        V = ni(function* (q) {
          switch (q._tag) {
            case "StandardCommand": {
              let Z = u(q.options),
                se = f(q.options, "stdout"),
                ae = f(q.options, "stderr"),
                z = d(q.options),
                Ae = yield* r(q.options),
                [le, Be] = yield* Bd(
                  S(q, {
                    cwd: Ae,
                    env: s(q.options),
                    stdio: _(Z, se, ae, z),
                    detached: q.options.detached ?? !1,
                    shell: q.options.shell,
                    windowsHide: !0,
                  }),
                  ni(function* ([Se, _e]) {
                    let we = yield* hpe(_e),
                      Pe = O(Se, q, q.options);
                    if (we) {
                      let [Fe] = yield* Fl(_e);
                      return yield* ti;
                    }
                    let ye = (Fe) => $s(T(q, Se, Fe), () => C(q, Se, Fe)),
                      ot = q.options.killSignal ?? "SIGTERM",
                      Ee = ye(ot).pipe(Zu(Fl(_e)), Qf),
                      Ve = q.options.forceKillAfter
                        ? Tj(Ee, {
                            duration: q.options.forceKillAfter,
                            orElse: () => ye("SIGKILL").pipe(Zu(Fl(_e)), Qf),
                          })
                        : Ee;
                    return yield* FA(Ve);
                  }),
                ),
                Te = yield* L(q, le, z),
                Lt = D(q, le, se, ae),
                Ht = !0;
              return FRe({
                pid: Rpt(le.pid),
                stdin: yield* I(q, le, Z),
                stdout: Lt.stdout,
                stderr: Lt.stderr,
                all: Lt.all,
                getInputFd: Te.getInputFd,
                getOutputFd: Te.getOutputFd,
                isRunning: Vn(hpe(Be), (Se) => !Se),
                exitCode: Hi(Fl(Be), ([Se, _e]) => {
                  if (fQ(Se)) return Jt(W1e(Se));
                  return bn(
                    WG("exitCode", Error(`Process interrupted due to receipt of signal: '${_e}'`), q),
                  );
                }),
                kill: (Se) => {
                  let _e = Se?.killSignal ?? "SIGTERM",
                    we = (ye) => $s(T(q, le, ye), () => C(q, le, ye)),
                    Pe = we(_e).pipe(Zu(Fl(Be)), Qf);
                  if (!Se?.forceKillAfter) return Pe;
                  return Tj(Pe, {
                    duration: Se.forceKillAfter,
                    orElse: () => we("SIGKILL").pipe(Zu(Fl(Be)), Qf),
                  });
                },
                unref: jn(() => {
                  if (Ht) (le.unref(), (Ht = !1));
                  return jn(() => {
                    if (!Ht) (le.ref(), (Ht = !0));
                  });
                }),
              });
            }
            case "PipedCommand": {
              let Z = BDn(q),
                [se, ...ae] = Z.commands,
                z = V(se);
              for (let Ae = 0; Ae < ae.length; Ae++) {
                let le = ae[Ae],
                  Be = Z.opts[Ae] ?? {},
                  Te = u(le.options),
                  Lt = hh(Vn(z, (_e) => B(_e, Be.from))),
                  Ht = Be.to ?? "stdin";
                if (Ht === "stdin") {
                  z = V(Lh(le.command, le.args, { ...le.options, stdin: { ...Te, stream: Lt } }));
                  continue;
                }
                let Se = cse(Ht);
                if (Iv(Se)) {
                  z = V(Lh(le.command, le.args, { ...le.options, stdin: { ...Te, stream: Lt } }));
                  continue;
                }
                z = V(
                  Lh(le.command, le.args, {
                    ...le.options,
                    additionalFds: { ...le.options.additionalFds, [qpt(Se)]: { type: "input", stream: Lt } },
                  }),
                );
              }
              return yield* z;
            }
          }
        });
      return Wpt(V);
    })),
    (PQs = Es(kS, jQs)),
    (qMe = iA({ service: kS, layer: PQs, deps: [BMe, RMe] })));
});