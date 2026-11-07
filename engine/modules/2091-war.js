
var war = ne(async () => {
  Gt();
  jA();
  zM();
  Mht();
  Nxe();
  await Jn([war(), e8(), Kv()]);
  ((wfo = kv(nsr)),
    (kfo = TD({
      id: "config-command",
      effect: Ge(function* (e) {
        let t = yield* ZM,
          r = yield* ui.Service;
        yield* e.command.transform(
          Ge(function* (s) {
            let a = yield* ja(yield* t.entries(), (H) => {
              if (H.type === "document") return Jt([{ commands: H.info.commands }]);
              return Ofo(r, H.path).pipe(
                Vn((u) => [{ commands: Object.fromEntries(u.map((f) => [f.name, f.info])) }]),
              );
            }).pipe(Vn((H) => H.flat()));
            for (let H of a)
              for (let [u, f] of Object.entries(H.commands ?? {}))
                s.update(u, (d) => {
                  if (((d.template = f.template), f.description !== void 0)) d.description = f.description;
                  if (f.agent !== void 0) d.agent = f.agent;
                  if (f.model !== void 0) {
                    let _ = mtr(f.model);
                    d.model = { id: _.modelID, providerID: _.providerID, variant: d.model?.variant };
                  }
                  if (f.variant !== void 0 && d.model !== void 0) d.model.variant = H3e.make(f.variant);
                  if (f.subtask !== void 0) d.subtask = f.subtask;
                });
          }),
        );
      }),
    })));
});