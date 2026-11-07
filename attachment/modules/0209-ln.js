
class ln {
  #t = new Map();
  get(t, e = null) {
    if (e) {
      const i = this.#t.getOrInsertComputed(t, Ni);
      return (i.promise.then(() => e(i.data)), null);
    }
    const s = this.#t.get(t);
    if (!s || s.data === ae) throw new Error(`Requesting object that isn't resolved yet ${t}.`);
    return s.data;
  }
  has(t) {
    const e = this.#t.get(t);
    return !!e && e.data !== ae;
  }
  delete(t) {
    const e = this.#t.get(t);
    return !e || e.data === ae ? !1 : (this.#t.delete(t), !0);
  }
  resolve(t, e = null) {
    const s = this.#t.getOrInsertComputed(t, Ni);
    if (s.data !== ae) throw new Error(`Object already resolved ${t}.`);
    ((s.data = e), s.resolve());
  }
  clear() {
    for (const { data: t } of this.#t.values()) t?.bitmap?.close();
    this.#t.clear();
  }
  *[Symbol.iterator]() {
    for (const [t, { data: e }] of this.#t) e !== ae && (yield [t, e]);
  }
}