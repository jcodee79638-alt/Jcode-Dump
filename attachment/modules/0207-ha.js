
class ha {
  #t = null;
  #e = null;
  #s = 0;
  #i = null;
  #n = null;
  get pagesNumber() {
    return this.#s;
  }
  set pagesNumber(t) {
    this.#s !== t && ((this.#s = t), (this.#t = null), (this.#e = null));
  }
  #a() {
    if (this.#t) return;
    const t = this.#s,
      e = (this.#t = new Uint32Array(t));
    for (let s = 0; s < t; s++) e[s] = s + 1;
    this.#e = new Int32Array(e);
  }
  #r() {
    const t = new Map(),
      e = this.#t;
    for (let s = 0, i = this.#s; s < i; s++) {
      const n = e[s],
        r = t.get(n);
      r ? r.push(s + 1) : t.set(n, [s + 1]);
    }
    return t;
  }
  movePages(t, e, s) {
    this.#a();
    const i = this.#t,
      n = e.length,
      r = new Uint32Array(n);
    let a = 0;
    for (let u = 0; u < n; u++) {
      const f = e[u] - 1;
      ((r[u] = i[f]), f < s && a++);
    }
    const o = this.#s,
      l = o - n,
      h = new Int32Array(o),
      d = Y(s - a, 0, l);
    for (let u = 0, f = 0; u < o; u++) t.has(u + 1) || ((i[f] = i[u]), (h[f++] = u + 1));
    (i.copyWithin(d + n, d, l),
      i.set(r, d),
      h.copyWithin(d + n, d, l),
      h.set(e, d),
      (this.#e = h),
      i.every((u, f) => u === f + 1) && (this.#t = null));
  }
  deletePages(t) {
    this.#a();
    const e = this.#t,
      s = this.#r();
    this.#n = { pageNumberToId: e.slice(), pagesNumber: this.#s, prevPageNumbers: this.#e.slice() };
    const i = this.#s - t.length;
    this.#s = i;
    const n = (this.#t = new Uint32Array(i));
    this.#e = new Int32Array(i);
    let r = 0,
      a = 0;
    for (const o of t) {
      const l = o - 1;
      (l !== r && (n.set(e.subarray(r, l), a), (a += l - r)), (r = l + 1));
    }
    (r < e.length && n.set(e.subarray(r), a), this.#o(s, new Set(t)));
  }
  cancelDelete() {
    this.#n &&
      ((this.#t = this.#n.pageNumberToId),
      (this.#s = this.#n.pagesNumber),
      (this.#e = this.#n.prevPageNumbers),
      (this.#n = null));
  }
  cleanSavedData() {
    this.#n = null;
  }
  copyPages(t) {
    (this.#a(), (this.#i = { pageNumbers: t, pageIds: t.map((e) => this.#t[e - 1]) }));
  }
  cancelCopy() {
    this.#i = null;
  }
  pastePages(t) {
    this.#a();
    const e = this.#t,
      s = this.#r(),
      { pageNumbers: i, pageIds: n } = this.#i,
      r = this.#s + i.length;
    this.#s = r;
    const a = (this.#t = new Uint32Array(r));
    ((this.#e = new Int32Array(r)),
      a.set(e.subarray(0, t), 0),
      a.set(n, t),
      a.set(e.subarray(t), t + i.length),
      this.#o(s, null, t, i),
      (this.#i = null));
  }
  #o(t, e = null, s = -1, i = null) {
    const n = this.#e,
      r = this.#t,
      a = s + (i?.length ?? 0),
      o = new Map();
    for (let l = 0, h = this.#s; l < h; l++) {
      if (l >= s && l < a) {
        n[l] = -i[l - s];
        continue;
      }
      const d = r[l],
        u = t.get(d);
      let f = o.get(d) || 0;
      if (e && u) for (; f < u.length && e.has(u[f]);) f++;
      ((n[l] = u?.[f]), o.set(d, f + 1));
    }
  }
  hasBeenAltered() {
    return this.#t !== null;
  }
  #l(t = null) {
    if (!this.#t) return null;
    const e = new Int32Array(this.#s).fill(-1),
      s = new Map();
    if (t)
      for (const i of t) {
        const n = this.getPageId(i),
          r = s.get(n) ?? 0;
        (s.set(n, r + 1), (e[i - 1] = r));
      }
    else
      for (let i = 0, n = this.#s; i < n; i++) {
        const r = this.#t[i],
          a = s.get(r) ?? 0;
        (s.set(r, a + 1), (e[i] = a));
      }
    return e;
  }
  getPageMappingForSaving(t = null, e = this.#l()) {
    t ??= this.#r();
    let s = 0;
    for (const n of t.values()) s = Math.max(s, n.length);
    const i = new Array(s);
    for (let n = 0; n < s; n++) i[n] = { document: null, pageIndices: [], includePages: [] };
    for (const [n, r] of t)
      for (let a = 0, o = r.length; a < o; a++) i[a].includePages.push([n - 1, r[a] - 1]);
    for (const { includePages: n, pageIndices: r } of i) {
      n.sort((a, o) => a[0] - o[0]);
      for (let a = 0, o = n.length; a < o; a++) (r.push(n[a][1]), (n[a] = n[a][0]));
    }
    return { pageInfos: i, copyLevels: e };
  }
  extractPages(t) {
    t = Array.from(t).sort((s, i) => s - i);
    const e = new Map();
    for (let s = 0, i = t.length; s < i; s++) {
      const n = this.getPageId(t[s]);
      e.getOrInsertComputed(n, pe).push(s + 1);
    }
    return this.getPageMappingForSaving(e, this.#l(t));
  }
  getPrevPageNumber(t) {
    return this.#e?.[t - 1] ?? 0;
  }
  getPageNumber(t) {
    if (!this.#t) return t;
    const e = this.#t;
    for (let s = 0, i = this.#s; s < i; s++) if (e[s] === t) return s + 1;
    return 0;
  }
  getPageId(t) {
    return this.#t?.[t - 1] ?? t;
  }
  getMapping() {
    return this.#t?.subarray(0, this.pagesNumber);
  }
}