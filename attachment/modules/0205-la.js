
class la {
  #t = !1;
  #e = !1;
  #s = !1;
  #i = !0;
  constructor(t, { name: e, intent: s, usage: i, rbGroups: n }) {
    ((this.#t = !!(t & pt.DISPLAY)),
      (this.#e = !!(t & pt.PRINT)),
      (this.name = e),
      (this.intent = s),
      (this.usage = i),
      (this.rbGroups = n));
  }
  get visible() {
    if (this.#s) return this.#i;
    if (!this.#i) return !1;
    const { print: t, view: e } = this.usage;
    return this.#t ? e?.viewState !== "OFF" : this.#e ? t?.printState !== "OFF" : !0;
  }
  _setVisible(t, e, s = !1) {
    (t !== Xt && $("Internal method `_setVisible` called."), (this.#s = s), (this.#i = e));
  }
  get serializable() {
    return { userSet: this.#s, visible: this.#i };
  }
}