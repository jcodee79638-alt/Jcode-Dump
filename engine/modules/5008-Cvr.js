
var Cvr = ne(() => {
  Eze = class Eze extends Ni {
    run(e, t) {
      return this._client.post("/fine_tuning/alpha/graders/run", {
        body: e,
        ...t,
        __security: { bearerAuth: !0 },
      });
    }
    validate(e, t) {
      return this._client.post("/fine_tuning/alpha/graders/validate", {
        body: e,
        ...t,
        __security: { bearerAuth: !0 },
      });
    }
  };
});