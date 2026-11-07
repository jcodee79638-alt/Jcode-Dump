
var pfn = ne(() => {
  e2();
  BH();
  lD();
  RQ();
  Dd();
  Bpe();
  Yu();
  BBe();
  aL();
  Gpt();
  Hse();
  JYt();
  Upt();
  Npt();
  ((w3s = ft(function* () {
    let e = yield* g1,
      t = yield* rw,
      r = ni(function* (Z) {
        if (Iv(Z.cwd)) return;
        return (yield* e.access(Z.cwd), t.resolve(Z.cwd));
      }),
      s = (Z) => (Z.extendEnv ? { ...globalThis.process.env, ...Z.env } : Z.env),
      a = (Z) => (lg(Z) ? "pipe" : Z),
      H = (Z) => (iG(Z) ? "pipe" : Z),
      u = (Z) => {
        let se = { stream: "pipe", encoding: "utf-8", endOnDone: !0 };
        if (Iv(Z.stdin)) return se;
        if (typeof Z.stdin === "string") return { ...se, stream: Z.stdin };
        if (lg(Z.stdin)) return { ...se, stream: Z.stdin };
        return {
          stream: Z.stdin.stream,
          encoding: Z.stdin.encoding ?? se.encoding,
          endOnDone: Z.stdin.endOnDone ?? se.endOnDone,
        };
      },
      f = (Z, se) => {
        let ae = Z[se];
        if (Iv(ae)) return { stream: "pipe" };
        if (typeof ae === "string") return { stream: ae };
        if (iG(ae)) return { stream: ae };
        return { stream: ae.stream };
      },
      d = (Z) => {
        if (Iv(Z.additionalFds)) return [];
        let se = [];
        for (let [ae, z] of Object.entries(Z.additionalFds)) {
          let Ae = cse(ae);
          if (SS(Ae)) se.push({ fd: Ae, config: z });
        }
        return se.sort((ae, z) => ae.fd - z.fd);
      },
      _ = (Z, se, ae, z) => {
        let Ae = [a(Z.stream), H(se.stream), H(ae.stream)];
        if (z.length === 0) return Ae;
        let le = z.reduce((Be, { fd: Te }) => Math.max(Be, Te), 2);
        for (let Be = 3; Be <= le; Be++) Ae[Be] = "ignore";
        for (let { fd: Be } of z) Ae[Be] = "pipe";
        return Ae;
      },
      L = ni(function* (Z, se, ae) {
        if (ae.length === 0) return { getInputFd: () => sG, getOutputFd: () => $1 };
        let z = new Map(),
          Ae = new Map();
        for (let { config: le, fd: Be } of ae) {
          let Te = se.stdio[Be];
          switch (le.type) {
            case "input": {
              let Lt = sG;
              if (Te && "write" in Te)
                Lt = ase({ evaluate: () => Te, onError: (Ht) => LG(`fromWritable(fd${Be})`, sde(Ht), Z) });
              if (le.stream) yield* EI(Vie(le.stream, Lt));
              z.set(Be, Lt);
              break;
            }
            case "output": {
              let Lt = $1;
              if (Te && "read" in Te)
                Lt = B6({ evaluate: () => Te, onError: (Ht) => LG(`fromReadable(fd${Be})`, sde(Ht), Z) });
              if (le.sink) Lt = Rie(Lt, le.sink);
              Ae.set(Be, Lt);
              break;
            }
          }
        }
        return { getInputFd: (le) => z.get(le) ?? sG, getOutputFd: (le) => Ae.get(le) ?? $1 };
      }),
      I = (Z, se, ae) =>
        yH(() => {
          let z = sG;
          if (fQ(se.stdin))
            z = ase({
              evaluate: () => se.stdin,
              onError: (Ae) => LG("fromWritable(stdin)", sde(Ae), Z),
              endOnDone: ae.endOnDone,
              encoding: ae.encoding,
            });
          if (lg(ae.stream)) return eu(EI(Vie(ae.stream, z)), z);
          return Jt(z);
        }),
      D = (Z, se, ae, z) => {
        let Ae = se.stdout
            ? B6({ evaluate: () => se.stdout, onError: (Te) => LG("fromReadable(stdout)", sde(Te), Z) })
            : $1,
          le = se.stderr
            ? B6({ evaluate: () => se.stderr, onError: (Te) => LG("fromReadable(stderr)", sde(Te), Z) })
            : $1;
        if (iG(ae.stream)) Ae = Rie(Ae, ae.stream);
        if (iG(z.stream)) le = Rie(le, z.stream);
        let Be = oG(Ae, le);
        return { stdout: Ae, stderr: le, all: Be };
      },
      S = (Z, se) =>
        Fd((ae) => {
          let z = Kg(),
            Ae = RRe.spawn(Z.command, Z.args, se);
          return (
            Ae.on("error", (le) => {
              ae(bn(LG("spawn", le, Z)));
            }),
            Ae.on("exit", (...le) => {
              EE(z, RC(le));
            }),
            Ae.on("spawn", () => {
              ae(Jt([Ae, z]));
            }),
            jn(() => {
              Ae.kill("SIGTERM");
            })
          );
        }),
      T = (Z, se, ae) => {
        if (globalThis.process.platform === "win32")
          return Fd((z) => {
            RRe.exec(`taskkill /pid ${se.pid} /T /F`, (Ae) => {
              if (Ae) z(bn(LG("kill", sde(Ae), Z)));
              else z(ti);
            });
          });
        return ZA({
          try: () => {
            globalThis.process.kill(-se.pid, ae);
          },
          catch: (z) => LG("kill", sde(z), Z),
        });
      },
      C = (Z, se) => {
        if (globalThis.process.platform === "win32") {
          RRe.exec(`taskkill /pid ${Z.pid} /T /F`, () => {});
          return;
        }
        try {
          globalThis.process.kill(-Z.pid, se);
        } catch {}
      },
      O = (Z, se, ae) =>
        yH(() => {
          if (!se.kill(ae)) {
            let Ae = new globalThis.Error("Failed to kill child process");
            return bn(LG("kill", Ae, Z));
          }
          return ti;
        }),
      B = (Z, se, ae) => (z) => {
        let Ae = ae?.killSignal ?? "SIGTERM";
        return Iv(ae?.forceKillAfter)
          ? z(se, Z, Ae)
          : Tj(z(se, Z, Ae), { duration: ae.forceKillAfter, orElse: () => z(se, Z, "SIGKILL") });
      },
      V = (Z, se) => {
        let ae = se ?? "stdout";
        switch (ae) {
          case "stdout":
            return Z.stdout;
          case "stderr":
            return Z.stderr;
          case "all":
            return Z.all;
          default: {
            let z = cse(ae);
            if (SS(z)) return Z.getOutputFd(z);
            return Z.stdout;
          }
        }
      },
      q = ni(function* (Z) {
        switch (Z._tag) {
          case "StandardCommand": {
            let se = u(Z.options),
              ae = f(Z.options, "stdout"),
              z = f(Z.options, "stderr"),
              Ae = d(Z.options),
              le = !0,
              Be = !1,
              Te = yield* r(Z.options),
              Lt = s(Z.options),
              Ht = _(se, ae, z, Ae),
              [Se, _e] = yield* Bd(
                S(Z, {
                  cwd: Te,
                  env: Lt,
                  stdio: Ht,
                  detached: Z.options.detached ?? !1,
                  shell: Z.options.shell,
                }),
                ni(function* ([Et, tr]) {
                  let Rr = yield* hpe(tr),
                    Vt = B(Et, Z, Z.options);
                  if (Rr) {
                    let [Br] = yield* Fl(tr);
                    if (Br !== 0 && fQ(Br)) return yield* FA(Vt(T));
                    return yield* ti;
                  }
                  if (!le) return yield* ti;
                  return yield* Vt((Br, Dt, St) => $s(T(Br, Dt, St), () => O(Br, Dt, St))).pipe(
                    Zu(Fl(tr)),
                    FA,
                  );
                }),
              ),
              we = Rpt(Se.pid);
            Se.on("exit", (Et) => {
              if (Be && Et !== 0 && fQ(Et)) C(Se, Z.options.killSignal ?? "SIGTERM");
            });
            let Pe = jn(() => {
                if (!le) (Se.ref(), (le = !0), (Be = !1));
              }),
              ye = jn(() => {
                if (le) (Se.unref(), (le = !1), (Be = !0));
                return Pe;
              }),
              ot = yield* I(Z, Se, se),
              { all: Ee, stderr: Ve, stdout: Fe } = D(Z, Se, ae, z),
              { getInputFd: it, getOutputFd: At } = yield* L(Z, Se, Ae),
              et = Vn(hpe(_e), (Et) => !Et),
              ut = Hi(Fl(_e), ([Et, tr]) => {
                if (fQ(Et)) return Jt(W1e(Et));
                let Rr = new globalThis.Error(`Process interrupted due to receipt of signal: '${tr}'`);
                return bn(LG("exitCode", Rr, Z));
              });
            return FRe({
              pid: we,
              exitCode: ut,
              isRunning: et,
              kill: (Et) =>
                B(Se, Z, Et)((Rr, Vt, Br) => $s(T(Rr, Vt, Br), () => O(Rr, Vt, Br))).pipe(Zu(Fl(_e)), Qf),
              stdin: ot,
              stdout: Fe,
              stderr: Ve,
              all: Ee,
              getInputFd: it,
              getOutputFd: At,
              unref: ye,
            });
          }
          case "PipedCommand": {
            let { commands: se, pipeOptions: ae } = ffn(Z),
              [z, ...Ae] = se,
              le = [yield* q(z)];
            for (let Lt = 0; Lt < Ae.length; Lt++) {
              let Ht = Ae[Lt],
                Se = ae[Lt] ?? {},
                _e = u(Ht.options),
                we = hh(Jt(V(le[le.length - 1], Se.from))),
                Pe = Se.to ?? "stdin";
              if (Pe === "stdin")
                le.push(yield* q(Lh(Ht.command, Ht.args, { ...Ht.options, stdin: { ..._e, stream: we } })));
              else {
                let ye = cse(Pe);
                if (SS(ye)) {
                  let ot = qpt(ye),
                    Ee = Ht.options.additionalFds ?? {};
                  le.push(
                    yield* q(
                      Lh(Ht.command, Ht.args, {
                        ...Ht.options,
                        additionalFds: { ...Ee, [ot]: { type: "input", stream: we } },
                      }),
                    ),
                  );
                } else
                  le.push(yield* q(Lh(Ht.command, Ht.args, { ...Ht.options, stdin: { ..._e, stream: we } })));
              }
            }
            let Be = le[le.length - 1],
              Te = ft(function* () {
                let Lt = [];
                for (let Ht of le) Lt.push(yield* Ht.unref);
                return ja([...Lt].reverse(), (Ht) => Ht, { discard: !0 });
              });
            return FRe({
              pid: Be.pid,
              exitCode: Be.exitCode,
              isRunning: Be.isRunning,
              kill: Be.kill,
              stdin: Be.stdin,
              stdout: Be.stdout,
              stderr: Be.stderr,
              all: Be.all,
              getInputFd: Be.getInputFd,
              getOutputFd: Be.getOutputFd,
              unref: Te,
            });
          }
        }
      });
    return Wpt(q);
  })),
    (lfn = Es(kS, w3s)));
});