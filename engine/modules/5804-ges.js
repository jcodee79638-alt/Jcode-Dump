
var ges = ne(() => {
  NCr();
  Xy();
  Qwt();
  Qwt();
  Zwt();
  Gt();
  Cf();
  BCr = Es(
    nte,
    ft(function* () {
      let e = yield* UCr;
      if (!nnH(e)) return nte.of((t) => t);
      return nte.of((t) =>
        ft(function* () {
          let r = yield* Md;
          if (hes(new URL(r.url, "http://localhost"))) return yield* t;
          let s = yield* HnH(r);
          if (inH(s, e)) return yield* t;
          return (
            yield* wpt((a, H) => Jt(nse(H, "www-authenticate", anH))),
            yield* new eYe({ message: "Authentication required" })
          );
        }),
      );
    }),
  );
});