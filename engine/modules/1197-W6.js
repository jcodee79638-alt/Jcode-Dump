
function W6(e) {
  Object.assign(
    e.prototype,
    Bq({
      label: "DrizzleQuery",
      evaluate() {
        return this.execute();
      },
    }),
  );
}