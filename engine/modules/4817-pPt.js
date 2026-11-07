
var pPt = ne(() => {
  nR();
  nTr();
  DLe = class DLe extends Promise {
    constructor(e, t, r = fPt) {
      super((s) => {
        s(null);
      });
      ((this.responsePromise = t), (this.parseResponse = r), EKe.set(this, void 0), wu(this, EKe, e, "f"));
    }
    _thenUnwrap(e) {
      return new DLe(us(this, EKe, "f"), this.responsePromise, async (t, r) =>
        rTr(e(await this.parseResponse(t, r), r), r.response),
      );
    }
    asResponse() {
      return this.responsePromise.then((e) => e.response);
    }
    async withResponse() {
      let [e, t] = await Promise.all([this.parse(), this.asResponse()]);
      return { data: e, response: t, request_id: t.headers.get("x-request-id") };
    }
    parse() {
      if (!this.parsedPromise)
        this.parsedPromise = this.responsePromise.then((e) => this.parseResponse(us(this, EKe, "f"), e));
      return this.parsedPromise;
    }
    then(e, t) {
      return this.parse().then(e, t);
    }
    catch(e) {
      return this.parse().catch(e);
    }
    finally(e) {
      return this.parse().finally(e);
    }
  };
  EKe = new WeakMap();
});