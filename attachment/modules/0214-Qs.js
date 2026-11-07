
class Qs {
  static #t = 0;
  _capability = Promise.withResolvers();
  _setupCapability = Promise.withResolvers();
  _transport = null;
  _worker = null;
  docId = `d${Qs.#t++}`;
  destroyed = !1;
  onPassword = null;
  onProgress = null;
  get promise() {
    return this._capability.promise;
  }
  async destroy() {
    ((this.destroyed = !0), this._capability.promise.catch(() => {}));
    try {
      (this._worker?.port && (this._worker._pendingDestroy = !0),
        await this._setupCapability.promise,
        await this._transport?.destroy());
    } catch (t) {
      throw (this._worker?.port && delete this._worker._pendingDestroy, t);
    }
    ((this._transport = null), this._worker?.destroy(), (this._worker = null));
  }
  async getData() {
    return this._transport.getData();
  }
}