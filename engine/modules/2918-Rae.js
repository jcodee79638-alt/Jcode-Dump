
var Rae = ne(async () => {
  Gt();
  jA();
  OH();
  vy();
  au();
  oEt();
  await Jn([Rae(), um(), c$t(), rAr()]);
  E0i = Tl(ky(), 1);
  khr = class khr extends (
    ki()("NpmInstallFailedError", { add: On(re).pipe(be), dir: re, cause: be(yd()) })
  ) {};
  Bae = class Bae extends _i()("@opencode/Npm") {};
  g0i = new Set(["<", ">", ":", '"', "|", "?", "*"]);
  ((IAa = Es(
    Bae,
    ft(function* () {
      let e = yield* ui.Service,
        t = yield* M1,
        r = yield* g1,
        s = yield* n5.Service,
        a = (_) => yN.join(t.cache, "packages", EAa(_)),
        H = (_) =>
          ft(function* () {
            yield* s.acquire(`npm-install:${_.dir}`);
            let { Arborist: L } = yield* nA(() => Promise.resolve().then(() => Tl($0i(), 1))),
              I = _.add ?? [],
              D = yield* yYn(_.dir),
              S = new L({ ...D, path: _.dir, binLinks: !0, progress: !1, savePrefix: "", ignoreScripts: !0 });
            return yield* bl({
              try: () => S.reify({ ...D, add: I, save: !0, saveType: "prod" }),
              catch: (T) => new khr({ cause: T, add: I, dir: _.dir }),
            });
          }).pipe(gI("Npm.reify", { attributes: _ })),
        u = Ge("Npm.add")(function* (_) {
          let L = a(_),
            I = (() => {
              try {
                return E0i.default(_).name ?? _;
              } catch {
                return _;
              }
            })();
          if (yield* e.existsSafe(yN.join(L, "node_modules", I)))
            return whr(I, yN.join(L, "node_modules", I));
          let S = (yield* H({ dir: L, add: [_] })).edgesOut.values().next().value?.to;
          if (!S) {
            let T = whr(I, yN.join(L, "node_modules", I));
            if (T.entrypoint) return T;
            return yield* new khr({ add: [_], dir: L });
          }
          return whr(S.name, S.path);
        }, FL),
        f = Ge("Npm.install")(function* (_, L) {
          if (
            !(yield* e.access(_, { writable: !0 }).pipe(
              eu(!0),
              PU(() => !1),
            ))
          )
            return;
          let D = L?.add.map((S) => [S.name, S.version].filter(Boolean).join("@")) ?? [];
          if (
            yield* ft(function* () {
              if (!(yield* e.existsSafe(yN.join(_, "node_modules"))))
                return (yield* H({ add: D, dir: _ }), !0);
              return !1;
            }).pipe(gI("Npm.checkNodeModules"))
          )
            return;
          yield* ft(function* () {
            let S = yield* e.readJson(yN.join(_, "package.json")).pipe(PU(() => ({}))),
              T = yield* e.readJson(yN.join(_, "package-lock.json")).pipe(PU(() => ({}))),
              C = S,
              O = T,
              B = new Set([
                ...Object.keys(C?.dependencies || {}),
                ...Object.keys(C?.devDependencies || {}),
                ...Object.keys(C?.peerDependencies || {}),
                ...Object.keys(C?.optionalDependencies || {}),
                ...(L?.add || []).map((Z) => Z.name),
              ]),
              V = O?.packages?.[""] || {},
              q = new Set([
                ...Object.keys(V?.dependencies || {}),
                ...Object.keys(V?.devDependencies || {}),
                ...Object.keys(V?.peerDependencies || {}),
                ...Object.keys(V?.optionalDependencies || {}),
              ]);
            for (let Z of B)
              if (!q.has(Z)) {
                yield* H({ dir: _, add: D });
                return;
              }
          }).pipe(gI("Npm.checkDirty"));
          return;
        }, FL),
        d = Ge("Npm.which")(function* (_, L) {
          let I = a(_),
            D = yN.join(I, "node_modules", ".bin"),
            S = ni(function* () {
              let T = yield* r.readDirectory(D).pipe($s(() => Jt([])));
              if (T.length === 0) return eH();
              if (L) return T.includes(L) ? Lo(L) : eH();
              if (T.length === 1) return Lo(T[0]);
              let C = yield* e.readJson(yN.join(I, "node_modules", _, "package.json")).pipe(hQt);
              if (Nu(C)) {
                let O = C.value;
                if (O?.bin) {
                  let B = _.startsWith("@") ? _.split("/")[1] : _,
                    V = O.bin;
                  if (typeof V === "string") return Lo(B);
                  let q = Object.keys(V);
                  if (q.length === 1) return Lo(q[0]);
                  return V[B] ? Lo(B) : Lo(q[0]);
                }
              }
              return Lo(T[0]);
            });
          return OL(
            yield* ft(function* () {
              let T = yield* S();
              if (Nu(T)) return Lo(yN.join(D, T.value));
              (yield* r.remove(yN.join(I, "package-lock.json")).pipe(PU(() => {})), yield* u(_));
              let C = yield* S();
              if (vl(C)) return eH();
              return Lo(yN.join(D, C.value));
            }).pipe(
              FL,
              PU(() => eH()),
            ),
          );
        });
      return Bae.of({ add: u, install: f, which: d });
    }),
  )),
    (tMt = iA({ service: Bae, layer: IAa, deps: [ui.node, lw, BMe, n5.node] })),
    ({ runPromise: DAa } = I0t(Bae, rdt(tMt))));
});