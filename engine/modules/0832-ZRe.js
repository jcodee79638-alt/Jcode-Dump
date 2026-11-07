
var ZRe = ne(() => {
  Gt();
  Hu();
  tY = re.check(k6("wrk")).pipe(
    Jl("WorkspaceV2.ID"),
    Bl((e) => {
      let t = () => e.make("wrk_" + t0());
      return {
        ascending: (r) => {
          if (!r) return t();
          if (!r.startsWith("wrk")) throw Error(`ID ${r} does not start with wrk`);
          return e.make(r);
        },
        create: t,
      };
    }),
  );
});