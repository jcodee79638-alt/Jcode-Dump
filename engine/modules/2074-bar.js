
var bar = ne(async () => {
  Gt();
  Cf();
  jA();
  OH();
  vy();
  BA();
  await Jn([bar(), um()]);
  aPn = class aPn extends Pa("SkillDiscovery.IndexSkill")({ name: re, version: be(re), files: On(re) }) {};
  HPn = class HPn extends Pa("SkillDiscovery.Index")({ skills: On(aPn) }) {};
  TVe = class TVe extends _i()("@opencode/v2/SkillDiscovery") {};
  ((ufo = Es(
    TVe,
    ft(function* () {
      let e = yield* ui.Service,
        t = yield* M1,
        r = (yield* gy).pipe(
          SRe({ retryOn: "errors-and-responses", times: 2, schedule: slt(200).pipe(olt) }),
          RU,
        ),
        s = Ge("SkillDiscovery.download")(function* (a, H) {
          if (yield* e.exists(H).pipe(on)) return !0;
          return yield* KM(a).pipe(
            r.execute,
            Hi((u) => u.arrayBuffer),
            Hi((u) => e.writeWithDirs(H, new Uint8Array(u))),
            eu(!0),
            $s((u) => cf("failed to download skill file", { url: a, error: u }).pipe(eu(!1))),
          );
        });
      return TVe.of({
        pull: Ge("SkillDiscovery.pull")(function* (a) {
          let H = a.endsWith("/") ? a : `${a}/`,
            u = new URL(H),
            f = new URL("index.json", u).href,
            d = yield* KM(f).pipe(
              _G,
              r.execute,
              Hi(l2(HPn)),
              $s((L) => cf("failed to fetch skill index", { url: f, error: L }).pipe(eu(void 0))),
            );
          if (!d) return [];
          let _ = B2.resolve(t.cache, "skills", Bun.hash(H).toString(16));
          return yield* ja(
            d.skills.flatMap((L) => {
              if (!cfo(L.name)) return [];
              if (!L.files.includes("SKILL.md") && !L.files.includes(`${L.name}.md`)) return [];
              let I = B2.resolve(_, L.name);
              if (!ui.contains(_, I) || I === _) return [];
              let D = new URL(`${encodeURIComponent(L.name)}/`, u),
                S = B2.join(I, ".opencode-version"),
                T = L.files.map((C) => {
                  if (!Afo(C)) return;
                  let O;
                  try {
                    O = new URL(C, D);
                  } catch {
                    return;
                  }
                  if (O.origin !== u.origin) return;
                  let B = B2.resolve(I, C);
                  if (!ui.contains(I, B) || B === I) return;
                  return { url: O.href, destination: B, file: C };
                });
              if (T.some((C) => C === void 0)) return [];
              return [{ skill: L, root: I, versionFile: S, files: T }];
            }),
            ({ skill: L, root: I, versionFile: D, files: S }) =>
              ft(function* () {
                let T = L.version,
                  C = T === void 0 ? void 0 : yield* e.readFileStringSafe(D).pipe($s(() => Jt(void 0)));
                if (T === void 0 || C === T)
                  yield* ja(S, (B) => s(B.url, B.destination), { concurrency: oPn, discard: !0 });
                else {
                  let B = crypto.randomUUID(),
                    V = `${I}.tmp-${B}`,
                    q = `${I}.old-${B}`;
                  yield* ft(function* () {
                    if (
                      !(yield* ja(S, (ae) => s(ae.url, B2.resolve(V, ae.file)), { concurrency: oPn })).every(
                        Boolean,
                      )
                    )
                      return;
                    if (!(
                      (yield* e.exists(B2.join(V, "SKILL.md")).pipe(on)) ||
                      (yield* e.exists(B2.join(V, `${L.name}.md`)).pipe(on))
                    ))
                      return;
                    (yield* e.writeFileString(B2.join(V, ".opencode-version"), T),
                      yield* BL(
                        ft(function* () {
                          let ae = yield* e.exists(I).pipe(on);
                          if (ae) yield* e.rename(I, q);
                          if (
                            (yield* e.rename(V, I).pipe(
                              $s((z) =>
                                ft(function* () {
                                  if (ae) yield* e.rename(q, I).pipe(FA);
                                  return yield* bn(z);
                                }),
                              ),
                            ),
                            ae)
                          )
                            yield* e.remove(q, { recursive: !0, force: !0 }).pipe(FA);
                        }),
                      ));
                  }).pipe(
                    $s((Z) => cf("failed to refresh skill", { skill: L.name, error: Z })),
                    up(e.remove(V, { recursive: !0, force: !0 }).pipe(FA)),
                  );
                }
                return (yield* e.exists(B2.join(I, "SKILL.md")).pipe(on)) ||
                  (yield* e.exists(B2.join(I, `${L.name}.md`)).pipe(on))
                  ? [bo.make(I)]
                  : [];
              }),
            { concurrency: Hfo },
          ).pipe(Vn((L) => L.flat()));
        }),
      });
    }),
  )),
    (lfo = iA({ service: TVe, layer: ufo, deps: [Q0, ui.node, lw] })));
});
import APn from "path";