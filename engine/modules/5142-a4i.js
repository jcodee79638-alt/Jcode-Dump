
var a4i = ne(async () => {
  Gt();
  await jI();
  o4i = Ge("LLM.rootConversation")(function* (e, t) {
    let r = new Set(),
      s = e;
    while (r.size < 256) {
      if (!/^[A-Za-z0-9_-]{1,128}$/.test(s) || r.has(s))
        return yield* bn(
          Error("Jac Code could not resolve this conversation. Reopen the chat and try again."),
        );
      r.add(s);
      let a = yield* t(Ec.make(s)).pipe(
        Zo(() => Error("Jac Code could not resolve this conversation. Reopen the chat and try again.")),
      );
      if (!a.parentID) return s;
      s = a.parentID;
    }
    return yield* bn(Error("Jac Code could not resolve this conversation. Reopen the chat and try again."));
  });
});