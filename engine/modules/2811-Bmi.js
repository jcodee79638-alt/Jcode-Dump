
var Bmi = Ie(function (tLc, Fmi) {
  var Wea = cr("events");
  class Nmi extends Wea {
    constructor(e, t, r) {
      super();
      if (!e) throw Error("proggy: Tracker needs a name");
      if (typeof t === "number" && !r) ((r = t), (t = null));
      if (!r) r = 100;
      if (!t) t = e;
      ((this.done = !1), (this.name = e), (this.key = t), (this.value = 0), (this.total = r));
    }
    finish(e = {}) {
      this.update(this.total, this.total, e);
    }
    update(e, t, r) {
      if (!r)
        if (t && typeof t === "object") r = t;
        else r = {};
      if (typeof t !== "number") t = this.total;
      if (this.done) {
        let a = `proggy: updating completed tracker: ${JSON.stringify(this.key)}`;
        throw Error(a);
      }
      ((this.value = e), (this.total = t));
      let s = this.value >= this.total;
      if (
        (process.emit("progress", this.key, {
          ...r,
          name: this.name,
          key: this.key,
          value: e,
          total: t,
          done: s,
        }),
        s)
      )
        ((this.done = !0), this.emit("done"));
    }
  }
  Fmi.exports = Nmi;
});