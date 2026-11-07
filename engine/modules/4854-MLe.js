
class MLe {
  constructor() {
    (lTr.add(this),
      (this.controller = new AbortController()),
      $Pt.set(this, void 0),
      gPt.set(this, () => {}),
      TKe.set(this, () => {}),
      vKe.set(this, void 0),
      EPt.set(this, () => {}),
      bKe.set(this, () => {}),
      Oee.set(this, {}),
      jKe.set(this, !1),
      IPt.set(this, !1),
      DPt.set(this, !1),
      zPe.set(this, !1),
      wu(
        this,
        $Pt,
        new Promise((e, t) => {
          (wu(this, gPt, e, "f"), wu(this, TKe, t, "f"));
        }),
        "f",
      ),
      wu(
        this,
        vKe,
        new Promise((e, t) => {
          (wu(this, EPt, e, "f"), wu(this, bKe, t, "f"));
        }),
        "f",
      ),
      us(this, $Pt, "f").catch(() => {}),
      us(this, vKe, "f").catch(() => {}));
  }
  _run(e) {
    setTimeout(() => {
      e().then(
        () => {
          (this._emitFinal(), this._emit("end"));
        },
        us(this, lTr, "m", GVi).bind(this),
      );
    }, 0);
  }
  _connected() {
    if (this.ended) return;
    (us(this, gPt, "f").call(this), this._emit("connect"));
  }
  get ended() {
    return us(this, jKe, "f");
  }
  get errored() {
    return us(this, IPt, "f");
  }
  get aborted() {
    return us(this, DPt, "f");
  }
  abort() {
    this.controller.abort();
  }
  on(e, t) {
    return ((us(this, Oee, "f")[e] || (us(this, Oee, "f")[e] = [])).push({ listener: t }), this);
  }
  off(e, t) {
    let r = us(this, Oee, "f")[e];
    if (!r) return this;
    let s = r.findIndex((a) => a.listener === t);
    if (s >= 0) r.splice(s, 1);
    return this;
  }
  once(e, t) {
    return ((us(this, Oee, "f")[e] || (us(this, Oee, "f")[e] = [])).push({ listener: t, once: !0 }), this);
  }
  emitted(e) {
    return new Promise((t, r) => {
      if ((wu(this, zPe, !0, "f"), e !== "error")) this.once("error", r);
      this.once(e, t);
    });
  }
  async done() {
    (wu(this, zPe, !0, "f"), await us(this, vKe, "f"));
  }
  _emit(e, ...t) {
    if (us(this, jKe, "f")) return;
    if (e === "end") (wu(this, jKe, !0, "f"), us(this, EPt, "f").call(this));
    let r = us(this, Oee, "f")[e];
    if (r) ((us(this, Oee, "f")[e] = r.filter((s) => !s.once)), r.forEach(({ listener: s }) => s(...t)));
    if (e === "abort") {
      let s = t[0];
      if (!us(this, zPe, "f") && !r?.length) Promise.reject(s);
      (us(this, TKe, "f").call(this, s), us(this, bKe, "f").call(this, s), this._emit("end"));
      return;
    }
    if (e === "error") {
      let s = t[0];
      if (!us(this, zPe, "f") && !r?.length) Promise.reject(s);
      (us(this, TKe, "f").call(this, s), us(this, bKe, "f").call(this, s), this._emit("end"));
    }
  }
  _emitFinal() {}
}