
var ykt = ne(async () => {
  Etn();
  VRe();
  Gt();
  Cf();
  N0r();
  iYe();
  await Jn([yGe(), Ikt(), Ywe(), Ewr(), ykt()]);
  globalThis.AI_SDK_LOG_WARNINGS = !1;
  Dkt = class Dkt extends _i()("@opencode/ListenerServer") {};
  LaH = JLe(() => {
    let e = kis().handler,
      t = {
        fetch: (r) => e(r, Pis),
        request(r, s) {
          return t.fetch(r instanceof Request ? r : new Request(new URL(r, "http://localhost"), s));
        },
      };
    return { app: t };
  });
  gaH = Ge("Server.listen")(function* (e) {
    let t = yield* IaH(e),
      r = yield* DaH(t),
      s = yaH(e.hostname, r.port),
      a = yield* MaH(e, r.port, t.scope);
    return ((Rwr = s), { hostname: e.hostname, port: r.port, url: s, stop: yield* xaH(t, a, s) });
  });
});
import Ois from "path";