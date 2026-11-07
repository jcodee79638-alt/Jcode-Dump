
class s0t {
  getLogger(e, t, r) {
    var s;
    return (s = this._getDelegateLogger(e, t, r)) !== null && s !== void 0 ? s : new Scr(this, e, t, r);
  }
  _getDelegate() {
    var e;
    return (e = this._delegate) !== null && e !== void 0 ? e : i0t;
  }
  _setDelegate(e) {
    this._delegate = e;
  }
  _getDelegateLogger(e, t, r) {
    var s;
    return (s = this._delegate) === null || s === void 0 ? void 0 : s.getLogger(e, t, r);
  }
}