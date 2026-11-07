
function D0i(e) {
  return Ohr({
    id: e.id,
    effect: (t) =>
      ft(function* () {
        let r = yield* $f,
          s = yield* Qg(),
          a = (d) => Sie(s)($I(r)(d)).then((_) => ({ dispose: () => Sie(s)(_.dispose) })),
          H = (d) => Sie(s)(d),
          u = (d) => (_) => a(d.transform((L) => nA(() => Promise.resolve(_(L))))),
          f = {
            options: t.options,
            agent: { transform: u(t.agent), reload: () => H(t.agent.reload()) },
            aisdk: {
              sdk: (d) => a(t.aisdk.sdk((_) => nA(() => Promise.resolve(d(_))))),
              language: (d) => a(t.aisdk.language((_) => nA(() => Promise.resolve(d(_))))),
            },
            catalog: { transform: u(t.catalog), reload: () => H(t.catalog.reload()) },
            command: { transform: u(t.command), reload: () => H(t.command.reload()) },
            integration: {
              transform: u(t.integration),
              reload: () => H(t.integration.reload()),
              connection: {
                active: (d) => Sie(s)(t.integration.connection.active(d)),
                resolve: (d) => Sie(s)(t.integration.connection.resolve(d)),
              },
            },
            plugin: {
              add: (d) => {
                let _ = D0i(d);
                return H(t.plugin.add(_));
              },
              remove: (d) => H(t.plugin.remove(d)),
            },
            reference: { transform: u(t.reference), reload: () => H(t.reference.reload()) },
            skill: { transform: u(t.skill), reload: () => H(t.skill.reload()) },
          };
        yield* nA(() => Promise.resolve(e.setup(f)));
      }),
  });
}