
var Rhr = ne(async () => {
  Gt();
  BA();
  await Jn([Rhr(), e8(), Kv(), PV(), um(), qd()]);
  vAa = TD({
    id: "core/config-reference",
    effect: Ge(function* (e) {
      let t = yield* ZM,
        r = yield* bm,
        s = yield* M1;
      yield* e.reference.transform(
        Ge(function* (a) {
          let H = new Map();
          for (let u of (yield* t.entries()).filter((f) => f.type === "document")) {
            let f = u.path ? rMt.dirname(u.path) : r.directory;
            for (let [d, _] of Object.entries(u.info.references ?? {})) {
              if (!bAa(d)) continue;
              let L = typeof _ === "string" ? void 0 : _.description,
                I = typeof _ === "string" ? void 0 : _.hidden;
              H.set(
                d,
                jAa(_)
                  ? ico.make({
                      type: "local",
                      path: bo.make(PAa(f, s.home, typeof _ === "string" ? _ : _.path)),
                      ...(L === void 0 ? {} : { description: L }),
                      ...(I === void 0 ? {} : { hidden: I }),
                    })
                  : sco.make({
                      type: "git",
                      repository: typeof _ === "string" ? _ : _.repository,
                      ...(_.branch === void 0 ? {} : { branch: _.branch }),
                      ...(L === void 0 ? {} : { description: L }),
                      ...(I === void 0 ? {} : { hidden: I }),
                    }),
              );
            }
          }
          for (let [u, f] of H) a.add(u, f);
        }),
      );
    }),
  });
});
import jqe from "path";