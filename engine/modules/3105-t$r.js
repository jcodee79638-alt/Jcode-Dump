
var t$r = ne(async () => {
  Gt();
  jA();
  uw();
  BA();
  MZ();
  ibe();
  OH();
  await Jn([t$r(), um(), qd()]);
  e$r = class e$r extends Pa("InstructionContext.File")({ path: bo, content: re }) {};
  ((zda = On(e$r)),
    (wDi = QV.make("core/instructions")),
    (Qda = zg(
      ft(function* () {
        let e = yield* ui.Service,
          t = yield* M1,
          r = yield* bm,
          s = yield* K_e,
          a = (u) =>
            Fqe({
              key: wDi,
              codec: wj(zda),
              load: Jt(u),
              baseline: kDi,
              update: (f, d) => `These instructions replace all previously loaded ambient instructions.

${kDi(d)}`,
              removed: () => "Previously loaded instructions no longer apply.",
            }),
          H = Ge("InstructionContext.observe")(function* () {
            let u = yield* e.resolve(r.directory),
              f = yield* e.resolve(r.project.directory),
              d = Jda(f, u),
              _ = d === "" || (d !== ".." && !d.startsWith(`..${Kda}`) && !Gda(d)),
              L = new Set(
                yield* ja(
                  Ad.OPENCODE_DISABLE_PROJECT_CONFIG || !_
                    ? []
                    : yield* e.up({ targets: ["AGENTS.md"], start: u, stop: f }),
                  e.resolve,
                ),
              ),
              I = qOs([yield* e.resolve(Xda(t.config, "AGENTS.md")), ...L]),
              D = yield* ja(
                I,
                (S) =>
                  e
                    .readFileStringSafe(S)
                    .pipe(Vn((T) => (T === void 0 ? void 0 : new e$r({ path: bo.make(S), content: T })))),
                { concurrency: "unbounded" },
              );
            if (D.some((S, T) => S === void 0 && L.has(I[T]))) return nbe;
            return D.filter((S) => S !== void 0);
          });
        yield* s.register({
          key: wDi,
          load: H().pipe(
            Vn((u) => (u === nbe ? a(u) : u.length === 0 ? $Mt : a(u))),
            $s(() => Jt(a(nbe))),
            jQ(() => Jt(a(nbe))),
          ),
        });
      }),
    )),
    (Yda = Ua({ name: "instruction-context", layer: Qda, deps: [ui.node, lw, KS, DMt] })));
});