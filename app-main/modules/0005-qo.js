
var qo,
  Do,
  pe = (e, t, n) => {
    var i = e != null && typeof e === "object";
    if (i) {
      var r = t ? (qo ??= new WeakMap()) : (Do ??= new WeakMap()),
        s = r.get(e);
      if (s) return s;
    }
    n = e != null ? zo(No(e)) : {};
    let o =
      t || !e || !e.__esModule || !hi.call(e, "default") ? pi(n, "default", { value: e, enumerable: !0 }) : n;
    if ((e && typeof e === "object") || typeof e === "function") {
      for (let l of Oo(e)) if (!hi.call(o, l)) pi(o, l, { get: Lo.bind(e, l), enumerable: !0 });
    }
    if (i) r.set(e, o);
    return o;
  };