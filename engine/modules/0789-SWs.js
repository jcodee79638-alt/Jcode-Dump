
var SWs = "~effect/Logger",
  TWs = (e) => Ma(e, SWs),
  vWs,
  bWs,
  jWs = (e) => `#${e}`,
  GRe,
  PWs,
  CWs,
  Qpt = (e, t) =>
    Es(
      vWs,
      Hl(
        Iye(function* (r) {
          let s = new Set(t?.mergeWithExisting === !0 ? r.getRef(B2e) : []);
          for (let a of e) s.add(L_(a) ? yield* a : a);
          return s;
        }),
      ),
    ),
  wWs;