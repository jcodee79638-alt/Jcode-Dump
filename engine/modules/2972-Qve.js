
var Qve = ne(async () => {
  Gt();
  BA();
  jA();
  DY();
  OH();
  mme();
  sMt();
  oMt();
  await Jn([Qve(), JS(), _We(), eEi(), fL(), qL(), qd()]);
  ((Pqe = nEi),
    (UEc = iEi),
    (NEc = sEi),
    (FEc = nt({ projectID: z_ }).annotate({ identifier: "ProjectCopy.RefreshInput" })),
    (BEc = nt({ updated: On(bo), removed: On(bo) }).annotate({ identifier: "ProjectCopy.RefreshResult" })),
    (REc = oEi),
    (WEc = nt({ directory: bo, type: Jo(["root", "copy"]) }).annotate({
      identifier: "ProjectCopy.ListEntry",
    })));
  Zhr = class Zhr extends ki()("ProjectCopy.SourceDirectoryNotFoundError", { directory: bo }) {};
  eLr = class eLr extends ki()("ProjectCopy.DestinationExistsError", { directory: bo }) {};
  G_e = class G_e extends ki()("ProjectCopy.DirectoryUnavailableError", { directory: bo }) {};
  tLr = class tLr extends ki()("ProjectCopy.InvalidDirectoryError", { directory: bo }) {};
  rLr = class rLr extends ki()("ProjectCopy.StrategyUnavailableError", { strategy: Pqe }) {};
  HEi = class HEi extends ki()("ProjectCopy.DuplicateStrategyError", { strategy: Pqe }) {};
  qae = class qae extends _i()("@opencode/ProjectCopy") {};
  ((sua = ft(function* () {
    let e = yield* bm,
      t = yield* qae;
    yield* ft(function* () {
      yield* fH("project copy refresh started", { projectID: e.project.id });
      let r = yield* t.refresh({ projectID: e.project.id });
      yield* fH("project copy refresh done", {
        projectID: e.project.id,
        updated: r.updated,
        removed: r.removed,
      });
    }).pipe(
      jf((r) => lp("project copy refresh failed", { cause: r })),
      EI,
      Qf,
    );
  })),
    (oua = Es(
      qae,
      ft(function* () {
        let e = yield* ui.Service,
          t = yield* qG,
          r = yield* Vde,
          s = (yield* Vd).db,
          a = yield* lL,
          H = ni(function* (C, O) {
            if (O) yield* a.publish(Qhr.Updated, { projectID: C });
          }),
          u = ni(function* (C) {
            let O = bo.make(yield* e.resolve(C));
            if (!(yield* e.isDir(O))) return yield* new G_e({ directory: C });
            return O;
          }),
          f = new Map(),
          d = Ge("ProjectCopy.register")(function* (C) {
            if (f.has(C.id)) return yield* new HEi({ strategy: C.id });
            f.set(C.id, C);
          });
        yield* d(Z0i({ git: t, canonical: u })).pipe(on);
        let _ = () => Array.from(f.values()),
          L = ni(function* (C, O) {
            let B = yield* u(C);
            if (!(yield* r.contains({ projectID: O, directory: B }))) return yield* new Zhr({ directory: B });
            return B;
          }),
          I = ni(function* (C) {
            let O = f.get(C);
            if (!O) return yield* new rLr({ strategy: C });
            return O;
          }),
          D = Ge("ProjectCopy.create")(function* (C) {
            let O = yield* I(C.strategy),
              B = yield* L(C.sourceDirectory, C.projectID);
            yield* e.makeDirectory(C.directory, { recursive: !0 }).pipe(on);
            let V = C.name ?? Yv.create(),
              q = 1,
              Z = bo.make(aEi.join(C.directory, V));
            while (yield* e.existsSafe(Z)) {
              if ((q++, q > 10)) return yield* new eLr({ directory: Z });
              Z = bo.make(aEi.join(C.directory, `${V}-${q}`));
            }
            let se = yield* O.create({ directory: Z, sourceDirectory: B });
            return (
              yield* H(
                C.projectID,
                yield* r.create({
                  projectID: C.projectID,
                  directory: se.directory,
                  strategy: C.strategy,
                  behavior: "replace",
                }),
              ),
              se
            );
          }),
          S = Ge("ProjectCopy.remove")(function* (C) {
            let O = yield* u(C.directory),
              B = yield* r.get({ projectID: C.projectID, directory: O });
            if (!B?.strategy) return yield* new tLr({ directory: O });
            (yield* (yield* I(Pqe.make(B.strategy))).remove({ directory: O, force: C.force }),
              yield* H(C.projectID, yield* r.remove({ projectID: C.projectID, directory: O })));
          }),
          T = Ge("ProjectCopy.refresh")(function* (C) {
            let O = yield* r.list(C.projectID),
              B = yield* ja(O, (z) => e.isDir(z.directory).pipe(Vn((Ae) => ({ ...z, exists: Ae }))), {
                concurrency: "unbounded",
              }),
              V = B.filter((z) => z.strategy === void 0 && z.exists).map((z) => z.directory),
              q = yield* ja(
                V,
                (z) =>
                  ja(_(), (Ae) =>
                    Ae.list(z).pipe(
                      EA("ProjectCopy.DirectoryUnavailableError", () => Jt([])),
                      Vn((le) =>
                        le.map((Be) => ({
                          directory: Be.directory,
                          strategy: Be.type === "copy" ? Ae.id : void 0,
                        })),
                      ),
                    ),
                  ),
                { concurrency: "unbounded" },
              ).pipe(Vn((z) => new Map(z.flat(2).map((Ae) => [Ae.directory, Ae])).values().toArray())),
              Z = B.filter((z) => !z.exists).map((z) => z.directory),
              se = yield* s
                .transaction((z) =>
                  Km({
                    updated: ja(q, (Ae) =>
                      r.create(
                        {
                          projectID: C.projectID,
                          directory: Ae.directory,
                          strategy: Ae.strategy,
                          behavior: "replace",
                        },
                        z,
                      ),
                    ),
                    removed: ja(Z, (Ae) => r.remove({ projectID: C.projectID, directory: Ae }, z)),
                  }),
                )
                .pipe(on),
              ae = {
                updated: q.filter((z, Ae) => se.updated[Ae]).map((z) => z.directory),
                removed: Z.filter((z, Ae) => se.removed[Ae]),
              };
            return (yield* H(C.projectID, ae.updated.length > 0 || ae.removed.length > 0), ae);
          });
        return qae.of({ register: d, create: D, remove: S, refresh: T });
      }),
    )),
    (nLr = Ua({ service: qae, layer: oua, deps: [ui.node, zMe, yir, zS, DD] })),
    (aua = Ua({ name: "project-copy-refresh", layer: zg(sua), deps: [nLr, KS] })));
});