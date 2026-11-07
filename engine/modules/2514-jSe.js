
var jSe = Ie(function (Uuc, lZn) {
  var rUo = Cur(),
    nUo = cr("events"),
    iUo = (e) =>
      e &&
      e instanceof nUo &&
      (typeof e.pipe === "function" || (typeof e.write === "function" && typeof e.end === "function")),
    zme = Symbol("_head"),
    dN = Symbol("_tail"),
    wur = Symbol("_linkStreams"),
    kur = Symbol("_setHead"),
    Our = Symbol("_setTail"),
    HZn = Symbol("_onError"),
    cZn = Symbol("_onData"),
    Uur = Symbol("_onEnd"),
    AZn = Symbol("_onDrain"),
    hEt = Symbol("_streams");
  class uZn extends rUo {
    constructor(e, ...t) {
      if (iUo(e)) (t.unshift(e), (e = {}));
      super(e);
      if (((this[hEt] = []), t.length)) this.push(...t);
    }
    [wur](e) {
      return e.reduce((t, r) => (t.on("error", (s) => r.emit("error", s)), t.pipe(r), r));
    }
    push(...e) {
      if ((this[hEt].push(...e), this[dN])) e.unshift(this[dN]);
      let t = this[wur](e);
      if ((this[Our](t), !this[zme])) this[kur](e[0]);
    }
    unshift(...e) {
      if ((this[hEt].unshift(...e), this[zme])) e.push(this[zme]);
      let t = this[wur](e);
      if ((this[kur](e[0]), !this[dN])) this[Our](t);
    }
    destroy(e) {
      return (this[hEt].forEach((t) => typeof t.destroy === "function" && t.destroy()), super.destroy(e));
    }
    [Our](e) {
      ((this[dN] = e),
        e.on("error", (t) => this[HZn](e, t)),
        e.on("data", (t) => this[cZn](e, t)),
        e.on("end", () => this[Uur](e)),
        e.on("finish", () => this[Uur](e)));
    }
    [HZn](e, t) {
      if (e === this[dN]) this.emit("error", t);
    }
    [cZn](e, t) {
      if (e === this[dN]) super.write(t);
    }
    [Uur](e) {
      if (e === this[dN]) super.end();
    }
    pause() {
      return (super.pause(), this[dN] && this[dN].pause && this[dN].pause());
    }
    emit(e, ...t) {
      if (e === "resume" && this[dN] && this[dN].resume) this[dN].resume();
      return super.emit(e, ...t);
    }
    [kur](e) {
      ((this[zme] = e), e.on("drain", () => this[AZn](e)));
    }
    [AZn](e) {
      if (e === this[zme]) this.emit("drain");
    }
    write(e, t, r) {
      return this[zme].write(e, t, r) && (this.flowing || this.buffer.length === 0);
    }
    end(e, t, r) {
      return (this[zme].end(e, t, r), this);
    }
  }
  lZn.exports = uZn;
});