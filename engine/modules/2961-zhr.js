
var zhr = ne(async () => {
  Gt();
  await Jn([zhr(), e8()]);
  rua = TD({
    id: "variant",
    effect: Ge(function* (e) {
      yield* e.catalog.transform((t) => {
        for (let r of t.provider.list())
          for (let s of r.models.values())
            t.model.update(s.providerID, s.id, (a) => {
              let H = nua(a);
              if (H.length === 0) return;
              let u = new Map(a.variants.map((d) => [d.id, d])),
                f = new Set(H.map((d) => d.id));
              a.variants = [...H.map((d) => u.get(d.id) ?? d), ...a.variants.filter((d) => !f.has(d.id))];
            });
      });
    }),
  });
});