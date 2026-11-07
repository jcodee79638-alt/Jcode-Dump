
var h7 = ne(async () => {
  au();
  Gt();
  OY();
  Ql();
  jA();
  o0();
  Z5e();
  YTt();
  Ry();
  $Me();
  iXe();
  await Jn([ZL(), um(), iMt(), ET(), nXe(), h7()]);
  ((dqc = K0i),
    (Nja = nt({ name: re, description: be(re), location: re, content: re })),
    (Fja = fG(nt({ message: re, path: On(re) }), [ks(re, PH)])));
  Rja = class Rja extends ki()("SkillInvalidError", { path: re, message: be(re), issues: be(On(Fja)) }) {};
  Wja = class Wja extends ki()("SkillNameMismatchError", { path: re, expected: re, actual: re }) {};
  UOi = class UOi extends ki()("Skill.NotFoundError", { name: re, available: On(re) }) {
    get message() {
      return `Skill "${this.name}" not found. Available skills: ${this.available.join(", ") || "none"}`;
    }
  };
  ((Vja = ni(function* (e, t, r) {
    let s = yield* bl({ try: () => Uva(t), catch: (a) => a }).pipe(
      $s(
        ni(function* (a) {
          let H = Y5e.isInstance(a) ? a.data.message : `Failed to parse skill ${t}`,
            { Session: u } = yield* nA(() => e$().then(() => LL));
          (yield* r.publish(u.Event.Error, { error: new ud.Unknown({ message: H }).toObject() }),
            yield* cf("failed to load skill", { skill: t, error: a }));
          return;
        }),
      ),
    );
    if (!s) return;
    if (!Bja(s.data)) return;
    if (e.skills[s.data.name])
      yield* lp("duplicate skill name", {
        name: s.data.name,
        existing: e.skills[s.data.name].location,
        duplicate: t,
      });
    (e.dirs.add(Dje.dirname(t)),
      (e.skills[s.data.name] = {
        name: s.data.name,
        description: s.data.description,
        location: t,
        content: s.content,
      }));
  })),
    (mXe = ni(function* (e, t, r, s) {
      let a = yield* bl({
        try: () => wG.scan(r, { cwd: t, absolute: !0, include: "file", symlink: !0, dot: s?.dot }),
        catch: (H) => H,
      }).pipe(
        $s((H) => {
          if (!s?.scope) return No(H);
          return cf(`failed to scan ${s.scope} skills`, { dir: t, error: H }).pipe(eu([]));
        }),
      );
      for (let H of a) (e.matches.add(H), e.dirs.add(Dje.dirname(H)));
    })),
    (qja = ni(function* (e, t, r, s, a, H, u, f) {
      let d = { matches: new Set(), dirs: new Set() },
        _ = [];
      if (!a) {
        if (!H) _.push(kja);
        _.push(Oja);
        for (let S of _) {
          let T = Dje.join(s.home, S);
          if (!(yield* r.isDir(T))) continue;
          yield* mXe(d, T, kOi, { dot: !0, scope: "global" });
        }
        let D = yield* r.up({ targets: _, start: u, stop: f }).pipe($s(() => Jt([])));
        for (let S of D) yield* mXe(d, S, kOi, { dot: !0, scope: "project" });
      }
      let L = yield* e.directories();
      for (let D of L) yield* mXe(d, D, Uja);
      let I = yield* e.get();
      for (let D of I.skills?.paths ?? []) {
        let S = D.startsWith("~/") ? Dje.join(s.home, D.slice(2)) : D,
          T = Dje.isAbsolute(S) ? S : Dje.join(u, S);
        if (!(yield* r.isDir(T))) {
          yield* lp("skill path not found", { path: T });
          continue;
        }
        yield* mXe(d, T, OOi);
      }
      for (let D of I.skills?.urls ?? []) {
        let S = yield* t.pull(D);
        for (let T of S) yield* mXe(d, T, OOi);
      }
      return { matches: Array.from(d.matches), dirs: Array.from(d.dirs) };
    })),
    (Gja = ni(function* (e, t, r) {
      (yield* ja(t.matches, (s) => Vja(e, s, r), { concurrency: "unbounded", discard: !0 }),
        yield* fH("init", { count: Object.keys(e.skills).length }));
    })));
  uee = class uee extends _i()("@opencode/Skill") {};
  Xja = Es(
    uee,
    ft(function* () {
      let e = yield* rXe,
        t = yield* Eg,
        r = yield* B$,
        s = yield* ui.Service,
        a = yield* M1,
        H = yield* NE,
        u = yield* cx(
          Ge("Skill.discovery")(function* (S) {
            return yield* qja(
              t,
              e,
              s,
              a,
              H.disableExternalSkills,
              H.disableClaudeCodeSkills,
              S.directory,
              S.worktree,
            );
          }),
        ),
        f = yield* cx(
          Ge("Skill.state")(function* () {
            let S = { skills: {}, dirs: new Set() };
            return (yield* Gja(S, yield* Eu(u), r), S);
          }),
        ),
        d = Ge("Skill.get")(function* (S) {
          return (yield* Eu(f)).skills[S];
        }),
        _ = Ge("Skill.require")(function* (S) {
          let T = yield* Eu(f),
            C = T.skills[S];
          if (C) return C;
          return yield* new UOi({ name: S, available: Object.keys(T.skills).toSorted() });
        }),
        L = Ge("Skill.all")(function* () {
          let S = yield* Eu(f);
          return Object.values(S.skills);
        }),
        I = Ge("Skill.dirs")(function* () {
          return (yield* Eu(u)).dirs;
        }),
        D = Ge("Skill.available")(function* (S) {
          let T = yield* Eu(f),
            C = Object.values(T.skills).toSorted((O, B) => O.name.localeCompare(B.name));
          if (!S) return C;
          return C.filter((O) => IHe("skill", O.name, S.permission).action !== "deny");
        });
      return uee.of({ get: d, require: _, all: L, dirs: I, available: D });
    }),
  );
  yje = Ll({ service: uee, layer: Xja, deps: [KDr, Ab, q1, ui.node, lw, WN] });
});
import PHe from "path";