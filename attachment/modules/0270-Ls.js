
class Ls {
  #t;
  #e;
  #s;
  #i = [];
  #n = [];
  constructor(t, e = 0, s = 0, i = !0) {
    const n = Lt.slice(),
      r = 10 ** -4;
    for (const { x: g, y: m, width: b, height: y } of t) {
      const A = Math.floor((g - e) / r) * r,
        w = Math.ceil((g + b + e) / r) * r,
        v = Math.floor((m - e) / r) * r,
        S = Math.ceil((m + y + e) / r) * r,
        x = [A, v, S, !0],
        _ = [w, v, S, !1];
      (this.#i.push(x, _), T.rectBoundingBox(A, v, w, S, n));
    }
    const a = n[2] - n[0] + 2 * s,
      o = n[3] - n[1] + 2 * s,
      l = n[0] - s,
      h = n[1] - s;
    let d = i ? -1 / 0 : 1 / 0,
      u = 1 / 0;
    const f = this.#i.at(i ? -1 : -2),
      p = [f[0], f[2]];
    for (const g of this.#i) {
      const [m, b, y, A] = g;
      (!A && i
        ? b < u
          ? ((u = b), (d = m))
          : b === u && (d = Math.max(d, m))
        : A && !i && (b < u ? ((u = b), (d = m)) : b === u && (d = Math.min(d, m))),
        (g[0] = (m - l) / a),
        (g[1] = (b - h) / o),
        (g[2] = (y - h) / o));
    }
    ((this.#t = new Float32Array([l, h, a, o])), (this.#e = [d, u]), (this.#s = p));
  }
  getOutlines() {
    this.#i.sort((e, s) => e[0] - s[0] || e[1] - s[1] || e[2] - s[2]);
    const t = [];
    for (const e of this.#i) e[3] ? (t.push(...this.#h(e)), this.#o(e)) : (this.#l(e), t.push(...this.#h(e)));
    return this.#a(t);
  }
  #a(t) {
    const e = [],
      s = new Set();
    for (const n of t) {
      const [r, a, o] = n;
      e.push([r, a, n], [r, o, n]);
    }
    e.sort((n, r) => n[1] - r[1] || n[0] - r[0]);
    for (let n = 0, r = e.length; n < r; n += 2) {
      const a = e[n][2],
        o = e[n + 1][2];
      (a.push(o), o.push(a), s.add(a), s.add(o));
    }
    const i = [];
    for (; s.size > 0;) {
      const n = s.values().next().value;
      let [r, a, o, l, h] = n;
      s.delete(n);
      let d = r,
        u = a;
      const f = [r, o];
      for (i.push(f); ;) {
        let p;
        if (s.has(l)) p = l;
        else if (s.has(h)) p = h;
        else break;
        (s.delete(p),
          ([r, a, o, l, h] = p),
          d !== r && (f.push(d, u, r, u === a ? a : o), (d = r)),
          (u = u === a ? o : a));
      }
      f.push(d, u);
    }
    return new Ns(i, this.#t, this.#e, this.#s);
  }
  #r(t) {
    const e = this.#n;
    let s = 0,
      i = e.length - 1;
    for (; s <= i;) {
      const n = (s + i) >> 1,
        r = e[n][0];
      if (r === t) return n;
      r < t ? (s = n + 1) : (i = n - 1);
    }
    return i + 1;
  }
  #o([, t, e]) {
    const s = this.#r(t);
    this.#n.splice(s, 0, [t, e]);
  }
  #l([, t, e]) {
    const s = this.#r(t);
    for (let i = s; i < this.#n.length; i++) {
      const [n, r] = this.#n[i];
      if (n !== t) break;
      if (n === t && r === e) {
        this.#n.splice(i, 1);
        return;
      }
    }
    for (let i = s - 1; i >= 0; i--) {
      const [n, r] = this.#n[i];
      if (n !== t) break;
      if (n === t && r === e) {
        this.#n.splice(i, 1);
        return;
      }
    }
  }
  #h(t) {
    const [e, s, i] = t,
      n = [[e, s, i]],
      r = this.#r(i);
    for (let a = 0; a < r; a++) {
      const [o, l] = this.#n[a];
      for (let h = 0, d = n.length; h < d; h++) {
        const [, u, f] = n[h];
        if (!(l <= u || f <= o)) {
          if (u >= o) {
            if (f > l) n[h][1] = l;
            else {
              if (d === 1) return [];
              (n.splice(h, 1), h--, d--);
            }
            continue;
          }
          ((n[h][2] = o), f > l && n.push([e, l, f]));
        }
      }
    }
    return n;
  }
}