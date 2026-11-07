
class EEn {
  handlers = [];
  unconstrainedHandler;
  find() {
    return this.unconstrainedHandler;
  }
  add(e) {
    let t = { params: e.params, handler: e.handler, createParams: rKs(e.params) };
    (this.handlers.push(t), (this.unconstrainedHandler = this.handlers[0]));
  }
}