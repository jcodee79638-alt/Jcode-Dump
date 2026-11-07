
var z7e = Ie(function (I9o, OSe) {
  var { LRUCache: h9o } = aoe(),
    vEt = new h9o({
      max: 500,
      maxSize: 52428800,
      ttl: 180000,
      sizeCalculation: (e, t) => (t.startsWith("key:") ? e.data.length : e.length),
    });
  I9o.clearMemoized = L9o;
  function L9o() {
    let e = {};
    return (
      vEt.forEach((t, r) => {
        e[r] = t;
      }),
      vEt.clear(),
      e
    );
  }
  I9o.put = $9o;
  function $9o(e, t, r, s) {
    (bEt(s).set(`key:${e}:${t.key}`, { entry: t, data: r }), _ei(e, t.integrity, r, s));
  }
  I9o.put.byDigest = _ei;
  function _ei(e, t, r, s) {
    bEt(s).set(`digest:${e}:${t}`, r);
  }
  I9o.get = g9o;
  function g9o(e, t, r) {
    return bEt(r).get(`key:${e}:${t}`);
  }
  I9o.get.byDigest = E9o;
  function E9o(e, t, r) {
    return bEt(r).get(`digest:${e}:${t}`);
  }
  class hei {
    constructor(e) {
      this.obj = e;
    }
    get(e) {
      return this.obj[e];
    }
    set(e, t) {
      this.obj[e] = t;
    }
  }
  function bEt(e) {
    if (!e || !e.memoize) return vEt;
    else if (e.memoize.get && e.memoize.set) return e.memoize;
    else if (typeof e.memoize === "object") return new hei(e.memoize);
    else return vEt;
  }
});