
var Zdr = Ie(function (Eae) {
  var Myt =
    (Eae && Eae.__importDefault) ||
    function (e) {
      return e && e.__esModule ? e : { default: e };
    };
  Object.defineProperty(Eae, "__esModule", { value: !0 });
  Eae.DefaultFetcher = Eae.BaseFetcher = void 0;
  var gQo = Myt(A_e()),
    Ofi = Myt(cr("fs")),
    EQo = Myt(C4e()),
    IQo = Myt(cr("util")),
    xyt = yyt(),
    Ufi = kfi(),
    DQo = (0, gQo.default)("tuf:fetch"),
    yQo = "User-Agent";
  class Ydr {
    async downloadFile(e, t, r) {
      return Ufi.withTempFile(async (s) => {
        let a = await this.fetch(e),
          H = 0,
          u = Ofi.default.createWriteStream(s);
        try {
          for await (let f of a) {
            if (((H += f.length), H > t)) throw new xyt.DownloadLengthMismatchError("Max length reached");
            await MQo(u, f);
          }
        } finally {
          await IQo.default.promisify(u.close).bind(u)();
        }
        return r(s);
      });
    }
    async downloadBytes(e, t) {
      return this.downloadFile(e, t, async (r) => {
        let s = Ofi.default.createReadStream(r),
          a = [];
        for await (let H of s) a.push(H);
        return Buffer.concat(a);
      });
    }
  }
  Eae.BaseFetcher = Ydr;
  class Nfi extends Ydr {
    userAgent;
    timeout;
    retry;
    constructor(e = {}) {
      super();
      ((this.userAgent = e.userAgent), (this.timeout = e.timeout), (this.retry = e.retry));
    }
    async fetch(e) {
      DQo("GET %s", e);
      let t = await (0, EQo.default)(e, {
        headers: { [yQo]: this.userAgent || "" },
        timeout: this.timeout,
        retry: this.retry,
      });
      if (!t.ok || !t?.body) throw new xyt.DownloadHTTPError("Failed to download", t.status);
      return t.body;
    }
  }
  Eae.DefaultFetcher = Nfi;
  var MQo = async (e, t) =>
    new Promise((r, s) => {
      e.write(t, (a) => {
        if (a) s(a);
        r(!0);
      });
    });
});