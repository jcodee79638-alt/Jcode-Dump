
var wui = Ie(function (Pui) {
  Object.defineProperty(Pui, "__esModule", { value: !0 });
  Pui.RekorV2 = void 0;
  var Tui = X4e(),
    vui = _Z(),
    bui = Sdr();
  class jui {
    options;
    constructor(e) {
      this.options = e;
    }
    async createEntry(e) {
      let { baseURL: t, timeout: r, retry: s } = this.options,
        a = `${t}/api/v2/log/entries`;
      return (
        await Tui.fetchWithRetry(a, {
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(bui.CreateEntryRequest.toJSON(e)),
          timeout: r,
          retry: s,
        })
      )
        .json()
        .then((u) => vui.TransparencyLogEntry.fromJSON(u));
    }
  }
  Pui.RekorV2 = jui;
});