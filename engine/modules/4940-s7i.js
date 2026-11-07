
var s7i,
  Xa = (e) => {
    let t = new Headers(),
      r = new Set();
    for (let s of e) {
      let a = new Set();
      for (let [H, u] of G3a(s)) {
        let f = H.toLowerCase();
        if (!a.has(f)) (t.delete(H), a.add(f));
        if (u === null) (t.delete(H), r.add(f));
        else (t.append(H, u), r.delete(f));
      }
    }
    return { [s7i]: !0, values: t, nulls: r };
  };