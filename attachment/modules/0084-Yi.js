
class Yi {
  #t;
  #e = !1;
  #s = null;
  #i;
  #n;
  #a;
  #r;
  #o;
  #l = !1;
  #h = null;
  #u;
  #d = new Set();
  #f = null;
  #g;
  #m = null;
  #c = 0;
  constructor({
    container: t,
    isPinchingDisabled: e = null,
    isPinchingStopped: s = null,
    onPinchStart: i = null,
    onPinching: n = null,
    onPinchEnd: r = null,
    onPanning: a = null,
    signal: o,
  }) {
    ((this.#t = t),
      (this.#s = s),
      (this.#i = e),
      (this.#n = i),
      (this.#a = n),
      (this.#r = r),
      (this.#o = a),
      (this.#g = new AbortController()),
      (this.#u = AbortSignal.any([o, this.#g.signal])),
      t.addEventListener("touchstart", this.#p.bind(this), { passive: !1, signal: this.#u }));
  }
  get MIN_TOUCH_DISTANCE_TO_PINCH() {
    return 35 / _t.pixelRatio;
  }
  get MIN_TOUCH_DISTANCE_TO_SCALE() {
    return 4 / _t.pixelRatio;
  }
  #p(t) {
    if (this.#i?.()) return;
    this.#y(t);
    const e = this.#d;
    for (const { identifier: s } of t.changedTouches) e.add(s);
    if (e.size === 1) {
      this.#b();
      return;
    }
    if (!this.#m) {
      this.#m = new AbortController();
      const s = AbortSignal.any([this.#u, this.#m.signal]),
        i = this.#t,
        n = { signal: s, capture: !1, passive: !1 };
      i.addEventListener("touchmove", this.#w.bind(this), n);
      const r = this.#x.bind(this);
      (i.addEventListener("touchend", r, n),
        i.addEventListener("touchcancel", r, n),
        (n.capture = !0),
        i.addEventListener("pointerdown", rt, n),
        i.addEventListener("pointermove", rt, n),
        i.addEventListener("pointercancel", mi, n),
        i.addEventListener("pointerup", mi, n),
        this.#n?.());
    }
    ((this.#l = ms(t)), this.#v(t));
  }
  #b() {
    if (this.#h) return;
    const t = (this.#h = new AbortController()),
      e = AbortSignal.any([this.#u, t.signal]),
      s = this.#t,
      i = { capture: !0, signal: e, passive: !1 },
      n = (r) => {
        r.pointerType === "touch" && (this.#h?.abort(), (this.#h = null));
      };
    (s.addEventListener(
      "pointerdown",
      (r) => {
        r.pointerType === "touch" && (rt(r), n(r));
      },
      i,
    ),
      s.addEventListener("pointerup", n, i),
      s.addEventListener("pointercancel", n, i));
  }
  #y(t) {
    const e = this.#d;
    if (e.size === 0) return;
    const s = (this.#d = new Set());
    for (const { identifier: i } of t.touches) e.has(i) && s.add(i);
  }
  #A(t) {
    const e = this.#d,
      s = [];
    for (const i of t.touches) e.has(i.identifier) && s.push(i);
    return s;
  }
  #v(t) {
    const e = this.#A(t);
    if (e.length !== 2 || this.#s?.()) {
      this.#f = null;
      return;
    }
    const [s, i] = e;
    this.#f = {
      touch0X: s.screenX,
      touch0Y: s.screenY,
      touch1X: i.screenX,
      touch1Y: i.screenY,
      panX: (s.clientX + i.clientX) / 2,
      panY: (s.clientY + i.clientY) / 2,
      screenPanX: (s.screenX + i.screenX) / 2,
      screenPanY: (s.screenY + i.screenY) / 2,
    };
  }
  #w(t) {
    if (!this.#f) return;
    const e = this.#A(t);
    if (e.length !== 2) return;
    const s = this.#l;
    if (((this.#l = ms(t)), !this.#l)) return;
    if (!s) {
      this.#v(t);
      return;
    }
    const [i, n] = e,
      { screenX: r, screenY: a } = i,
      { screenX: o, screenY: l } = n,
      h = this.#f,
      { touch0X: d, touch0Y: u, touch1X: f, touch1Y: p, panX: g, panY: m } = h,
      b = f - d,
      y = p - u,
      A = o - r,
      w = l - a,
      v = (i.clientX + n.clientX) / 2,
      S = (i.clientY + n.clientY) / 2;
    ((h.panX = v), (h.panY = S));
    const x = v - g,
      _ = S - m,
      E = (r + o) / 2,
      P = (a + l) / 2,
      C = Math.hypot(E - h.screenPanX, P - h.screenPanY);
    ((h.screenPanX = E), (h.screenPanY = P));
    const R = Math.hypot(A, w),
      L = Math.hypot(b, y),
      O = this.#e ? this.MIN_TOUCH_DISTANCE_TO_SCALE : this.MIN_TOUCH_DISTANCE_TO_PINCH + 2 * C;
    if (R < bi || L < bi || Math.abs(L - R) <= O) {
      (x || _) && this.#o?.(x, _);
      return;
    }
    ((h.touch0X = r), (h.touch0Y = a), (h.touch1X = o), (h.touch1Y = l));
    const W = Math.sign(R - L);
    if (!this.#e) {
      ((this.#e = !0), (this.#c = W), (x || _) && this.#o?.(x, _));
      return;
    }
    if (this.#c) {
      const I = this.#c;
      if (((this.#c = 0), W !== I && Math.abs(R - L) <= 2 * C)) {
        ((this.#e = !1), (x || _) && this.#o?.(x, _));
        return;
      }
    }
    this.#a?.([g, m], L, R, x, _);
  }
  #x(t) {
    if ((this.#y(t), this.#d.size >= 2)) {
      this.#v(t);
      return;
    }
    const e = !!this.#f;
    (this.#_(), this.#d.size === 1 && this.#b(), e && ms(t));
  }
  #_() {
    ((this.#f = null),
      (this.#e = !1),
      (this.#c = 0),
      (this.#l = !1),
      this.#m && (this.#m.abort(), (this.#m = null), this.#r?.()));
  }
  destroy() {
    (this.#_(), this.#d.clear(), this.#g?.abort(), (this.#g = null), this.#h?.abort(), (this.#h = null));
  }
}