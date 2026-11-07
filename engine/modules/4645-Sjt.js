
var Sjt = ne(() => {
  Iee();
  Rxr();
  lLe = class lLe extends Promise {
    constructor(e, t, r = xjt) {
      super((s) => {
        s(null);
      });
      ((this.responsePromise = t), (this.parseResponse = r), hJe.set(this, void 0), Ic(this, hJe, e, "f"));
    }
    _thenUnwrap(e) {
      return new lLe(Ps(this, hJe, "f"), this.responsePromise, async (t, r) =>
        Bxr(e(await this.parseResponse(t, r), r), r.response),
      );
    }
    asResponse() {
      return this.responsePromise.then((e) => e.response);
    }
    async withResponse() {
      let [e, t] = await Promise.all([this.parse(), this.asResponse()]);
      return { data: e, response: t, request_id: t.headers.get("request-id") };
    }
    parse() {
      if (!this.parsedPromise)
        this.parsedPromise = this.responsePromise.then((e) => this.parseResponse(Ps(this, hJe, "f"), e));
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
  hJe = new WeakMap();
});