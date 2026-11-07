
function Fya(e, t) {
  return new Nya({
    type: "default",
    innerType: e,
    get defaultValue() {
      return typeof t === "function" ? t() : z0r(t);
    },
  });
}