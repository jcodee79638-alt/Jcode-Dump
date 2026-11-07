
var Jcn = ne(() => {
  Sj();
  FM();
  KH();
  wC();
  mI();
  Hf();
  R_();
  Yu();
  ((nRe = 1 << RW), (d2s = nRe / 4), (Bcn = nRe / 2), (m2s = nRe - 1));
  Wcn = class Wcn extends L1e {
    _tag = "EmptyNode";
    edit = 0;
    get size() {
      return 0;
    }
    get(e, t, r) {
      return eH();
    }
    has(e, t, r) {
      return !1;
    }
    set(e, t, r, s, a, H) {
      return ((H.value = !0), new VQ(e, r, s, a));
    }
    remove(e, t, r, s, a) {
      return this;
    }
    iterator() {
      return [][Symbol.iterator]();
    }
    [Symbol.iterator]() {
      return this.iterator();
    }
    canEdit(e) {
      return !1;
    }
  };
  VQ = class VQ extends L1e {
    _tag = "LeafNode";
    edit;
    hash;
    key;
    value;
    constructor(e, t, r, s) {
      super();
      ((this.edit = e), (this.hash = t), (this.key = r), (this.value = s));
    }
    get size() {
      return 1;
    }
    get(e, t, r) {
      if (this.hash === t && hp(this.key, r)) return Lo(this.value);
      return eH();
    }
    has(e, t, r) {
      return this.hash === t && hp(this.key, r);
    }
    set(e, t, r, s, a, H) {
      if (this.hash === r && hp(this.key, s)) {
        if (hp(this.value, a)) return this;
        if (this.canEdit(e)) return ((this.value = a), this);
        return new VQ(e, r, s, a);
      }
      if (((H.value = !0), this.hash === r))
        return new tRe(e, r, [
          [this.key, this.value],
          [s, a],
        ]);
      let u = Gie(r, t),
        f = Gie(this.hash, t);
      if (u === f) return new AG(e, u, [this.set(e, t + RW, r, s, a, H)]);
      let d = u | f,
        _ = u >>> 0 < f >>> 0 ? [new VQ(e, r, s, a), this] : [this, new VQ(e, r, s, a)];
      return new AG(e, d, _);
    }
    remove(e, t, r, s, a) {
      if (this.hash === r && hp(this.key, s)) {
        a.value = !0;
        return;
      }
      return this;
    }
    iterator() {
      return [[this.key, this.value]][Symbol.iterator]();
    }
    [Symbol.iterator]() {
      return this.iterator();
    }
  };
  tRe = class tRe extends L1e {
    _tag = "CollisionNode";
    edit;
    hash;
    entries;
    constructor(e, t, r) {
      super();
      ((this.edit = e), (this.hash = t), (this.entries = r));
    }
    get size() {
      return this.entries.length;
    }
    get(e, t, r) {
      if (this.hash !== t) return eH();
      for (let [s, a] of this.entries) if (hp(s, r)) return Lo(a);
      return eH();
    }
    has(e, t, r) {
      if (this.hash !== t) return !1;
      for (let [s] of this.entries) if (hp(s, r)) return !0;
      return !1;
    }
    set(e, t, r, s, a, H) {
      if (this.hash !== r) return ((H.value = !0), Rcn(e, t, this.hash, this, r, new VQ(e, r, s, a)));
      for (let u = 0; u < this.entries.length; u++)
        if (hp(this.entries[u][0], s)) {
          if (hp(this.entries[u][1], a)) return this;
          if (this.canEdit(e)) return ((this.entries[u] = [s, a]), this);
          let f = [...this.entries];
          return ((f[u] = [s, a]), new tRe(e, this.hash, f));
        }
      if (((H.value = !0), this.canEdit(e))) return (this.entries.push([s, a]), this);
      return new tRe(e, this.hash, [...this.entries, [s, a]]);
    }
    remove(e, t, r, s, a) {
      if (this.hash !== r) return this;
      let H = this.entries.findIndex(([f]) => hp(f, s));
      if (H === -1) return this;
      if (((a.value = !0), this.entries.length === 1)) return;
      if (this.entries.length === 2) {
        let f = this.entries[H === 0 ? 1 : 0];
        return new VQ(e, this.hash, f[0], f[1]);
      }
      if (this.canEdit(e)) return (this.entries.splice(H, 1), this);
      let u = [...this.entries];
      return (u.splice(H, 1), new tRe(e, this.hash, u));
    }
    iterator() {
      return this.entries[Symbol.iterator]();
    }
    [Symbol.iterator]() {
      return this.iterator();
    }
  };
  AG = class AG extends L1e {
    _tag = "IndexedNode";
    edit;
    _size;
    bitmap;
    children;
    constructor(e, t, r) {
      super();
      ((this.edit = e), (this.bitmap = t), (this.children = r));
    }
    get size() {
      if (this._size === void 0) this._size = this.children.reduce((e, t) => e + t.size, 0);
      return this._size;
    }
    get(e, t, r) {
      let s = Gie(t, e);
      if ((this.bitmap & s) === 0) return eH();
      let a = Dft(this.bitmap, s);
      return this.children[a].get(e + RW, t, r);
    }
    has(e, t, r) {
      let s = Gie(t, e);
      if ((this.bitmap & s) === 0) return !1;
      let a = Dft(this.bitmap, s);
      return this.children[a].has(e + RW, t, r);
    }
    set(e, t, r, s, a, H) {
      let u = Gie(r, t),
        f = Dft(this.bitmap, u);
      if ((this.bitmap & u) !== 0) {
        let d = this.children[f],
          _ = d.set(e, t + RW, r, s, a, H);
        if (d === _) return this;
        if (this.canEdit(e)) return ((this.children[f] = _), this);
        let L = [...this.children];
        return ((L[f] = _), new AG(e, this.bitmap, L));
      } else {
        H.value = !0;
        let d = new VQ(e, r, s, a),
          _ = this.bitmap | u;
        if (this.canEdit(e)) {
          if (
            (this.children.splice(f, 0, d),
            (this.bitmap = _),
            (this._size = void 0),
            this.children.length > Bcn)
          )
            return this.expand(e, _, this.children);
          return this;
        }
        let L = [...this.children];
        if ((L.splice(f, 0, d), L.length > Bcn)) return this.expand(e, _, L);
        return new AG(e, _, L);
      }
    }
    remove(e, t, r, s, a) {
      let H = Gie(r, t);
      if ((this.bitmap & H) === 0) return this;
      let u = Dft(this.bitmap, H),
        f = this.children[u],
        d = f.remove(e, t + RW, r, s, a);
      if (!a.value) return this;
      if (d === void 0) {
        let L = this.bitmap ^ H;
        if (L === 0) return;
        if (this.children.length === 2) {
          let D = this.children[u === 0 ? 1 : 0];
          if (D._tag === "LeafNode") return D;
        }
        if (this.canEdit(e))
          return (this.children.splice(u, 1), (this.bitmap = L), (this._size = void 0), this);
        let I = [...this.children];
        return (I.splice(u, 1), new AG(e, L, I));
      }
      if (f === d) return this;
      if (this.canEdit(e)) return ((this.children[u] = d), this);
      let _ = [...this.children];
      return ((_[u] = d), new AG(e, this.bitmap, _));
    }
    expand(e, t, r) {
      let s = new globalThis.Array(nRe),
        a = 0;
      for (let H = 0; H < nRe; H++) if ((t & (1 << H)) !== 0) s[H] = r[a++];
      return new rRe(e, r.length, s);
    }
    iterator() {
      let e = 0,
        t;
      return {
        next: () => {
          while (e < this.children.length) {
            if (!t) t = this.children[e].iterator();
            let r = t.next();
            if (!r.done) return r;
            ((t = void 0), e++);
          }
          return { done: !0, value: void 0 };
        },
      };
    }
    [Symbol.iterator]() {
      return this.iterator();
    }
  };
  rRe = class rRe extends L1e {
    _tag = "ArrayNode";
    edit;
    _size;
    count;
    children;
    constructor(e, t, r) {
      super();
      ((this.edit = e), (this.count = t), (this.children = r));
    }
    get size() {
      if (this._size === void 0) this._size = this.children.reduce((e, t) => e + (t?.size ?? 0), 0);
      return this._size;
    }
    get(e, t, r) {
      let s = eRe(t, e),
        a = this.children[s];
      return a ? a.get(e + RW, t, r) : eH();
    }
    has(e, t, r) {
      let s = eRe(t, e),
        a = this.children[s];
      return a ? a.has(e + RW, t, r) : !1;
    }
    set(e, t, r, s, a, H) {
      let u = eRe(r, t),
        f = this.children[u];
      if (f) {
        let d = f.set(e, t + RW, r, s, a, H);
        if (f === d) return this;
        if (this.canEdit(e)) return ((this.children[u] = d), this);
        let _ = [...this.children];
        return ((_[u] = d), new rRe(e, this.count, _));
      } else {
        H.value = !0;
        let d = new VQ(e, r, s, a);
        if (this.canEdit(e)) return ((this.children[u] = d), this.count++, (this._size = void 0), this);
        let _ = [...this.children];
        return ((_[u] = d), new rRe(e, this.count + 1, _));
      }
    }
    remove(e, t, r, s, a) {
      let H = eRe(r, t),
        u = this.children[H];
      if (!u) return this;
      let f = u.remove(e, t + RW, r, s, a);
      if (!a.value) return this;
      let d = this.count - (f ? 0 : 1);
      if (d < d2s) return this.pack(e, H, f);
      if (u === f) return this;
      if (this.canEdit(e)) {
        if (((this.children[H] = f), !f)) this.count = d;
        return ((this._size = void 0), this);
      }
      let _ = [...this.children];
      return ((_[H] = f), new rRe(e, d, _));
    }
    pack(e, t, r) {
      let s = [],
        a = 0,
        H = 1;
      for (let u = 0; u < this.children.length; u++) {
        let f = u === t ? r : this.children[u];
        if (f) (s.push(f), (a |= H));
        H <<= 1;
      }
      return new AG(e, a, s);
    }
    iterator() {
      let e = 0,
        t;
      return {
        next: () => {
          while (e < this.children.length) {
            let r = this.children[e];
            if (!r) {
              e++;
              continue;
            }
            if (!t) t = r.iterator();
            let s = t.next();
            if (!s.done) return s;
            ((t = void 0), e++);
          }
          return { done: !0, value: void 0 };
        },
      };
    }
    [Symbol.iterator]() {
      return this.iterator();
    }
  };
  Mft = class Mft {
    [yft] = yft;
    _editable;
    _edit;
    _root;
    _size;
    constructor(e, t, r, s) {
      ((this._editable = e), (this._edit = t), (this._root = r), (this._size = s));
    }
    get size() {
      return this._size;
    }
    [Symbol.iterator]() {
      return this._root.iterator();
    }
    [V_](e) {
      if (qcn(e)) {
        let t = e;
        if (this.size !== t.size) return !1;
        for (let [r, s] of this) {
          let a = Ev(e, eZt(r));
          if (vl(a) || !hp(s, a.value)) return !1;
        }
        return !0;
      }
      return !1;
    }
    [W_]() {
      let e = N0("HashMap");
      for (let [t, r] of this) e = e ^ (ad(t) + ad(r));
      return e;
    }
    [F0]() {
      return BM(this);
    }
    toString() {
      return `HashMap(${af(Array.from(this))})`;
    }
    toJSON() {
      return { _id: "HashMap", values: Array.from(this).map(([e, t]) => [BM(e), BM(t)]) };
    }
    pipe() {
      return vA(this, arguments);
    }
  };
  ((Vcn = new Wcn()),
    (eZt = Wr(2, (e, t) => e._root.get(0, ad(t), t))),
    (Gcn = Wr(3, (e, t, r) => {
      let s = e,
        a = ad(t),
        H = { value: !1 },
        u = s._editable ? s._edit : NaN,
        f = s._root.set(u, 0, a, t, r, H);
      if (s._editable) {
        if (((s._root = f), H.value)) s._size++;
        return e;
      }
      if (s._root === f) return e;
      return new Mft(!1, s._edit, f, s._size + (H.value ? 1 : 0));
    })),
    (Xcn = Wr(2, (e, t) => {
      let r = e,
        s = ad(t),
        a = { value: !1 },
        H = r._editable ? r._edit : NaN,
        u = r._root.remove(H, 0, s, t, a);
      if (!a.value) return e;
      if (r._editable) return ((r._root = u ?? Vcn), r._size--, e);
      if (u === void 0) return ZYt();
      return new Mft(!1, r._edit, u, r._size - 1);
    })));
});