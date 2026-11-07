
class Zn {
  #t = [];
  #e = !1;
  #s;
  #i = -1;
  constructor(t = 128) {
    this.#s = t;
  }
  add({
    cmd: t,
    undo: e,
    post: s,
    mustExec: i,
    type: n = NaN,
    overwriteIfSameType: r = !1,
    keepUndo: a = !1,
  }) {
    if ((i && t(), this.#e)) return;
    const o = { cmd: t, undo: e, post: s, type: n };
    if (this.#i === -1) {
      (this.#t.length > 0 && (this.#t.length = 0), (this.#i = 0), this.#t.push(o));
      return;
    }
    if (r && this.#t[this.#i].type === n) {
      (a && (o.undo = this.#t[this.#i].undo), (this.#t[this.#i] = o));
      return;
    }
    const l = this.#i + 1;
    (l === this.#s ? this.#t.splice(0, 1) : ((this.#i = l), l < this.#t.length && this.#t.splice(l)),
      this.#t.push(o));
  }
  undo() {
    if (this.#i === -1) return;
    this.#e = !0;
    const { undo: t, post: e } = this.#t[this.#i];
    (t(), e?.(), (this.#e = !1), (this.#i -= 1));
  }
  redo() {
    if (this.#i < this.#t.length - 1) {
      ((this.#i += 1), (this.#e = !0));
      const { cmd: t, post: e } = this.#t[this.#i];
      (t(), e?.(), (this.#e = !1));
    }
  }
  hasSomethingToUndo() {
    return this.#i !== -1;
  }
  hasSomethingToRedo() {
    return this.#i < this.#t.length - 1;
  }
  cleanType(t) {
    if (this.#i !== -1) {
      for (let e = this.#i; e >= 0; e--)
        if (this.#t[e].type !== t) {
          (this.#t.splice(e + 1, this.#i - e), (this.#i = e));
          return;
        }
      ((this.#t.length = 0), (this.#i = -1));
    }
  }
  destroy() {
    this.#t = null;
  }
}