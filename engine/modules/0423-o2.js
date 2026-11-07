
var o2,
  Qlt = () => ({ head: void 0, tail: void 0, length: 0 }),
  zan = () => ({ array: [], mutable: !0, offset: 0, next: void 0 }),
  wW = (e, t) => {
    if (!e.tail) e.head = e.tail = zan();
    else if (!e.tail.mutable) ((e.tail.next = zan()), (e.tail = e.tail.next));
    (e.tail.array.push(t), e.length++);
  },
  Qan = (e, t) => {
    ((e.head = { array: [t], mutable: !0, offset: 0, next: e.head }), e.length++);
  },
  t1e = (e) => {
    ((e.head = e.tail = void 0), (e.length = 0));
  },
  sYt = (e, t) => {
    if (t <= 0 || !e.head) return [];
    if (((t = Math.min(t, e.length)), t === e.length && e.head?.offset === 0 && !e.head.next)) {
      let H = e.head.array;
      return (t1e(e), H);
    }
    let r = Array(t),
      s = 0,
      a = e.head;
    while (a) {
      while (a.offset < a.array.length) {
        if (((r[s++] = a.array[a.offset]), a.mutable)) a.array[a.offset] = void 0;
        if ((a.offset++, s === t)) {
          if (((e.head = a), (e.length -= t), e.length === 0)) t1e(e);
          return r;
        }
      }
      a = a.next;
    }
    return (t1e(e), r);
  },
  oYt = (e) => sYt(e, e.length),
  Uie = (e) => {
    if (!e.head) return o2;
    let t = e.head.array[e.head.offset];
    if (e.head.mutable) e.head.array[e.head.offset] = void 0;
    if ((e.head.offset++, e.length--, e.head.offset === e.head.array.length))
      if (e.head.next) e.head = e.head.next;
      else t1e(e);
    return t;
  },
  Yan = (e, t) => {
    let r = [],
      s = e.head;
    while (s) {
      for (let a = s.offset; a < s.array.length; a++) if (t(s.array[a], a)) r.push(s.array[a]);
      s = s.next;
    }
    ((e.head = e.tail = { array: r, mutable: !0, offset: 0, next: void 0 }), (e.length = r.length));
  },
  Zan = (e, t) => Yan(e, (r) => r !== t);