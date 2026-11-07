
var rJe,
  K3i,
  xBa = (e, t) => {
    let r = Ker({ _tag: "Idle" }),
      s = t?.onIdle ?? ti,
      a = t?.onBusy ?? ti,
      H = t?.onInterrupt,
      u = 0,
      f = () => zer(r),
      d = () => ((u += 1), u),
      _ = (q, Z) => (LI(Z) && d1(Z.cause) ? I6(q, new rJe()).pipe(Qf) : SQ(q, Z).pipe(Qf)),
      L = (q) => Fl(q).pipe(EA("RunnerCancelled", (Z) => H ?? No(Z))),
      I = () => $G(r, (q) => [q._tag === "Idle" ? s : ti, q]).pipe(zq),
      D = (q, Z, se) =>
        $G(r, (ae) => [
          ft(function* () {
            if (ae._tag === "Running" && ae.run.id === q) yield* s;
            yield* _(Z, se);
          }),
          ae._tag === "Running" && ae.run.id === q ? { _tag: "Idle" } : ae,
        ]).pipe(zq),
      S = (q, Z) =>
        ft(function* () {
          let se = d(),
            ae = yield* q.pipe(
              JC((z) => D(se, Z, z)),
              zm(e),
            );
          return { id: se, done: Z, fiber: ae };
        }),
      T = (q) =>
        KRe(
          r,
          ni(function* (Z) {
            if (Z._tag === "Shell" && Z.shell.id === q) return [s, { _tag: "Idle" }];
            if (Z._tag === "ShellThenRun" && Z.shell.id === q) {
              let se = yield* S(Z.run.work, Z.run.done);
              return [ti, { _tag: "Running", run: se }];
            }
            return [ti, Z];
          }),
        ).pipe(zq),
      C = (q) =>
        ft(function* () {
          if (q.ready) yield* q.ready.await.pipe(_h, Qf);
          (yield* D6(q.cancelled, void 0).pipe(Qf), yield* s2(q.fiber));
        }),
      O = (q) =>
        KRe(
          r,
          ni(function* (Z) {
            switch (Z._tag) {
              case "Running":
              case "ShellThenRun":
                return [L(Z.run.done), Z];
              case "Shell": {
                let se = { id: d(), done: yield* bU(), work: q };
                return [L(se.done), { _tag: "ShellThenRun", shell: Z.shell, run: se }];
              }
              case "Idle": {
                let se = yield* bU(),
                  ae = yield* S(q, se);
                return [L(se), { _tag: "Running", run: ae }];
              }
            }
          }),
        ).pipe(zq),
      B = (q, Z) =>
        KRe(
          r,
          ni(function* (se) {
            if (se._tag !== "Idle") return [bn(new K3i()), se];
            yield* a;
            let ae = d(),
              z = yield* bU(),
              Ae = yield* q.pipe(up(T(ae)), oBe),
              le = { id: ae, cancelled: z, ready: Z, fiber: Ae };
            return [
              ft(function* () {
                let Be = yield* Cpe(Ae);
                if (mh(Be)) return Be.value;
                if (d1(Be.cause) || ((yield* hpe(z)) && xW(Be.cause) && !Oin(Be.cause))) {
                  if (H) return yield* H;
                  return yield* No(new rJe());
                }
                return yield* NL(Be.cause);
              }),
              { _tag: "Shell", shell: le },
            ];
          }),
        ).pipe(zq),
      V = $G(r, (q) => {
        switch (q._tag) {
          case "Idle":
            return [ti, q];
          case "Running":
            return [
              ft(function* () {
                (yield* s2(q.run.fiber), yield* I6(q.run.done, new rJe()).pipe(Qf), yield* I());
              }),
              { _tag: "Idle" },
            ];
          case "Shell":
            return [
              ft(function* () {
                (yield* C(q.shell), yield* I());
              }),
              { _tag: "Idle" },
            ];
          case "ShellThenRun":
            return [
              ft(function* () {
                (yield* C(q.shell), yield* I6(q.run.done, new rJe()).pipe(Qf), yield* I());
              }),
              { _tag: "Idle" },
            ];
        }
      }).pipe(zq);
    return {
      get state() {
        return f();
      },
      get busy() {
        return f()._tag !== "Idle";
      },
      ensureRunning: O,
      startShell: B,
      cancel: V,
    };
  };