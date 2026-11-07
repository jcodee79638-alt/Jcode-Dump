
var S1 = ne(async () => {
  OH();
  Gt();
  nY();
  h2();
  ixe();
  nY();
  await Jn([S1(), fL(), qd(), r5(), _me(), lVe()]);
  ((UHo = [{ action: "*", resource: "*", effect: "deny" }]),
    (dVe = cde),
    (DQH = udn),
    (NHo = {
      sessionID: Nj.fields.sessionID,
      action: Nj.fields.action,
      resources: Nj.fields.resources,
      save: Nj.fields.save,
      metadata: Nj.fields.metadata,
      source: Nj.fields.source,
    }),
    (yQH = Nj),
    (FHo = ftr),
    (MQH = nt({ id: dVe.pipe(be), ...NHo, agent: US.pipe(be) }).annotate({
      identifier: "PermissionV2.AssertInput",
    })),
    (xQH = nt({ requestID: dVe, reply: FHo, message: re.pipe(be) }).annotate({
      identifier: "PermissionV2.ReplyInput",
    })),
    (SQH = nt({ id: dVe, effect: Hdt }).annotate({ identifier: "PermissionV2.AskResult" })),
    (n$t = ldn));
  fVe = class fVe extends ki()("PermissionV2.DeclinedError", {}) {};
  cvn = class cvn extends ki()("PermissionV2.CorrectedError", { feedback: re }) {};
  Avn = class Avn extends ki()("PermissionV2.BlockedError", { rules: i3e }) {};
  uvn = class uvn extends ki()("PermissionV2.NotFoundError", { requestID: dVe }) {};
  Cy = class Cy extends _i()("@opencode/v2/Permission") {};
  ((lvn = Es(
    Cy,
    ft(function* () {
      let e = yield* lL,
        t = yield* bm,
        r = yield* MG,
        s = yield* FY,
        a = yield* hme,
        H = new Map();
      yield* sL(() =>
        ja(H.values(), (q) => I6(q.deferred, new fVe()), { discard: !0 }).pipe(
          up(
            jn(() => {
              H.clear();
            }),
          ),
        ),
      );
      let u = ni(function* () {
          return (yield* a.list({ projectID: t.project.id })).map((q) => ({
            action: q.action,
            resource: q.resource,
            effect: "allow",
          }));
        }),
        f = Ge("PermissionV2.configured")(function* (q, Z) {
          let se = yield* s.get(q);
          if (!se) return yield* new uVe({ sessionID: q });
          return (yield* r.resolve(Z ?? se.agent))?.permissions ?? UHo;
        });
      function d(q, Z) {
        return q.resources.some((se) => pVe(q.action, se, Z).effect === "deny");
      }
      function _(q, Z) {
        return Z.filter((se) => XG(q.action, se.action));
      }
      let L = ni(function* (q) {
        let Z = yield* f(q.sessionID, q.agent);
        if (d(q, Z)) return { effect: "deny", rules: Z };
        let se = [...Z, ...(yield* u())],
          ae = q.resources.map((Ae) => pVe(q.action, Ae, se).effect);
        return { effect: ae.includes("deny") ? "deny" : ae.includes("ask") ? "ask" : "allow", rules: se };
      });
      function I(q) {
        return {
          id: q.id ?? dVe.create(),
          sessionID: q.sessionID,
          action: q.action,
          resources: q.resources,
          save: q.save,
          metadata: q.metadata,
          source: q.source,
        };
      }
      let D = (q, Z) =>
          BL(
            ft(function* () {
              let se = yield* bU(),
                ae = { request: q, agent: Z, deferred: se };
              if (H.has(q.id)) return yield* No(`Duplicate pending permission ID: ${q.id}`);
              return (
                H.set(q.id, ae),
                yield* e.publish(n$t.Asked, q).pipe(Mie(() => jn(() => H.delete(q.id)))),
                ae
              );
            }),
          ),
        S = Ge("PermissionV2.ask")(function* (q) {
          let Z = yield* L(q),
            se = I(q);
          if (Z.effect === "ask") yield* D(se, q.agent);
          return { id: se.id, effect: Z.effect };
        }),
        T = Ge("PermissionV2.assert")((q) =>
          q0((Z) =>
            ft(function* () {
              let se = yield* L(q);
              if (se.effect === "deny") return yield* new Avn({ rules: _(q, se.rules) });
              if (se.effect === "allow") return;
              let ae = yield* D(I(q), q.agent);
              return yield* Z(Fl(ae.deferred)).pipe(
                EA("PermissionV2.DeclinedError", (z) => No(z)),
                up(
                  jn(() => {
                    H.delete(ae.request.id);
                  }),
                ),
              );
            }),
          ),
        ),
        C = Ge("PermissionV2.reply")((q) =>
          BL(
            ft(function* () {
              let Z = H.get(q.requestID);
              if (!Z) return yield* new uvn({ requestID: q.requestID });
              if (
                (yield* e.publish(n$t.Replied, {
                  sessionID: Z.request.sessionID,
                  requestID: Z.request.id,
                  reply: q.reply,
                }),
                q.reply === "reject")
              ) {
                (yield* I6(Z.deferred, q.message ? new cvn({ feedback: q.message }) : new fVe()),
                  H.delete(q.requestID));
                for (let [ae, z] of H) {
                  if (z.request.sessionID !== Z.request.sessionID) continue;
                  (yield* e.publish(n$t.Replied, {
                    sessionID: z.request.sessionID,
                    requestID: z.request.id,
                    reply: "reject",
                  }),
                    yield* I6(z.deferred, new fVe()),
                    H.delete(ae));
                }
                return;
              }
              if (q.reply === "always" && Z.request.save?.length)
                yield* a.add({
                  projectID: t.project.id,
                  action: Z.request.action,
                  resources: Z.request.save,
                });
              if (
                (yield* D6(Z.deferred, void 0),
                H.delete(q.requestID),
                q.reply !== "always" || !Z.request.save?.length)
              )
                return;
              let se = yield* u();
              for (let [ae, z] of H) {
                let Ae = { ...z.request },
                  le = yield* f(z.request.sessionID, z.agent).pipe(
                    EA("Session.NotFoundError", () => Jt(void 0)),
                  );
                if (!le) continue;
                if (d(Ae, le)) continue;
                let Be = [...le, ...se];
                if (!z.request.resources.every((Te) => pVe(z.request.action, Te, Be).effect === "allow"))
                  continue;
                (yield* e.publish(n$t.Replied, {
                  sessionID: z.request.sessionID,
                  requestID: z.request.id,
                  reply: "always",
                }),
                  yield* D6(z.deferred, void 0),
                  H.delete(ae));
              }
            }),
          ),
        ),
        O = Ge("PermissionV2.list")(function* () {
          return Array.from(H.values(), (q) => q.request);
        }),
        B = Ge("PermissionV2.get")(function* (q) {
          return H.get(q)?.request;
        }),
        V = Ge("PermissionV2.forSession")(function* (q) {
          return Array.from(H.values(), (Z) => Z.request).filter((Z) => Z.sessionID === q);
        });
      return Cy.of({ ask: S, assert: T, reply: C, get: B, forSession: V, list: O });
    }),
  )),
    (TQH = lvn.pipe(Jm(hdn))),
    (aN = Ua({ service: Cy, layer: lvn, deps: [zS, KS, s3e, oVe, Hvn] })));
});