
var Bhr = ne(async () => {
  Gt();
  zM();
  await Jn([Bhr(), e8(), Kv()]);
  TAa = TD({
    id: "config-provider",
    effect: Ge(function* (e) {
      let t = yield* ZM;
      (yield* e.integration.transform(
        Ge(function* (r) {
          let s = (yield* t.entries()).filter((H) => H.type === "document"),
            a = new Set(
              s.flatMap((H) =>
                Object.entries(H.info.providers ?? {}).flatMap(([u, f]) => (f.env === void 0 ? [] : [u])),
              ),
            );
          for (let H of s)
            for (let [u, f] of Object.entries(H.info.providers ?? {})) {
              let d = u;
              if (!a.has(u) && !r.get(d)) continue;
              if (
                (r.update(d, (_) => {
                  _.name = f.name ?? _.name;
                }),
                f.env !== void 0)
              )
                r.method.update({ integrationID: d, method: { type: "env", names: [...f.env] } });
            }
        }),
      ),
        yield* e.catalog.transform(
          Ge(function* (r) {
            let s = yield* t.entries(),
              a = s.filter((u) => u.type === "document"),
              H = Uht(s, "model");
            if (H !== void 0) {
              let u = mtr(H);
              r.model.default.set(u.providerID, u.modelID);
            }
            for (let u of a)
              for (let [f, d] of Object.entries(u.info.providers ?? {})) {
                let _ = f;
                r.provider.update(_, (L) => {
                  if (d.name !== void 0) L.name = d.name;
                  if (d.api !== void 0) L.api = { ...d.api };
                  if (d.request !== void 0)
                    (Object.assign(L.request.headers, d.request.headers),
                      Object.assign(L.request.body, d.request.body));
                });
                for (let [L, I] of Object.entries(d.models ?? {}))
                  r.model.update(_, L, (D) => {
                    if (I.family !== void 0) D.family = I.family;
                    if (I.name !== void 0) D.name = I.name;
                    if (I.api !== void 0) D.api = { ...D.api, ...I.api };
                    if (I.capabilities !== void 0)
                      D.capabilities = {
                        tools: I.capabilities.tools,
                        input: [...I.capabilities.input],
                        output: [...I.capabilities.output],
                      };
                    if (I.request !== void 0) {
                      if (
                        (Object.assign(D.request.headers, I.request.headers),
                        Object.assign(D.request.body, I.request.body),
                        I.request.variant !== void 0)
                      )
                        D.request.variant = I.request.variant;
                    }
                    if (I.variants !== void 0)
                      for (let S of I.variants) {
                        let T = D.variants.find((C) => C.id === S.id);
                        if (!T) ((T = { id: S.id, headers: {}, body: {} }), D.variants.push(T));
                        (Object.assign(T.headers, S.headers), Object.assign(T.body, S.body));
                      }
                    if (I.cost !== void 0)
                      D.cost = (Array.isArray(I.cost) ? I.cost : [I.cost]).map((S) => ({
                        tier: S.tier && { ...S.tier },
                        input: S.input,
                        output: S.output,
                        cache: { read: S.cache?.read ?? 0, write: S.cache?.write ?? 0 },
                      }));
                    if (I.disabled !== void 0) D.enabled = !I.disabled;
                    if (I.limit !== void 0) D.limit = { ...D.limit, ...I.limit };
                  });
              }
          }),
        ));
    }),
  });
});
import rMt from "path";