
class M7 {
  constructor(e, t, r, s) {
    ((this._cachedPath = []), (this.parent = e), (this.data = t), (this._path = r), (this._key = s));
  }
  get path() {
    if (!this._cachedPath.length)
      if (Array.isArray(this._key)) this._cachedPath.push(...this._path, ...this._key);
      else this._cachedPath.push(...this._path, this._key);
    return this._cachedPath;
  }
}