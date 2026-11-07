
var Axe = ne(() => {
  Axe();
  OH();
  Gt();
  dWe();
  jA();
  jsr = class jsr extends ki()("FileMutation.StaleContentError", { path: re }) {};
  yMn = class yMn extends ki()("FileMutation.TargetExistsError", { path: re }) {};
  Zde = class Zde extends _i()("@opencode/v2/FileMutation") {};
  JZs = Es(
    Zde,
    ft(function* () {
      let e = yield* ui.Service,
        t = mir(),
        r = (L) => (I) => t.withLock(L.canonical)(BL(I)),
        s = (L, I) => ({ operation: "write", target: L.canonical, resource: L.resource, existed: I }),
        a = (L, I) => ({ operation: "remove", target: L.canonical, resource: L.resource, existed: I }),
        H = Ge("FileMutation.write")((L) =>
          r(L.target)(
            ft(function* () {
              let I = yield* e.exists(L.target.canonical);
              return (yield* e.writeWithDirs(L.target.canonical, L.content), s(L.target, I));
            }),
          ),
        ),
        u = Ge("FileMutation.writeTextPreservingBom")((L) =>
          r(L.target)(
            ft(function* () {
              let I = MMn(L.content),
                D = yield* e
                  .readFile(L.target.canonical)
                  .pipe(GC("PlatformError", "NotFound", () => Jt(void 0)));
              return (
                yield* e.writeWithDirs(L.target.canonical, KZs(I.text, Boolean(D && zZs(D)) || I.bom)),
                s(L.target, D !== void 0)
              );
            }),
          ),
        ),
        f = Ge("FileMutation.create")((L) =>
          r(L.target)(
            ft(function* () {
              let I =
                typeof L.content === "string"
                  ? e.writeFileString(L.target.canonical, L.content, { flag: "wx" })
                  : e.writeFile(L.target.canonical, L.content, { flag: "wx" });
              return (
                yield* I.pipe(
                  GC("PlatformError", "NotFound", () => e.ensureDir(XZs(L.target.canonical)).pipe(Zu(I))),
                  GC("PlatformError", "AlreadyExists", () => bn(new yMn({ path: L.target.canonical }))),
                ),
                s(L.target, !1)
              );
            }),
          ),
        ),
        d = Ge("FileMutation.writeIfUnchanged")((L) =>
          r(L.target)(
            ft(function* () {
              let I = yield* e.readFile(L.target.canonical);
              if (!QZs(I, L.expected)) return yield* new jsr({ path: L.target.canonical });
              return (
                yield* typeof L.content === "string"
                  ? e.writeFileString(L.target.canonical, L.content)
                  : e.writeFile(L.target.canonical, L.content),
                s(L.target, !0)
              );
            }),
          ),
        ),
        _ = Ge("FileMutation.remove")((L) =>
          r(L.target)(
            ft(function* () {
              let I = yield* e.remove(L.target.canonical).pipe(
                eu(!0),
                GC("PlatformError", "NotFound", () => Jt(!1)),
              );
              return a(L.target, I);
            }),
          ),
        );
      return Zde.of({ create: f, write: H, writeTextPreservingBom: u, writeIfUnchanged: d, remove: _ });
    }),
  );
  Fht = Ua({ service: Zde, layer: JZs, deps: [ui.node] });
});