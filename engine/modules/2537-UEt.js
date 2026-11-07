
var UEt = Ie(function (elc, Uei) {
  var X9o = Cur(),
    Cei = Symbol("_flush"),
    wei = Symbol("_flushed"),
    kei = Symbol("_flushing");
  class Oei extends X9o {
    constructor(e = {}) {
      if (typeof e === "function") e = { flush: e };
      super(e);
      if (typeof e.flush !== "function" && typeof this.flush !== "function")
        throw TypeError("must provide flush function in options");
      this[Cei] = e.flush || this.flush;
    }
    emit(e, ...t) {
      if ((e !== "end" && e !== "finish") || this[wei]) return super.emit(e, ...t);
      if (this[kei]) return;
      this[kei] = !0;
      let r = (a) => {
          ((this[wei] = !0), a ? super.emit("error", a) : super.emit("end"));
        },
        s = this[Cei](r);
      if (s && s.then)
        s.then(
          () => r(),
          (a) => r(a),
        );
    }
  }
  Uei.exports = Oei;
});