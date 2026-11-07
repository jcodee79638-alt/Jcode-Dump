
class Scr {
  constructor(e, t, r, s) {
    ((this._provider = e), (this.name = t), (this.version = r), (this.options = s));
  }
  emit(e) {
    this._getLogger().emit(e);
  }
  _getLogger() {
    if (this._delegate) return this._delegate;
    let e = this._provider._getDelegateLogger(this.name, this.version, this.options);
    if (!e) return i7e;
    return ((this._delegate = e), this._delegate);
  }
}