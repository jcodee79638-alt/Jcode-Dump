
class as {
  _stream = null;
  constructor(t, e, s) {
    this._stream = t;
  }
  async read() {
    $("Abstract method `read` called");
  }
  cancel(t) {
    $("Abstract method `cancel` called");
  }
}