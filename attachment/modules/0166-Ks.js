
class Ks {
  #t;
  constructor(t) {
    const [e, s = e, i = e] = t,
      { identityMap: n } = Ks;
    this.#t = [e || n, s || n, i || n];
  }
  static get identityMap() {
    return k(
      this,
      "identityMap",
      Uint8Array.from({ length: 256 }, (t, e) => e),
    );
  }
  applyToColor(t) {
    if (typeof t != "string" || !t.startsWith("#")) return t;
    const [e, s, i] = ge(t),
      [n, r, a] = this.#t;
    return T.makeHexColor(n[e], r[s], a[i]);
  }
  applyToImageData({ data: t }) {
    const [e, s, i] = this.#t;
    for (let n = 0, r = t.length; n < r; n += 4)
      ((t[n] = e[t[n]]), (t[n + 1] = s[t[n + 1]]), (t[n + 2] = i[t[n + 2]]));
  }
  applyToCanvas(t) {
    const { width: e, height: s } = t.canvas,
      i = t.getImageData(0, 0, e, s);
    (this.applyToImageData(i), t.putImageData(i, 0, 0));
  }
}