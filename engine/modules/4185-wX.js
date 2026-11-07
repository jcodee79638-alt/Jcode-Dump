
var wX = ne(async () => {
  au();
  jA();
  Gt();
  BA();
  Nhe();
  await Jn([um(), wX()]);
  Xw = class Xw extends ki()("NotFoundError", { message: re }) {
    static isInstance(e) {
      return e instanceof Xw;
    }
  };
  ((Wba = nt({ path: be(nt({ root: be(re) })) })),
    (Vba = nt({ id: re })),
    (qba = nt({ id: re })),
    (Gba = nt({ additions: Ko, deletions: Ko })),
    (Xba = nt({ id: re, projectID: re, summary: nt({ diffs: On(Gba) }) })),
    (Jba = kv(Wba)),
    (Kba = kv(Vba)),
    (zba = kv(qba)),
    (Qba = kv(Xba)));
  cXe = class cXe extends _i()("@opencode/Storage") {};
  ((fOi = [
    Ge("Storage.migration.1")(function* (e, t, r) {
      let s = IP.resolve(e, "../project");
      if (!(yield* t.isDir(s))) return;
      let a = yield* t.glob("*", { cwd: s, include: "all" });
      for (let H of a) {
        let u = IP.join(s, H);
        if (!(yield* t.isDir(u))) continue;
        yield* fH(`migrating project ${H}`);
        let f = H,
          d = "/";
        if (f !== "global") {
          for (let I of yield* t.glob("storage/session/message/*/*.json", { cwd: u, absolute: !0 })) {
            let D = Jba(yield* t.readJson(I), { onExcessProperty: "preserve" }),
              S = Nu(D) ? D.value.path?.root : void 0;
            if (!S) continue;
            d = S;
            break;
          }
          if (!d) continue;
          if (!(yield* t.isDir(d))) continue;
          let _ = yield* r.run(["rev-list", "--max-parents=0", "--all"], { cwd: d }),
            [L] = _.text()
              .split(
                `
`,
              )
              .filter(Boolean)
              .map((I) => I.trim())
              .toSorted();
          if (!L) continue;
          ((f = L),
            yield* t.writeWithDirs(
              IP.join(e, "project", f + ".json"),
              JSON.stringify(
                { id: L, vcs: "git", worktree: d, time: { created: Date.now(), initialized: Date.now() } },
                null,
                2,
              ),
            ),
            yield* fH(`migrating sessions for project ${f}`));
          for (let I of yield* t.glob("storage/session/info/*.json", { cwd: u, absolute: !0 })) {
            let D = IP.join(e, "session", f, IP.basename(I));
            yield* fH("copying", { sessionFile: I, dest: D });
            let S = yield* t.readJson(I),
              T = Kba(S, { onExcessProperty: "preserve" });
            if ((yield* t.writeWithDirs(D, JSON.stringify(S, null, 2)), vl(T))) continue;
            yield* fH(`migrating messages for session ${T.value.id}`);
            for (let C of yield* t.glob(`storage/session/message/${T.value.id}/*.json`, {
              cwd: u,
              absolute: !0,
            })) {
              let O = IP.join(e, "message", T.value.id, IP.basename(C));
              yield* fH("copying", { msgFile: C, dest: O });
              let B = yield* t.readJson(C),
                V = zba(B, { onExcessProperty: "preserve" });
              if ((yield* t.writeWithDirs(O, JSON.stringify(B, null, 2)), vl(V))) continue;
              yield* fH(`migrating parts for message ${V.value.id}`);
              for (let q of yield* t.glob(`storage/session/part/${T.value.id}/${V.value.id}/*.json`, {
                cwd: u,
                absolute: !0,
              })) {
                let Z = IP.join(e, "part", V.value.id, IP.basename(q)),
                  se = yield* t.readJson(q);
                (yield* fH("copying", { partFile: q, dest: Z }),
                  yield* t.writeWithDirs(Z, JSON.stringify(se, null, 2)));
              }
            }
          }
        }
      }
    }),
    Ge("Storage.migration.2")(function* (e, t) {
      for (let r of yield* t.glob("session/*/*.json", { cwd: e, absolute: !0 })) {
        let s = yield* t.readJson(r),
          a = Qba(s, { onExcessProperty: "preserve" });
        if (vl(a)) continue;
        let H = a.value.summary.diffs;
        (yield* t.writeWithDirs(IP.join(e, "session_diff", a.value.id + ".json"), JSON.stringify(H, null, 2)),
          yield* t.writeWithDirs(
            IP.join(e, "session", a.value.projectID, a.value.id + ".json"),
            JSON.stringify(
              {
                ...s,
                summary: {
                  additions: H.reduce((u, f) => u + f.additions, 0),
                  deletions: H.reduce((u, f) => u + f.deletions, 0),
                },
              },
              null,
              2,
            ),
          ));
      }
    }),
  ]),
    (eja = Es(
      cXe,
      ft(function* () {
        let e = yield* ui.Service,
          t = yield* Uhe,
          r = yield* wYt({ lookup: () => rVs(), idleTimeToLive: 0 }),
          s = yield* pD(
            ft(function* () {
              let S = IP.join(uH.data, "storage"),
                T = IP.join(S, "migration"),
                C = yield* e.readFileString(T).pipe(
                  Vn(Zba),
                  GM(iyr, () => Jt(0)),
                  PU(() => 0),
                );
              for (let O = C; O < fOi.length; O++) {
                yield* fH("running migration", { index: O });
                let B = fOi[O],
                  V = yield* _h(B(S, e, t));
                if (LI(V)) {
                  yield* cf("failed to run migration", { index: O, cause: V.cause });
                  break;
                }
                yield* e.writeWithDirs(T, String(O + 1));
              }
              return { dir: S };
            }),
          ),
          a = (S) => bn(new Xw({ message: `Resource not found: ${S}` })),
          H = (S, T) => T.pipe(GM(iyr, () => a(S))),
          u = ni(function* (S, T) {
            yield* e.writeWithDirs(S, JSON.stringify(T, null, 2));
          }),
          f = (S, T) =>
            FL(
              ft(function* () {
                let C = Yba((yield* s).dir, S);
                return yield* T(C, yield* uft(r, C));
              }),
            ),
          d = Ge("Storage.remove")(function* (S) {
            yield* f(S, (T, C) => Qer(C, e.remove(T).pipe(GM(iyr, () => ti))));
          }),
          _ = (S) =>
            ft(function* () {
              return yield* f(S, (C, O) => nVs(O, H(C, e.readJson(C))));
            }),
          L = (S, T) =>
            ft(function* () {
              return yield* f(S, (O, B) =>
                Qer(
                  B,
                  ft(function* () {
                    let V = yield* H(O, e.readJson(O));
                    return (T(V), yield* u(O, V), V);
                  }),
                ),
              );
            }),
          I = (S, T) =>
            ft(function* () {
              yield* f(S, (C, O) => Qer(O, u(C, T)));
            }),
          D = Ge("Storage.list")(function* (S) {
            let T = (yield* s).dir,
              C = IP.join(T, ...S);
            return (yield* e.glob("**/*", { cwd: C, include: "file" }).pipe($s(() => Jt([]))))
              .map((B) => [...S, ...B.slice(0, -5).split(IP.sep)])
              .toSorted((B, V) => B.join("/").localeCompare(V.join("/")));
          });
        return cXe.of({ remove: d, read: _, update: L, write: I, list: D });
      }),
    )),
    (syr = Ll({ service: cXe, layer: eja, deps: [ui.node, HXe] })));
});