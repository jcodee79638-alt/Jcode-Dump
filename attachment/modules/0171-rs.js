
class rs {
  onProgress = null;
  _contentLength = 0;
  _filename = null;
  _headersCapability = Promise.withResolvers();
  _isRangeSupported = !1;
  _isStreamingSupported = !1;
  _loaded = 0;
  _stream = null;
  constructor(t) {
    this._stream = t;
  }
  _callOnProgress() {
    this.onProgress?.({ loaded: this._loaded, total: this._contentLength });
  }
  get headersReady() {
    return this._headersCapability.promise;
  }
  get filename() {
    return this._filename;
  }
  get contentLength() {
    return this._contentLength;
  }
  get isRangeSupported() {
    return this._isRangeSupported;
  }
  get isStreamingSupported() {
    return this._isStreamingSupported;
  }
  async read() {
    $("Abstract method `read` called");
  }
  cancel(t) {
    $("Abstract method `cancel` called");
  }
}