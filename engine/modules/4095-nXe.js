
var nXe = ne(async () => {
  au();
  vy();
  Gt();
  Cf();
  kGe();
  jA();
  await Jn([um(), nXe()]);
  q8i = class q8i extends Pa("IndexSkill")({ name: re, files: On(re), version: be(re) }) {};
  G8i = class G8i extends Pa("Index")({ skills: On(q8i) }) {};
  rXe = class rXe extends _i()("@opencode/SkillDiscovery") {};
  ((Fva = Es(
    rXe,
    ft(function* () {
      let e = yield* ui.Service,
        t = yield* rw,
        r = RU(AHe(yield* gy)),
        s = t.join(uH.cache, "skills"),
        a = Ge("Discovery.download")(function* (u, f) {
          if (yield* e.exists(f).pipe(on)) return !0;
          return yield* KM(u).pipe(
            r.execute,
            Hi((d) => d.arrayBuffer),
            Hi((d) => e.writeWithDirs(f, new Uint8Array(d))),
            eu(!0),
            $s((d) => cf("failed to download", { url: u, error: d }).pipe(eu(!1))),
          );
        }),
        H = Ge("Discovery.pull")(function* (u) {
          let f = u.endsWith("/") ? u : `${u}/`,
            d = new URL("index.json", f).href,
            _ = f.slice(0, -1);
          yield* fH("fetching index", { url: d });
          let L = yield* KM(d).pipe(
            _G,
            r.execute,
            Hi(l2(G8i)),
            $s((T) => cf("failed to fetch index", { url: d, error: T }).pipe(eu(null))),
          );
          if (!L) return [];
          let I = L.skills.filter((T) => !T.files.includes("SKILL.md"));
          yield* ja(I, (T) => lp("skill entry missing SKILL.md", { url: d, skill: T.name }), { discard: !0 });
          let D = L.skills.filter((T) => T.files.includes("SKILL.md"));
          return (yield* ja(
            D,
            (T) =>
              ft(function* () {
                let C = t.join(s, T.name),
                  O = t.join(C, ".opencode-version"),
                  B = T.version,
                  V = B === void 0 ? void 0 : yield* e.readFileStringSafe(O).pipe($s(() => Jt(void 0)));
                if (B === void 0 || V === B)
                  yield* ja(T.files, (q) => a(new URL(q, `${_}/${T.name}/`).href, t.join(C, q)), {
                    concurrency: V8i,
                    discard: !0,
                  });
                else {
                  let q = crypto.randomUUID(),
                    Z = `${C}.tmp-${q}`,
                    se = `${C}.old-${q}`;
                  yield* ft(function* () {
                    if (
                      !(yield* ja(T.files, (z) => a(new URL(z, `${_}/${T.name}/`).href, t.join(Z, z)), {
                        concurrency: V8i,
                      })).every(Boolean)
                    )
                      return;
                    if (!(yield* e.exists(t.join(Z, "SKILL.md")).pipe(on))) return;
                    (yield* e.writeFileString(t.join(Z, ".opencode-version"), B),
                      yield* BL(
                        ft(function* () {
                          let z = yield* e.exists(C).pipe(on);
                          if (z) yield* e.rename(C, se);
                          if (
                            (yield* e.rename(Z, C).pipe(
                              $s((Ae) =>
                                ft(function* () {
                                  if (z) yield* e.rename(se, C).pipe(FA);
                                  return yield* bn(Ae);
                                }),
                              ),
                            ),
                            z)
                          )
                            yield* e.remove(se, { recursive: !0, force: !0 }).pipe(FA);
                        }),
                      ));
                  }).pipe(
                    $s((ae) => cf("failed to refresh skill", { skill: T.name, error: ae })),
                    up(e.remove(Z, { recursive: !0, force: !0 }).pipe(FA)),
                  );
                }
                return (yield* e.exists(t.join(C, "SKILL.md")).pipe(on)) ? C : null;
              }),
            { concurrency: Nva },
          )).filter((T) => T !== null);
        });
      return rXe.of({ pull: H });
    }),
  )),
    (KDr = Ll({ service: rXe, layer: Fva, deps: [ui.node, RMe, Q0] })));
});