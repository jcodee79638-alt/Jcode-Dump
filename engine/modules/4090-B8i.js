
var B8i = () => (e, t) => {
  class r extends _i()(e) {
    static configLayer(s) {
      return bf(this, this.of(s));
    }
    static get layer() {
      let s = this;
      return Es(
        s,
        ft(function* () {
          let a = yield* Xpe(t);
          return s.of(a);
        }),
      );
    }
  }
  return r;
};