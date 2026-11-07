
var aar = ne(async () => {
  Gt();
  jA();
  DY();
  a$t();
  BA();
  OH();
  await Jn([um(), c$t(), aar()]);
  ear = class ear extends ki()("RepositoryCacheInvalidRepositoryError", { repository: re, message: re }) {};
  tar = class tar extends ki()("RepositoryCacheInvalidBranchError", { branch: re, message: re }) {};
  rar = class rar extends ki()("RepositoryCacheCloneFailedError", { repository: re, message: re }) {};
  hVe = class hVe extends ki()("RepositoryCacheFetchFailedError", { repository: re, message: re }) {};
  nar = class nar extends (
    ki()("RepositoryCacheCheckoutFailedError", { repository: re, branch: re, message: re })
  ) {};
  iar = class iar extends ki()("RepositoryCacheResetFailedError", { repository: re, message: re }) {};
  sar = class sar extends ki()("RepositoryCacheLockFailedError", { localPath: re, message: re }) {};
  oar = class oar extends ki()("RepositoryCacheOperationError", { operation: re, path: re, message: re }) {};
  LVe = class LVe extends _i()("@opencode/RepositoryCache") {};
  ((iYH = Ge("RepositoryCache.parseRemote")(function* (e) {
    return yield* ZA({ try: () => RHo(e), catch: (t) => new ear({ repository: e, message: A$t(t) }) });
  })),
    (tco = Ge("RepositoryCache.validateBranch")(function* (e) {
      return yield* ZA({ try: () => Mvn(e), catch: (t) => new tar({ branch: e, message: A$t(t) }) });
    })),
    (rco = Es(
      LVe,
      ft(function* () {
        let e = yield* ui.Service,
          t = yield* qG,
          r = yield* n5.Service,
          s = yield* M1;
        return LVe.of({
          ensure: Ge("RepositoryCache.ensure")(function* (a) {
            if (a.branch) yield* tco(a.branch);
            let H = a.reference.label,
              u = Svn(s.repos, a.reference, a.branch),
              f = o$t(a.reference.remote) ?? a.reference;
            return yield* r
              .withLock(
                ft(function* () {
                  yield* vvn(e.ensureDir(ZHo.dirname(u)), "ensure cache directory", u);
                  let d = yield* t.repo.discover(bo.make(u)),
                    _ = d ? yield* t.remote.get(d) : void 0,
                    L = _ ? o$t(_) : void 0,
                    I = d ? yield* e.resolve(u) : void 0,
                    D = Boolean(d && d.worktree === I && L && VHo(L, f));
                  if (!D && (yield* e.existsSafe(u)))
                    yield* vvn(e.remove(u, { recursive: !0 }), "remove stale cache", u);
                  let S = !D ? "cloned" : a.refresh ? "refreshed" : "cached";
                  if (S === "cloned")
                    yield* t.repo
                      .clone({ remote: a.reference.remote, directory: bo.make(u), branch: a.branch })
                      .pipe(Zo((C) => new rar({ repository: H, message: C.message })));
                  if (S === "refreshed") {
                    if (!d) return yield* new hVe({ repository: H, message: "Repository is unavailable" });
                    if (
                      (yield* t.sync
                        .fetchRemotes(d)
                        .pipe(Zo((B) => new hVe({ repository: H, message: B.message }))),
                      a.branch)
                    )
                      yield* t.sync
                        .fetchBranch(d, { branch: a.branch })
                        .pipe(Zo((B) => new hVe({ repository: H, message: B.message })));
                    let C = a.branch ?? (yield* t.history.defaultRemoteBranch(d));
                    if (C)
                      yield* t.sync
                        .checkoutRemoteBranch(d, { branch: C })
                        .pipe(Zo((B) => new nar({ repository: H, branch: C, message: B.message })));
                    let O = C ?? (yield* t.history.branch(d));
                    yield* t.sync
                      .resetHard(d, O ? `origin/${O}` : "HEAD")
                      .pipe(Zo((B) => new iar({ repository: H, message: B.message })));
                  }
                  let T = yield* t.repo.discover(bo.make(u));
                  return {
                    repository: H,
                    host: a.reference.host,
                    remote: a.reference.remote,
                    localPath: u,
                    status: S,
                    head: T ? yield* t.history.head(T) : void 0,
                    branch: T ? yield* t.history.branch(T) : void 0,
                  };
                }),
                `repository-cache:${u}`,
              )
              .pipe(Zo((d) => (eco(d) ? d : new sar({ localPath: u, message: A$t(d) }))));
          }),
        });
      }),
    )),
    (nco = iA({ service: LVe, layer: rco, deps: [n5.node, ui.node, zMe, lw] })));
});