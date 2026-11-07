
var nye = ne(() => {
  tie = class tie {
    called = !1;
    self;
    constructor(e) {
      this.self = e;
    }
    next(e) {
      return this.called ? { value: e, done: !0 } : ((this.called = !0), { value: this.self, done: !1 });
    }
    [Symbol.iterator]() {
      return new tie(this.self);
    }
  };
  I$ = HOs();
});