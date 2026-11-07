
class Xs {
  #t = !1;
  #e = null;
  #s = null;
  #i = new Map();
  onSetModified = null;
  onResetModified = null;
  onAnnotationEditor = null;
  getValue(t, e) {
    const s = this.#i.get(t);
    return s === void 0 ? e : Object.assign(e, s);
  }
  getRawValue(t) {
    return this.#i.get(t);
  }
  remove(t) {
    const e = this.#i.get(t);
    e !== void 0 &&
      (e instanceof D && this.#s.delete(e.annotationElementId),
      this.#i.delete(t),
      this.#i.size === 0 && this.resetModified(),
      !this.#i.values().some((s) => s instanceof D) && this.onAnnotationEditor?.(null));
  }
  setValue(t, e) {
    const s = this.#i.get(t);
    let i = !1;
    if (s !== void 0) for (const [n, r] of Object.entries(e)) s[n] !== r && ((i = !0), (s[n] = r));
    else ((i = !0), this.#i.set(t, e));
    (i && this.#n(),
      e instanceof D &&
        ((this.#s ||= new Map()).set(e.annotationElementId, e),
        this.onAnnotationEditor?.(e.constructor._type)));
  }
  has(t) {
    return this.#i.has(t);
  }
  get size() {
    return this.#i.size;
  }
  #n() {
    this.#t || ((this.#t = !0), this.onSetModified?.());
  }
  resetModified() {
    this.#t && ((this.#t = !1), this.onResetModified?.());
  }
  get print() {
    return new Ki(this);
  }
  get serializable() {
    if (this.#i.size === 0) return Te;
    const t = new Map(),
      e = new Ds(),
      s = [],
      i = Object.create(null);
    let n = !1;
    for (const [r, a] of this.#i) {
      const o = a instanceof D ? a.serialize(!1, i) : a;
      (a.page && ((a.pageIndex = a.page._pageIndex), delete a.page),
        o && (t.set(r, o), e.update(`${r}:${JSON.stringify(o)}`), (n ||= !!o.bitmap)));
    }
    if (n) for (const r of t.values()) r.bitmap && s.push(r.bitmap);
    return t.size > 0 ? { map: t, hash: e.hexdigest(), transfer: s } : Te;
  }
  get editorStats() {
    let t = null;
    const e = new Map();
    let s = 0,
      i = 0;
    for (const n of this.#i.values()) {
      if (!(n instanceof D)) {
        n.popup && (n.popup.deleted ? (i += 1) : (s += 1));
        continue;
      }
      n.isCommentDeleted ? (i += 1) : n.hasEditedComment && (s += 1);
      const r = n.telemetryFinalData;
      if (!r) continue;
      const { type: a } = r;
      (e.getOrInsertComputed(a, () => Object.getPrototypeOf(n).constructor), (t ||= Object.create(null)));
      const o = (t[a] ||= new Map());
      for (const [l, h] of Object.entries(r)) {
        if (l === "type") continue;
        const d = o.getOrInsertComputed(l, Gs);
        d.set(h, (d.get(h) ?? 0) + 1);
      }
    }
    if (((i > 0 || s > 0) && ((t ||= Object.create(null)), (t.comments = { deleted: i, edited: s })), !t))
      return null;
    for (const [n, r] of e) t[n] = r.computeTelemetryFinalData(t[n]);
    return t;
  }
  resetModifiedIds() {
    this.#e = null;
  }
  updateEditor(t, e) {
    const s = this.#s?.get(t);
    return s ? (s.updateFromAnnotationLayer(e), !0) : !1;
  }
  getEditor(t) {
    return this.#s?.get(t) || null;
  }
  get modifiedIds() {
    if (this.#e) return this.#e;
    const t = [];
    if (this.#s) for (const s of this.#s.values()) s.serialize() && t.push(s.annotationElementId);
    let e = "";
    if (t.length) {
      const s = new Ds();
      (s.update(t.join(",")), (e = s.hexdigest()));
    }
    return (this.#e = { ids: new Set(t), hash: e });
  }
  [Symbol.iterator]() {
    return this.#i.entries();
  }
}