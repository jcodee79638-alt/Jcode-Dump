
var BTi = Ie(function (FTi) {
  Object.defineProperty(FTi, "__esModule", { value: !0 });
  FTi.default = (e) =>
    Object.keys(e)
      .filter((t) => !t.includes("binary"))
      .reduce((t, r) => Object.assign(t, { [r]: e[r] }), {});
});