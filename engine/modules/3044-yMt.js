
var yMt = ne(async () => {
  OH();
  Gt();
  MZ();
  await Jn([yMt(), S1(), R2()]);
  Vua = nt({ name: re, description: re });
  Wqe = class Wqe extends _i()("@opencode/v2/SkillGuidance") {};
  ((qua = Es(
    Wqe,
    ft(function* () {
      let e = yield* o5;
      return Wqe.of({
        load: Ge("SkillGuidance.load")(function* (t) {
          let r = t.info;
          if (!r) return $Mt;
          let s = mfo(yield* e.list(), r);
          if (s.length === 0 && pVe("skill", "*", r.permissions).effect === "deny") return $Mt;
          let a = s
            .flatMap((H) => (H.description === void 0 ? [] : [{ name: H.name, description: H.description }]))
            .toSorted((H, u) => H.name.localeCompare(u.name));
          return Fqe({
            key: QV.make("core/skill-guidance"),
            codec: wj(On(Vua)),
            load: Jt(a),
            baseline: oIi,
            update: (H, u) =>
              [
                "The available skills have changed. This list supersedes the previous available skills list.",
                oIi(u),
              ].join(`
`),
            removed: () => "Skill guidance is no longer available. Do not use any previously listed skill.",
          });
        }),
      });
    }),
  )),
    (aIi = Ua({ service: Wqe, layer: qua, deps: [vVe] })));
});