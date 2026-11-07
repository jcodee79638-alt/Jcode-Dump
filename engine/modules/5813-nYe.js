
var nYe = () => new Fv(1001, "server closing"),
  Fwe,
  fnH,
  pnH,
  Ses = (e) =>
    ft(function* () {
      let t = yield* x6(Fwe);
      if (vl(t)) return !0;
      if (!(yield* t.value.add(e))) return !1;
      return (yield* sL(() => t.value.remove(e)), !0);
    });