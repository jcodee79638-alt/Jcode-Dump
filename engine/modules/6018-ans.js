
var ans = ne(async () => {
  Gt();
  $H();
  Sx();
  await Jn([ET(), Jy()]);
  ons = Kd(eh, "permission", (e) =>
    ft(function* () {
      let t = yield* FB,
        r = Ge("PermissionHttpApi.list")(function* () {
          return yield* t.list();
        }),
        s = Ge("PermissionHttpApi.reply")(function* (a) {
          return (
            yield* t
              .reply({ requestID: a.params.requestID, reply: a.payload.reply, message: a.payload.message })
              .pipe(
                EA("Permission.NotFoundError", (H) =>
                  bn(
                    new ite({
                      requestID: String(H.requestID),
                      message: `Permission request not found: ${H.requestID}`,
                    }),
                  ),
                ),
              ),
            !0
          );
        });
      return e.handle("list", r).handle("reply", s);
    }),
  );
});