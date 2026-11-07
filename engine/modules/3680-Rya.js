
function Rya(e, t) {
  return new Bya({
    type: "prefault",
    innerType: e,
    get defaultValue() {
      return typeof t === "function" ? t() : z0r(t);
    },
  });
}