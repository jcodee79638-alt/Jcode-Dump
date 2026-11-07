
var MTr = ne(() => {
  vPt();
  YPe = class YPe extends Ece {
    static fromReadableStream(e) {
      let t = new YPe(null);
      return (t._run(() => t._fromReadableStream(e)), t);
    }
    static runTools(e, t, r) {
      let s = new YPe(t),
        a = { ...r, headers: { ...r?.headers, "X-Stainless-Helper-Method": "runTools" } };
      return (s._run(() => s._runTools(e, t, a)), s);
    }
  };
});