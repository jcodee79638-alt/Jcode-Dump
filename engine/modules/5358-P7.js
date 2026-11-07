
var P7 = ne(async () => {
  au();
  Gt();
  YM();
  _w();
  LV();
  Ql();
  oje();
  o0();
  Ry();
  cee();
  await Jn([k5i(), P7()]);
  nXa = nt({ name: re, extensions: On(re), enabled: Vi }).annotate({ identifier: "FormatterStatus" });
  _J = class _J extends _i()("@opencode/Format") {};
  ((GEA = vm(_J)),
    (iXa = Es(
      _J,
      ft(function* () {
        let e = yield* Eg,
          t = yield* x2,
          r = yield* NE,
          s = yield* cx(
            Ge("Format.state")(function* (f) {
              let d = {},
                _ = {};
              async function L(C) {
                let O = d[C.name];
                if (O === !1 || O === void 0)
                  ((O = await C.enabled({ ...f, experimentalOxfmt: r.experimentalOxfmt })), (d[C.name] = O));
                return O;
              }
              async function I(C) {
                return (await L(C)) !== !1;
              }
              async function D(C) {
                let O = Object.values(_).filter((V) => V.extensions.includes(C));
                return (
                  await Promise.all(
                    O.map(async (V) => {
                      let q = await L(V);
                      return { item: V, cmd: q };
                    }),
                  )
                )
                  .filter((V) => V.cmd !== !1)
                  .map((V) => ({ item: V.item, cmd: V.cmd }));
              }
              function S(C) {
                return ft(function* () {
                  yield* fH("formatting", { file: C });
                  let O = yield* nA(() => D(rXa.extname(C)));
                  if (!O.length) return !1;
                  for (let { item: B, cmd: V } of O) {
                    yield* fH("running", { command: V });
                    let q = V.map((ae) => ae.replace("$FILE", C)),
                      Z = yield* xX,
                      se = yield* t
                        .run(
                          Lh(q[0], q.slice(1), {
                            cwd: Z,
                            env: B.environment,
                            extendEnv: !0,
                            stdin: "ignore",
                            stdout: "ignore",
                            stderr: "ignore",
                          }),
                        )
                        .pipe(
                          $s((ae) =>
                            cf("failed to format file", {
                              error: "spawn failed",
                              command: V,
                              ...B.environment,
                              file: C,
                              cause: fx(ae.cause ?? ae),
                            }).pipe(eu(void 0)),
                          ),
                        );
                    if (se && se.exitCode !== 0) yield* cf("failed", { command: V, ...B.environment });
                  }
                  return !0;
                });
              }
              let T = yield* e.get();
              if (!T.formatter)
                return (
                  yield* fH("all formatters are disabled"),
                  yield* fH("init"),
                  { formatters: _, isEnabled: I, formatFile: S }
                );
              for (let C of Object.values(ICt)) _[C.name] = C;
              if (T.formatter !== !0)
                for (let [C, O] of Object.entries(T.formatter)) {
                  let B = ICt[C];
                  if (
                    ["ruff", "uv"].includes(C) &&
                    (T.formatter.ruff?.disabled || T.formatter.uv?.disabled)
                  ) {
                    (delete _.ruff, delete _.uv);
                    continue;
                  }
                  if (O.disabled) {
                    delete _[C];
                    continue;
                  }
                  let V = bhe(B ?? { extensions: [] }, O);
                  _[C] = {
                    ...V,
                    name: C,
                    extensions: V.extensions ?? [],
                    enabled: B && !V.command ? B.enabled : async (q) => V.command ?? !1,
                  };
                }
              return (yield* fH("init"), { formatters: _, isEnabled: I, formatFile: S });
            }),
          ),
          a = Ge("Format.init")(function* () {
            yield* Eu(s);
          }),
          H = Ge("Format.status")(function* () {
            let { formatters: f, isEnabled: d } = yield* Eu(s),
              _ = [];
            for (let L of Object.values(f)) {
              let I = yield* nA(() => d(L));
              _.push({ name: L.name, extensions: L.extensions, enabled: I });
            }
            return _;
          }),
          u = Ge("Format.file")(function* (f) {
            let { formatFile: d } = yield* Eu(s);
            return yield* d(f);
          });
        return _J.of({ init: a, status: H, file: u });
      }),
    )),
    (DCt = Ll({ service: _J, layer: iXa, deps: [Ab, IY, WN] })));
});
import O5i from "path";