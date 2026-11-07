
var lVe = ne(async () => {
  Ef();
  Gt();
  OH();
  ovn();
  t$t();
  await Jn([lVe(), qL(), JS()]);
  ((kHo = Xor),
    (uQH = avn),
    (lQH = nt({ projectID: z_.pipe(be) }).annotate({ identifier: "PermissionSaved.ListInput" })),
    (fQH = nt({ projectID: z_, action: re, resources: On(re) }).annotate({
      identifier: "PermissionSaved.AddInput",
    })));
  hme = class hme extends _i()("@opencode/v2/PermissionSaved") {};
  ((OHo = Es(
    hme,
    ft(function* () {
      let { db: e } = yield* Vd,
        t = Ge("PermissionSaved.list")(function* (a) {
          return (yield* e
            .select()
            .from(vxe)
            .where(a?.projectID ? Pi(vxe.project_id, a.projectID) : void 0)
            .all()
            .pipe(on)).map((u) => ({
            id: u.id,
            projectID: u.project_id,
            action: u.action,
            resource: u.resource,
          }));
        }),
        r = Ge("PermissionSaved.add")(function* (a) {
          if (!a.resources.length) return;
          yield* e
            .insert(vxe)
            .values(
              a.resources.map((H) => ({
                id: kHo.create(),
                project_id: a.projectID,
                action: a.action,
                resource: H,
              })),
            )
            .onConflictDoNothing()
            .run()
            .pipe(on);
        }),
        s = Ge("PermissionSaved.remove")(function* (a) {
          yield* e.delete(vxe).where(Pi(vxe.id, a)).run().pipe(on);
        });
      return hme.of({ list: t, add: r, remove: s });
    }),
  )),
    (Hvn = iA({ service: hme, layer: OHo, deps: [DD] })));
});