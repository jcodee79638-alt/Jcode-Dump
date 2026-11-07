
var lns = ne(async () => {
  mme();
  CE();
  Gt();
  $H();
  await Jn([Vw(), RLe(), jI(), Jy()]);
  ((Ans = {
    name: "project-copy-name",
    mode: "primary",
    permission: [],
    options: {},
    native: !0,
    prompt: "",
  }),
    (uns = Kd(eh, "projectCopyName", (e) =>
      ft(function* () {
        let t = yield* bce,
          r = yield* FN,
          s = Ge("ProjectCopyHttpApi.generateName")(function* (a) {
            let H = a?.trim();
            if (!H) return Yv.create();
            let u = yield* r.defaultModel().pipe($s(() => Jt(void 0)));
            if (!u) return Yv.create();
            let f = (yield* r.getSmallModel(u.providerID)) ?? (yield* r.getModel(u.providerID, u.modelID)),
              d = Ec.descending(),
              L = (yield* t
                .stream({
                  agent: Ans,
                  user: {
                    id: Td.ascending(),
                    sessionID: d,
                    role: "user",
                    time: { created: Date.now() },
                    agent: Ans.name,
                    model: { providerID: f.providerID, modelID: f.id },
                  },
                  system: [],
                  small: !0,
                  tools: {},
                  model: f,
                  sessionID: d,
                  retries: 2,
                  messages: [
                    {
                      role: "user",
                      content: `Generate a short 2-3 word name that describes this task:
${H}`,
                    },
                  ],
                })
                .pipe(
                  aG(tA.is.textDelta),
                  xE((I) => I.text),
                  cG,
                )).trim();
            return L ? woH(L.split(/\s+/).slice(0, 3).join(" ")) : Yv.create();
          });
        return e.handle("generateName", (a) =>
          s(a.payload.context).pipe(
            jf((H) =>
              lp("project copy name generation failed", { projectID: a.params.projectID, cause: H }).pipe(
                eu(Yv.create()),
              ),
            ),
            Vn((H) => ({ name: H })),
          ),
        );
      }),
    )));
});