
var yPt = ne(() => {
  nR();
  x7();
  (($Pt = new WeakMap()),
    (gPt = new WeakMap()),
    (TKe = new WeakMap()),
    (vKe = new WeakMap()),
    (EPt = new WeakMap()),
    (bKe = new WeakMap()),
    (Oee = new WeakMap()),
    (jKe = new WeakMap()),
    (IPt = new WeakMap()),
    (DPt = new WeakMap()),
    (zPe = new WeakMap()),
    (lTr = new WeakSet()),
    (GVi = function (t) {
      if ((wu(this, IPt, !0, "f"), t instanceof Error && t.name === "AbortError")) t = new hx();
      if (t instanceof hx) return (wu(this, DPt, !0, "f"), this._emit("abort", t));
      if (t instanceof bc) return this._emit("error", t);
      if (t instanceof Error) {
        let r = new bc(t.message);
        return ((r.cause = t), this._emit("error", r));
      }
      return this._emit("error", new bc(String(t)));
    }));
});