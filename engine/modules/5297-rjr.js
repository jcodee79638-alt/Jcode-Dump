
var rjr = Ie(function (Qqi) {
  var Kqi;
  Object.defineProperty(Qqi, "__esModule", { value: !0 });
  Qqi.LRUCache = Qqi.LinkedMap = Qqi.Touch = void 0;
  var wP;
  (function (e) {
    ((e.None = 0), (e.First = 1), (e.AsOld = e.First), (e.Last = 2), (e.AsNew = e.Last));
  })(wP || (Qqi.Touch = wP = {}));
  class tjr {
    constructor() {
      ((this[Kqi] = "LinkedMap"),
        (this._map = new Map()),
        (this._head = void 0),
        (this._tail = void 0),
        (this._size = 0),
        (this._state = 0));
    }
    clear() {
      (this._map.clear(), (this._head = void 0), (this._tail = void 0), (this._size = 0), this._state++);
    }
    isEmpty() {
      return !this._head && !this._tail;
    }
    get size() {
      return this._size;
    }
    get first() {
      return this._head?.value;
    }
    get last() {
      return this._tail?.value;
    }
    has(e) {
      return this._map.has(e);
    }
    get(e, t = wP.None) {
      let r = this._map.get(e);
      if (!r) return;
      if (t !== wP.None) this.touch(r, t);
      return r.value;
    }
    set(e, t, r = wP.None) {
      let s = this._map.get(e);
      if (s) {
        if (((s.value = t), r !== wP.None)) this.touch(s, r);
      } else {
        switch (((s = { key: e, value: t, next: void 0, previous: void 0 }), r)) {
          case wP.None:
            this.addItemLast(s);
            break;
          case wP.First:
            this.addItemFirst(s);
            break;
          case wP.Last:
            this.addItemLast(s);
            break;
          default:
            this.addItemLast(s);
            break;
        }
        (this._map.set(e, s), this._size++);
      }
      return this;
    }
    delete(e) {
      return !!this.remove(e);
    }
    remove(e) {
      let t = this._map.get(e);
      if (!t) return;
      return (this._map.delete(e), this.removeItem(t), this._size--, t.value);
    }
    shift() {
      if (!this._head && !this._tail) return;
      if (!this._head || !this._tail) throw Error("Invalid list");
      let e = this._head;
      return (this._map.delete(e.key), this.removeItem(e), this._size--, e.value);
    }
    forEach(e, t) {
      let r = this._state,
        s = this._head;
      while (s) {
        if (t) e.bind(t)(s.value, s.key, this);
        else e(s.value, s.key, this);
        if (this._state !== r) throw Error("LinkedMap got modified during iteration.");
        s = s.next;
      }
    }
    keys() {
      let e = this._state,
        t = this._head,
        r = {
          [Symbol.iterator]: () => r,
          next: () => {
            if (this._state !== e) throw Error("LinkedMap got modified during iteration.");
            if (t) {
              let s = { value: t.key, done: !1 };
              return ((t = t.next), s);
            } else return { value: void 0, done: !0 };
          },
        };
      return r;
    }
    values() {
      let e = this._state,
        t = this._head,
        r = {
          [Symbol.iterator]: () => r,
          next: () => {
            if (this._state !== e) throw Error("LinkedMap got modified during iteration.");
            if (t) {
              let s = { value: t.value, done: !1 };
              return ((t = t.next), s);
            } else return { value: void 0, done: !0 };
          },
        };
      return r;
    }
    entries() {
      let e = this._state,
        t = this._head,
        r = {
          [Symbol.iterator]: () => r,
          next: () => {
            if (this._state !== e) throw Error("LinkedMap got modified during iteration.");
            if (t) {
              let s = { value: [t.key, t.value], done: !1 };
              return ((t = t.next), s);
            } else return { value: void 0, done: !0 };
          },
        };
      return r;
    }
    [((Kqi = Symbol.toStringTag), Symbol.iterator)]() {
      return this.entries();
    }
    trimOld(e) {
      if (e >= this.size) return;
      if (e === 0) {
        this.clear();
        return;
      }
      let t = this._head,
        r = this.size;
      while (t && r > e) (this._map.delete(t.key), (t = t.next), r--);
      if (((this._head = t), (this._size = r), t)) t.previous = void 0;
      this._state++;
    }
    addItemFirst(e) {
      if (!this._head && !this._tail) this._tail = e;
      else if (!this._head) throw Error("Invalid list");
      else ((e.next = this._head), (this._head.previous = e));
      ((this._head = e), this._state++);
    }
    addItemLast(e) {
      if (!this._head && !this._tail) this._head = e;
      else if (!this._tail) throw Error("Invalid list");
      else ((e.previous = this._tail), (this._tail.next = e));
      ((this._tail = e), this._state++);
    }
    removeItem(e) {
      if (e === this._head && e === this._tail) ((this._head = void 0), (this._tail = void 0));
      else if (e === this._head) {
        if (!e.next) throw Error("Invalid list");
        ((e.next.previous = void 0), (this._head = e.next));
      } else if (e === this._tail) {
        if (!e.previous) throw Error("Invalid list");
        ((e.previous.next = void 0), (this._tail = e.previous));
      } else {
        let { next: t, previous: r } = e;
        if (!t || !r) throw Error("Invalid list");
        ((t.previous = r), (r.next = t));
      }
      ((e.next = void 0), (e.previous = void 0), this._state++);
    }
    touch(e, t) {
      if (!this._head || !this._tail) throw Error("Invalid list");
      if (t !== wP.First && t !== wP.Last) return;
      if (t === wP.First) {
        if (e === this._head) return;
        let { next: r, previous: s } = e;
        if (e === this._tail) ((s.next = void 0), (this._tail = s));
        else ((r.previous = s), (s.next = r));
        ((e.previous = void 0),
          (e.next = this._head),
          (this._head.previous = e),
          (this._head = e),
          this._state++);
      } else if (t === wP.Last) {
        if (e === this._tail) return;
        let { next: r, previous: s } = e;
        if (e === this._head) ((r.previous = void 0), (this._head = r));
        else ((r.previous = s), (s.next = r));
        ((e.next = void 0),
          (e.previous = this._tail),
          (this._tail.next = e),
          (this._tail = e),
          this._state++);
      }
    }
    toJSON() {
      let e = [];
      return (
        this.forEach((t, r) => {
          e.push([r, t]);
        }),
        e
      );
    }
    fromJSON(e) {
      this.clear();
      for (let [t, r] of e) this.set(t, r);
    }
  }
  Qqi.LinkedMap = tjr;
  class zqi extends tjr {
    constructor(e, t = 1) {
      super();
      ((this._limit = e), (this._ratio = Math.min(Math.max(0, t), 1)));
    }
    get limit() {
      return this._limit;
    }
    set limit(e) {
      ((this._limit = e), this.checkTrim());
    }
    get ratio() {
      return this._ratio;
    }
    set ratio(e) {
      ((this._ratio = Math.min(Math.max(0, e), 1)), this.checkTrim());
    }
    get(e, t = wP.AsNew) {
      return super.get(e, t);
    }
    peek(e) {
      return super.get(e, wP.None);
    }
    set(e, t) {
      return (super.set(e, t, wP.Last), this.checkTrim(), this);
    }
    checkTrim() {
      if (this.size > this._limit) this.trimOld(Math.round(this._limit * this._ratio));
    }
  }
  Qqi.LRUCache = zqi;
});