
var mwr = ne(() => {
  Gt();
  Cf();
  $H();
  Sx();
  lYe = class lYe extends CZ()("@opencode/HttpApiSchemaError", { error: Bwe }) {};
  dwr = RSi(lYe, (e, t) => {
    let r = NsH(e.cause.message),
      s = t.endpoint.path.startsWith("/api/")
        ? bn(new Bwe({ message: r, kind: e.kind }))
        : Jt(ow({ name: "BadRequest", data: { message: r, kind: e.kind } }, { status: 400 }));
    return lp("schema rejection", { kind: e.kind, reason: r }).pipe(Zu(s));
  });
});