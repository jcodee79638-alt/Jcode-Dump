
var AXn = Ie(function (HXn) {
  Object.defineProperty(HXn, "__esModule", { value: !0 });
  HXn.createHttpExporterTransport = void 0;
  var oXn = sXn();
  class aXn {
    _utils = null;
    _parameters;
    constructor(e) {
      this._parameters = e;
    }
    async send(e, t) {
      let { agent: r, request: s } = await this._loadUtils(),
        a = await this._parameters.headers();
      return oXn.sendWithHttp(
        s,
        this._parameters.url,
        a,
        this._parameters.compression,
        this._parameters.userAgent,
        r,
        e,
        t,
      );
    }
    shutdown() {}
    async _loadUtils() {
      let e = this._utils;
      if (e === null) {
        let t = new URL(this._parameters.url).protocol,
          [r, s] = await Promise.all([this._parameters.agentFactory(t), XPo(t)]);
        e = this._utils = { agent: r, request: s };
      }
      return e;
    }
  }
  async function XPo(e) {
    let t = e === "http:" ? import("http") : import("https"),
      { request: r } = await t;
    return r;
  }
  function JPo(e) {
    return new aXn(e);
  }
  HXn.createHttpExporterTransport = JPo;
});