
var mui = Ie(function (pui) {
  Object.defineProperty(pui, "__esModule", { value: !0 });
  pui.Rekor = void 0;
  var RDt = X4e();
  class fui {
    options;
    constructor(e) {
      this.options = e;
    }
    async createEntry(e) {
      let { baseURL: t, timeout: r, retry: s } = this.options,
        a = `${t}/api/v1/log/entries`,
        u = await (
          await RDt.fetchWithRetry(a, {
            headers: { "Content-Type": "application/json", Accept: "application/json" },
            body: JSON.stringify(e),
            timeout: r,
            retry: s,
          })
        ).json();
      return lui(u);
    }
    async getEntry(e) {
      let { baseURL: t, timeout: r, retry: s } = this.options,
        a = `${t}/api/v1/log/entries/${e}`,
        u = await (
          await RDt.fetchWithRetry(a, {
            method: "GET",
            headers: { Accept: "application/json" },
            timeout: r,
            retry: s,
          })
        ).json();
      return lui(u);
    }
  }
  pui.Rekor = fui;
  function lui(e) {
    let t = Object.entries(e);
    if (t.length != 1) throw Error("Received multiple entries in Rekor response");
    let [r, s] = t[0];
    return { ...s, uuid: r };
  }
});