
var KMt = ne(async () => {
  OH();
  VLr();
  JLr();
  KLr();
  O_t();
  Gt();
  kor();
  zM();
  yy();
  U2();
  await Jn([KMt(), KG(), yV()]);
  hDi = class hDi extends ki()("SessionRunnerModel.ModelNotSelectedError", { sessionID: Jj }) {
    get message() {
      return `No model is available for session ${this.sessionID}`;
    }
  };
  LDi = class LDi extends ki()("SessionRunnerModel.ModelUnavailableError", { providerID: Kp, modelID: WL }) {
    get message() {
      return `Model unavailable: ${this.providerID}/${this.modelID}`;
    }
  };
  $Di = class $Di extends (
    ki()("SessionRunnerModel.VariantUnavailableError", { providerID: Kp, modelID: WL, variant: H3e })
  ) {
    get message() {
      return `Variant unavailable for ${this.providerID}/${this.modelID}: ${this.variant}`;
    }
  };
  gDi = class gDi extends (
    ki()("SessionRunnerModel.UnsupportedApiError", { providerID: Kp, modelID: WL, api: re })
  ) {
    get message() {
      return `Unsupported API for ${this.providerID}/${this.modelID}: ${this.api}`;
    }
  };
  Jqe = class Jqe extends _i()("@opencode/v2/SessionRunnerModel") {};
  ((Cda = Es(
    Jqe,
    ft(function* () {
      let e = yield* MV,
        t = yield* QS;
      return Jqe.of({
        resolve: Ge("SessionRunnerModel.resolve")(function* (r) {
          let s = r.model ? void 0 : yield* e.model.default(),
            a = r.model
              ? (yield* e.model.available()).find(
                  (f) => f.providerID === r.model?.providerID && f.id === r.model.id,
                )
              : s && _Di(s)
                ? s
                : (yield* e.model.available()).find(_Di);
          if (!a && r.model) return yield* new LDi({ providerID: r.model.providerID, modelID: r.model.id });
          if (!a) return yield* new hDi({ sessionID: r.id });
          let H = yield* e.provider.get(a.providerID),
            u = yield* t.connection.active(H?.integrationID ?? DV.make(a.providerID));
          return yield* Pda(r, a, u ? yield* t.connection.resolve(u) : void 0);
        }),
      });
    }),
  )),
    (EDi = Ua({ service: Jqe, layer: Cda, deps: [Lht, bWe] })));
});