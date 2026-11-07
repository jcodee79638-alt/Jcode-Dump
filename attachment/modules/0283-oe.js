
class oe {
  static #t = { maxDim: 512, sigmaSFactor: 0.02, sigmaR: 25, kernelSize: 16 };
  static #e(t, e, s, i) {
    return ((s -= t), (i -= e), s === 0 ? (i > 0 ? 0 : 4) : s === 1 ? i + 6 : 2 - i);
  }
  static #s = new Int32Array([0, 1, -1, 1, -1, 0, -1, -1, 0, -1, 1, -1, 1, 0, 1, 1]);
  static #i(t, e, s, i, n, r, a) {
    const o = this.#e(s, i, n, r);
    for (let l = 0; l < 8; l++) {
      const h = (-l + o - a + 16) % 8,
        d = this.#s[2 * h],
        u = this.#s[2 * h + 1];
      if (t[(s + d) * e + (i + u)] !== 0) return h;
    }
    return -1;
  }
  static #n(t, e, s, i, n, r, a) {
    const o = this.#e(s, i, n, r);
    for (let l = 0; l < 8; l++) {
      const h = (l + o + a + 16) % 8,
        d = this.#s[2 * h],
        u = this.#s[2 * h + 1];
      if (t[(s + d) * e + (i + u)] !== 0) return h;
    }
    return -1;
  }
  static #a(t, e, s, i) {
    const n = t.length,
      r = new Int32Array(n);
    for (let h = 0; h < n; h++) r[h] = t[h] <= i ? 1 : 0;
    for (let h = 1; h < s - 1; h++) r[h * e] = r[h * e + e - 1] = 0;
    for (let h = 0; h < e; h++) r[h] = r[e * s - 1 - h] = 0;
    let a = 1,
      o;
    const l = [];
    for (let h = 1; h < s - 1; h++) {
      o = 1;
      for (let d = 1; d < e - 1; d++) {
        const u = h * e + d,
          f = r[u];
        if (f === 0) continue;
        let p = h,
          g = d;
        if (f === 1 && r[u - 1] === 0) ((a += 1), (g -= 1));
        else if (f >= 1 && r[u + 1] === 0) ((a += 1), (g += 1), f > 1 && (o = f));
        else {
          f !== 1 && (o = Math.abs(f));
          continue;
        }
        const m = [d, h],
          b = g === d + 1,
          y = { isHole: b, points: m, id: a, parent: 0 };
        l.push(y);
        let A;
        for (const C of l)
          if (C.id === o) {
            A = C;
            break;
          }
        A
          ? A.isHole
            ? (y.parent = b ? A.parent : o)
            : (y.parent = b ? o : A.parent)
          : (y.parent = b ? o : 0);
        const w = this.#i(r, e, h, d, p, g, 0);
        if (w === -1) {
          ((r[u] = -a), r[u] !== 1 && (o = Math.abs(r[u])));
          continue;
        }
        let v = this.#s[2 * w],
          S = this.#s[2 * w + 1];
        const x = h + v,
          _ = d + S;
        ((p = x), (g = _));
        let E = h,
          P = d;
        for (;;) {
          const C = this.#n(r, e, E, P, p, g, 1);
          ((v = this.#s[2 * C]), (S = this.#s[2 * C + 1]));
          const R = E + v,
            L = P + S;
          m.push(L, R);
          const O = E * e + P;
          if (
            (r[O + 1] === 0 ? (r[O] = -a) : r[O] === 1 && (r[O] = a),
            R === h && L === d && E === x && P === _)
          ) {
            r[u] !== 1 && (o = Math.abs(r[u]));
            break;
          } else ((p = E), (g = P), (E = R), (P = L));
        }
      }
    }
    return l;
  }
  static #r(t, e, s, i) {
    if (s - e <= 4) {
      for (let x = e; x < s - 2; x += 2) i.push(t[x], t[x + 1]);
      return;
    }
    const n = t[e],
      r = t[e + 1],
      a = t[s - 4] - n,
      o = t[s - 3] - r,
      l = Math.hypot(a, o),
      h = a / l,
      d = o / l,
      u = h * r - d * n,
      f = o / a,
      p = 1 / l,
      g = Math.atan(f),
      m = Math.cos(g),
      b = Math.sin(g),
      y = p * (Math.abs(m) + Math.abs(b)),
      A = p * (1 - y + y ** 2),
      w = Math.max(Math.atan(Math.abs(b + m) * A), Math.atan(Math.abs(b - m) * A));
    let v = 0,
      S = e;
    for (let x = e + 2; x < s - 2; x += 2) {
      const _ = Math.abs(u - h * t[x + 1] + d * t[x]);
      _ > v && ((S = x), (v = _));
    }
    v > (l * w) ** 2 ? (this.#r(t, e, S + 2, i), this.#r(t, S, s, i)) : i.push(n, r);
  }
  static #o(t) {
    const e = [],
      s = t.length;
    return (this.#r(t, 0, s, e), e.push(t[s - 2], t[s - 1]), e.length <= 4 ? null : e);
  }
  static #l(t, e, s, i, n, r) {
    const a = new Float32Array(r ** 2),
      o = -2 * i ** 2,
      l = r >> 1;
    for (let g = 0; g < r; g++) {
      const m = (g - l) ** 2;
      for (let b = 0; b < r; b++) a[g * r + b] = Math.exp((m + (b - l) ** 2) / o);
    }
    const h = new Float32Array(256),
      d = -2 * n ** 2;
    for (let g = 0; g < 256; g++) h[g] = Math.exp(g ** 2 / d);
    const u = t.length,
      f = new Uint8Array(u),
      p = new Uint32Array(256);
    for (let g = 0; g < s; g++)
      for (let m = 0; m < e; m++) {
        const b = g * e + m,
          y = t[b];
        let A = 0,
          w = 0;
        for (let S = 0; S < r; S++) {
          const x = g + S - l;
          if (!(x < 0 || x >= s))
            for (let _ = 0; _ < r; _++) {
              const E = m + _ - l;
              if (E < 0 || E >= e) continue;
              const P = t[x * e + E],
                C = a[S * r + _] * h[Math.abs(P - y)];
              ((A += P * C), (w += C));
            }
        }
        const v = (f[b] = Math.round(A / w));
        p[v]++;
      }
    return [f, p];
  }
  static #h(t) {
    const e = new Uint32Array(256);
    for (const s of t) e[s]++;
    return e;
  }
  static #u(t) {
    const e = t.length,
      s = new Uint8ClampedArray(e >> 2);
    let i = -1 / 0,
      n = 1 / 0;
    for (let a = 0, o = s.length; a < o; a++) {
      const l = (s[a] = t[a << 2]);
      ((i = Math.max(i, l)), (n = Math.min(n, l)));
    }
    const r = 255 / (i - n);
    for (let a = 0, o = s.length; a < o; a++) s[a] = (s[a] - n) * r;
    return s;
  }
  static #d(t) {
    let e,
      s = -1 / 0,
      i = -1 / 0;
    const n = t.findIndex((o) => o !== 0);
    let r = n,
      a = n;
    for (e = n; e < 256; e++) {
      const o = t[e];
      o > s && (e - r > i && ((i = e - r), (a = e - 1)), (s = o), (r = e));
    }
    for (e = a - 1; e >= 0 && !(t[e] > t[e + 1]); e--);
    return e;
  }
  static #f(t) {
    const e = t,
      { width: s, height: i } = t,
      { maxDim: n } = this.#t;
    let r = s,
      a = i;
    if (s > n || i > n) {
      let u = s,
        f = i,
        p = Math.log2(Math.max(s, i) / n);
      const g = Math.floor(p);
      p = p === g ? g - 1 : g;
      for (let b = 0; b < p; b++) {
        ((r = Math.ceil(u / 2)), (a = Math.ceil(f / 2)));
        const y = new OffscreenCanvas(r, a);
        (y.getContext("2d").drawImage(t, 0, 0, u, f, 0, 0, r, a),
          (u = r),
          (f = a),
          t !== e && t.close(),
          (t = y.transferToImageBitmap()));
      }
      const m = Math.min(n / r, n / a);
      ((r = Math.round(r * m)), (a = Math.round(a * m)));
    }
    const l = new OffscreenCanvas(r, a).getContext("2d", { willReadFrequently: !0 });
    ((l.fillStyle = "white"),
      l.fillRect(0, 0, r, a),
      (l.filter = "grayscale(1)"),
      l.drawImage(t, 0, 0, t.width, t.height, 0, 0, r, a));
    const h = l.getImageData(0, 0, r, a).data;
    return [this.#u(h), r, a];
  }
  static extractContoursFromText(t, { fontFamily: e, fontStyle: s, fontWeight: i }, n, r, a, o) {
    let l = new OffscreenCanvas(1, 1),
      h = l.getContext("2d", { alpha: !1 });
    const d = 200,
      u = (h.font = `${s} ${i} ${d}px ${e}`),
      {
        actualBoundingBoxLeft: f,
        actualBoundingBoxRight: p,
        actualBoundingBoxAscent: g,
        actualBoundingBoxDescent: m,
        fontBoundingBoxAscent: b,
        fontBoundingBoxDescent: y,
        width: A,
      } = h.measureText(t),
      w = 1.5,
      v = Math.ceil(Math.max(Math.abs(f) + Math.abs(p) || 0, A) * w),
      S = Math.ceil(Math.max(Math.abs(g) + Math.abs(m) || d, Math.abs(b) + Math.abs(y) || d) * w);
    ((l = new OffscreenCanvas(v, S)),
      (h = l.getContext("2d", { alpha: !0, willReadFrequently: !0 })),
      (h.font = u),
      (h.filter = "grayscale(1)"),
      (h.fillStyle = "white"),
      h.fillRect(0, 0, v, S),
      (h.fillStyle = "black"),
      h.fillText(t, (v * (w - 1)) / 2, (S * (3 - w)) / 2));
    const x = this.#u(h.getImageData(0, 0, v, S).data),
      _ = this.#h(x),
      E = this.#d(_),
      P = this.#a(x, v, S, E);
    return this.processDrawnLines({
      lines: { curves: P, width: v, height: S },
      pageWidth: n,
      pageHeight: r,
      rotation: a,
      innerMargin: o,
      mustSmooth: !0,
      areContours: !0,
    });
  }
  static process(t, e, s, i, n) {
    const [r, a, o] = this.#f(t),
      [l, h] = this.#l(r, a, o, Math.hypot(a, o) * this.#t.sigmaSFactor, this.#t.sigmaR, this.#t.kernelSize),
      d = this.#d(h),
      u = this.#a(l, a, o, d);
    return this.processDrawnLines({
      lines: { curves: u, width: a, height: o },
      pageWidth: e,
      pageHeight: s,
      rotation: i,
      innerMargin: n,
      mustSmooth: !0,
      areContours: !0,
    });
  }
  static processDrawnLines({
    lines: t,
    pageWidth: e,
    pageHeight: s,
    rotation: i,
    innerMargin: n,
    mustSmooth: r,
    areContours: a,
  }) {
    i % 180 !== 0 && ([e, s] = [s, e]);
    const { curves: o, width: l, height: h } = t,
      d = t.thickness ?? 0,
      u = [],
      f = Math.min(e / l, s / h),
      p = f / e,
      g = f / s,
      m = [];
    for (const { points: y } of o) {
      const A = r ? this.#o(y) : y;
      if (!A) continue;
      m.push(A);
      const w = A.length,
        v = new Float32Array(w),
        S = new Float32Array(3 * (w === 2 ? 2 : w - 2));
      if ((u.push({ line: S, points: v }), w === 2)) {
        ((v[0] = A[0] * p), (v[1] = A[1] * g), S.set([NaN, NaN, NaN, NaN, v[0], v[1]], 0));
        continue;
      }
      let [x, _, E, P] = A;
      ((x *= p), (_ *= g), (E *= p), (P *= g), v.set([x, _, E, P], 0), S.set([NaN, NaN, NaN, NaN, x, _], 0));
      for (let C = 4; C < w; C += 2) {
        const R = (v[C] = A[C] * p),
          L = (v[C + 1] = A[C + 1] * g);
        (S.set(M.createBezierPoints(x, _, E, P, R, L), (C - 2) * 3), ([x, _, E, P] = [E, P, R, L]));
      }
    }
    if (u.length === 0) return null;
    const b = a ? new Bs() : new De();
    return (
      b.build(u, e, s, 1, i, a ? 0 : d, n),
      { outline: b, newCurves: m, areContours: a, thickness: d, width: l, height: h }
    );
  }
  static async compressSignature({ outlines: t, areContours: e, thickness: s, width: i, height: n }) {
    let r = 1 / 0,
      a = -1 / 0,
      o = 0;
    for (const y of t) {
      o += y.length;
      for (let A = 2, w = y.length; A < w; A++) {
        const v = y[A] - y[A - 2];
        ((r = Math.min(r, v)), (a = Math.max(a, v)));
      }
    }
    let l;
    r >= -128 && a <= 127 ? (l = Int8Array) : r >= -32768 && a <= 32767 ? (l = Int16Array) : (l = Int32Array);
    const h = t.length,
      d = $e + Ae * h,
      u = new Uint32Array(d);
    let f = 0;
    ((u[f++] = d * Uint32Array.BYTES_PER_ELEMENT + (o - 2 * h) * l.BYTES_PER_ELEMENT),
      (u[f++] = 0),
      (u[f++] = i),
      (u[f++] = n),
      (u[f++] = e ? 0 : 1),
      (u[f++] = Math.max(0, Math.floor(s ?? 0))),
      (u[f++] = h),
      (u[f++] = l.BYTES_PER_ELEMENT));
    for (const y of t) ((u[f++] = y.length - 2), (u[f++] = y[0]), (u[f++] = y[1]));
    const p = new CompressionStream("deflate-raw"),
      g = p.writable.getWriter();
    (await g.ready, g.write(u));
    const m = l.prototype.constructor;
    for (const y of t) {
      const A = new m(y.length - 2);
      for (let w = 2, v = y.length; w < v; w++) A[w - 2] = y[w] - y[w - 2];
      g.write(A);
    }
    return (g.close(), (await new Response(p.readable).bytes()).toBase64());
  }
  static async decompressSignature(t) {
    try {
      const e = Uint8Array.fromBase64(t),
        { readable: s, writable: i } = new DecompressionStream("deflate-raw"),
        n = i.getWriter();
      (await n.ready,
        n
          .write(e)
          .then(async () => {
            (await n.ready, await n.close());
          })
          .catch(() => {}));
      let r = null,
        a = 0;
      for await (const A of s)
        ((r ||= new Uint8Array(new Uint32Array(A.buffer, 0, 4)[0])), r.set(A, a), (a += A.length));
      const o = new Uint32Array(r.buffer, 0, r.length >> 2),
        l = o[1];
      if (l !== 0) throw new Error(`Invalid version: ${l}`);
      const h = o[2],
        d = o[3],
        u = o[4] === 0,
        f = o[5],
        p = o[6],
        g = o[7],
        m = [],
        b = ($e + Ae * p) * Uint32Array.BYTES_PER_ELEMENT;
      let y;
      switch (g) {
        case Int8Array.BYTES_PER_ELEMENT:
          y = new Int8Array(r.buffer, b);
          break;
        case Int16Array.BYTES_PER_ELEMENT:
          y = new Int16Array(r.buffer, b);
          break;
        case Int32Array.BYTES_PER_ELEMENT:
          y = new Int32Array(r.buffer, b);
          break;
      }
      a = 0;
      for (let A = 0; A < p; A++) {
        const w = o[Ae * A + $e],
          v = new Float32Array(w + 2);
        m.push(v);
        for (let S = 0; S < Ae - 1; S++) v[S] = o[Ae * A + $e + S + 1];
        for (let S = 0; S < w; S++) v[S + 2] = v[S] + y[a++];
      }
      return { areContours: u, thickness: f, outlines: m, width: h, height: d };
    } catch (e) {
      return (H(`decompressSignature: ${e}`), null);
    }
  }
}