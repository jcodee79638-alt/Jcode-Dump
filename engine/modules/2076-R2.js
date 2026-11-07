
var R2 = ne(async () => {
  OH();
  Gt();
  l$t();
  Nxe();
  jA();
  BA();
  rV();
  await Jn([R2(), S1(), bar()]);
  ((jar = Cvn),
    (ffo = wvn),
    (pfo = kvn),
    (y$t = cco),
    (dfo = Har),
    (_fo = nt({ name: re.pipe(be), description: re.pipe(be), slash: Vi.pipe(be) })),
    (hfo = kv(_fo)));
  o5 = class o5 extends _i()("@opencode/v2/Skill") {};
  ((Lfo = Es(
    o5,
    ft(function* () {
      let e = yield* TVe,
        t = yield* ui.Service,
        r = lde({
          initial: () => ({ sources: [] }),
          draft: (u) => ({
            source: (f) => {
              if (u.sources.some((d) => y$t.equals(d, f))) return;
              u.sources.push(f);
            },
            list: () => u.sources,
          }),
        }),
        s = Ge("SkillV2.load")(function* (u) {
          let f = [];
          if (u.type === "embedded") return [u.skill];
          let d = u.type === "directory" ? [u.path] : yield* e.pull(u.url);
          for (let _ of d) {
            let L = yield* t
              .glob("{*.md,**/SKILL.md}", { cwd: _, absolute: !0, include: "file", symlink: !0, dot: !0 })
              .pipe($s(() => Jt([])));
            for (let I of L.toSorted()) {
              let D = yield* t.readFileStringSafe(I).pipe($s(() => Jt(void 0)));
              if (!D) continue;
              let S = Tar(D);
              if (!S) continue;
              let T = hfo(S.data).valueOrUndefined;
              if (!T) continue;
              let C = T.name !== void 0 ? T.name : APn.dirname(I) === _ ? APn.basename(I, ".md") : void 0;
              if (!C) continue;
              f.push({
                name: C,
                description: T.description,
                slash: T.slash,
                location: bo.make(I),
                content: S.content,
              });
            }
          }
          return f;
        }),
        a = new Map(),
        H = Ge("SkillV2.list")(function* () {
          let u = new Map();
          for (let f of r.get().sources) {
            let d = y$t.key(f),
              _ = a.get(d) ?? (yield* s(f));
            a.set(d, _);
            for (let L of _) u.set(L.name, L);
          }
          return Array.from(u.values());
        });
      return o5.of({
        transform: r.transform,
        reload: r.reload,
        sources: Ge("SkillV2.sources")(function* () {
          return r.get().sources;
        }),
        list: H,
      });
    }),
  )),
    (vVe = Ua({ service: o5, layer: Lfo, deps: [lfo, ui.node] })));
});