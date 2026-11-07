
class qs {
  #t = null;
  #e = new Map();
  #s = null;
  #i = null;
  #n;
  creator = null;
  name = null;
  constructor(t, e = pt.DISPLAY, s = null) {
    if (((this.#n = t), (this.renderingIntent = e), t !== null)) {
      ((this.name = t.name), (this.creator = t.creator), (this.#i = t.order));
      for (const i of t.groups) this.#e.set(i.id, new la(e, i));
      if (s) {
        s.size !== this.#e.size && $("Incorrect serialized groupState.");
        for (const [i, n] of s) this.#e.get(i)._setVisible(Xt, n.visible, n.userSet);
      } else {
        if (t.baseState === "OFF") for (const i of this.#e.values()) i._setVisible(Xt, !1);
        for (const i of t.on) this.#e.get(i)._setVisible(Xt, !0);
        for (const i of t.off) this.#e.get(i)._setVisible(Xt, !1);
      }
      this.#s = this.getHash();
    }
  }
  #a(t) {
    const e = t.length;
    if (e < 2) return !0;
    const s = t[0];
    for (let i = 1; i < e; i++) {
      const n = t[i];
      let r;
      if (Array.isArray(n)) r = this.#a(n);
      else if (this.#e.has(n)) r = this.#e.get(n).visible;
      else return (H(`Optional content group not found: ${n}`), !0);
      switch (s) {
        case "And":
          if (!r) return !1;
          break;
        case "Or":
          if (r) return !0;
          break;
        case "Not":
          return !r;
        default:
          return !0;
      }
    }
    return s === "And";
  }
  isVisible(t) {
    if (this.#e.size === 0) return !0;
    if (!t) return (ts("Optional content group not defined."), !0);
    if (t.type === "OCG")
      return this.#e.has(t.id)
        ? this.#e.get(t.id).visible
        : (H(`Optional content group not found: ${t.id}`), !0);
    if (t.type === "OCMD") {
      if (t.expression) return this.#a(t.expression);
      if (!t.policy || t.policy === "AnyOn") {
        for (const e of t.ids) {
          if (!this.#e.has(e)) return (H(`Optional content group not found: ${e}`), !0);
          if (this.#e.get(e).visible) return !0;
        }
        return !1;
      } else if (t.policy === "AllOn") {
        for (const e of t.ids) {
          if (!this.#e.has(e)) return (H(`Optional content group not found: ${e}`), !0);
          if (!this.#e.get(e).visible) return !1;
        }
        return !0;
      } else if (t.policy === "AnyOff") {
        for (const e of t.ids) {
          if (!this.#e.has(e)) return (H(`Optional content group not found: ${e}`), !0);
          if (!this.#e.get(e).visible) return !0;
        }
        return !1;
      } else if (t.policy === "AllOff") {
        for (const e of t.ids) {
          if (!this.#e.has(e)) return (H(`Optional content group not found: ${e}`), !0);
          if (this.#e.get(e).visible) return !1;
        }
        return !0;
      }
      return (H(`Unknown optional content policy ${t.policy}.`), !0);
    }
    return (H(`Unknown group type ${t.type}.`), !0);
  }
  setVisibility(t, e = !0, s = !0) {
    const i = this.#e.get(t);
    if (!i) {
      H(`Optional content group not found: ${t}`);
      return;
    }
    if (s && e && i.rbGroups.length)
      for (const n of i.rbGroups) for (const r of n) r !== t && this.#e.get(r)?._setVisible(Xt, !1, !0);
    (i._setVisible(Xt, !!e, !0), (this.#t = null));
  }
  setOCGState({ state: t, preserveRB: e }) {
    let s;
    for (const i of t) {
      switch (i) {
        case "ON":
        case "OFF":
        case "Toggle":
          s = i;
          continue;
      }
      const n = this.#e.get(i);
      if (n)
        switch (s) {
          case "ON":
            this.setVisibility(i, !0, e);
            break;
          case "OFF":
            this.setVisibility(i, !1, e);
            break;
          case "Toggle":
            this.setVisibility(i, !n.visible, e);
            break;
        }
    }
    this.#t = null;
  }
  get hasInitialVisibility() {
    return this.#s === null || this.getHash() === this.#s;
  }
  getOrder() {
    return this.#e.size ? (this.#i ? this.#i.slice() : [...this.#e.keys()]) : null;
  }
  getGroup(t) {
    return this.#e.get(t) || null;
  }
  getHash() {
    if (this.#t !== null) return this.#t;
    const t = new Ds();
    for (const [e, s] of this.#e) t.update(`${e}:${s.visible}`);
    return (this.#t = t.hexdigest());
  }
  [Symbol.iterator]() {
    return this.#e.entries();
  }
  get serializable() {
    const t = new Map();
    for (const [e, s] of this.#e) t.set(e, s.serializable);
    return { data: this.#n, renderingIntent: this.renderingIntent, groupState: t };
  }
  static fromSerializable({ data: t, renderingIntent: e, groupState: s }) {
    return new qs(t, e, s);
  }
}