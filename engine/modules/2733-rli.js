
var rli = Ie(function (eli) {
  Object.defineProperty(eli, "__esModule", { value: !0 });
  eli.TimestampAuthority = void 0;
  var Yui = X4e();
  class Zui {
    options;
    constructor(e) {
      this.options = e;
    }
    async createTimestamp(e) {
      let { baseURL: t, timeout: r, retry: s } = this.options,
        a = new URL(t).pathname === "/" ? `${t}/api/v1/timestamp` : t;
      return (
        await Yui.fetchWithRetry(a, {
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(e),
          timeout: r,
          retry: s,
        })
      ).buffer();
    }
  }
  eli.TimestampAuthority = Zui;
});