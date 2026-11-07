
var Sis = ne(() => {
  Gt();
  Cf();
  xis = Cde(
    (e) =>
      ft(function* () {
        let t = yield* e,
          r = t.headers["access-control-allow-origin"];
        if (!r || r === "*") return t;
        let s = t.headers.vary;
        if (!s) return nse(t, "vary", "Origin");
        let a = s.split(",").map((H) => H.trim().toLowerCase());
        if (a.includes("origin") || a.includes("*")) return t;
        return nse(t, "vary", `${s}, Origin`);
      }),
    { global: !0 },
  );
});