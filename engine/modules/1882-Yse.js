
var Yse = ne(async () => {
  OH();
  Gt();
  jA();
  await Jn([Yse(), qd()]);
  ((Wao = Jo(["file", "directory"])), (GXH = nt({ path: re, kind: Wao.pipe(be) })));
  KWe = class KWe extends (
    ki()("LocationMutation.PathError", {
      path: re,
      reason: Jo(["relative_escape", "location_escape", "non_directory_ancestor"]),
    })
  ) {};
  kY = class kY extends _i()("@opencode/v2/LocationMutation") {};
  ((Vao = Es(
    kY,
    ft(function* () {
      let e = yield* ui.Service,
        t = yield* bm,
        r = yield* e.realPath(t.directory);
      function s(u) {
        return u.pipe(GC("PlatformError", "NotFound", () => Jt(void 0)));
      }
      let a = ni(function* (u) {
          let f = yield* s(e.realPath(u));
          if (f !== void 0) {
            let _ = yield* e.stat(f);
            return { canonical: f, type: _.type, directory: _.type === "Directory" ? f : wY.dirname(f) };
          }
          let d = wY.dirname(u);
          while (!0) {
            let _ = yield* s(e.realPath(d));
            if (_ !== void 0) {
              if ((yield* e.stat(_)).type !== "Directory")
                return yield* new KWe({ path: u, reason: "non_directory_ancestor" });
              return { canonical: wY.resolve(_, wY.relative(d, u)), directory: _ };
            }
            let L = wY.dirname(d);
            if (L === d) return yield* new KWe({ path: u, reason: "non_directory_ancestor" });
            d = L;
          }
        }),
        H = Ge("LocationMutation.resolve")(function* (u) {
          let f = !wY.isAbsolute(u.path),
            d = wY.resolve(t.directory, u.path),
            _ = ui.contains(t.directory, d);
          if (f && !_) return yield* new KWe({ path: u.path, reason: "relative_escape" });
          let L = yield* a(d);
          if (_ && !ui.contains(r, L.canonical))
            return yield* new KWe({ path: u.path, reason: "location_escape" });
          let I = !_,
            D = I ? hor(L.canonical) : hor(wY.relative(r, L.canonical) || "."),
            S = u.kind === "directory" && L.type === "Directory" ? L.canonical : L.directory,
            T = hor(wY.join(S, "*"));
          return {
            canonical: L.canonical,
            resource: D,
            externalDirectory: I
              ? { action: "external_directory", directory: S, resource: T, save: T }
              : void 0,
          };
        });
      return kY.of({ resolve: H });
    }),
  )),
    (Ixe = Ua({ service: kY, layer: Vao.pipe(X2e), deps: [ui.node, KS] })));
});