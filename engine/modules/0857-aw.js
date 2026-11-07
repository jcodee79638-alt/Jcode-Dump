
var aw = ne(() => {
  Gt();
  Hu();
  gf = re.check(k6("ses")).pipe(
    Jl("SessionID"),
    Bl((e) => {
      let t = () => e.make("ses_" + Opn());
      return { create: t, descending: (r) => (r === void 0 ? t() : e.make(r)) };
    }),
  );
});