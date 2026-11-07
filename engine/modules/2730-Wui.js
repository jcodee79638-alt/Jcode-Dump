
var Wui = Ie(function (Bui) {
  Object.defineProperty(Bui, "__esModule", { value: !0 });
  Bui.TLogV2Client = Bui.TLogClient = void 0;
  var pae = kTe(),
    kui = UDt(),
    Oui = mui(),
    Uui = wui();
  class Nui {
    rekor;
    fetchOnConflict;
    constructor(e) {
      ((this.fetchOnConflict = e.fetchOnConflict ?? !1),
        (this.rekor = new Oui.Rekor({ baseURL: e.rekorBaseURL, retry: e.retry, timeout: e.timeout })));
    }
    async createEntry(e) {
      let t;
      try {
        t = await this.rekor.createEntry(e);
      } catch (r) {
        if (tKo(r) && this.fetchOnConflict) {
          let s = r.location.split("/").pop() || "";
          try {
            t = await this.rekor.getEntry(s);
          } catch (a) {
            pae.internalError(a, "TLOG_FETCH_ENTRY_ERROR", "error fetching tlog entry");
          }
        } else pae.internalError(r, "TLOG_CREATE_ENTRY_ERROR", "error creating tlog entry");
      }
      return t;
    }
  }
  Bui.TLogClient = Nui;
  function tKo(e) {
    return e instanceof kui.HTTPError && e.statusCode === 409 && e.location !== void 0;
  }
  class Fui {
    rekor;
    constructor(e) {
      this.rekor = new Uui.RekorV2({ baseURL: e.rekorBaseURL, retry: e.retry, timeout: e.timeout });
    }
    async createEntry(e) {
      let t;
      try {
        t = await this.rekor.createEntry(e);
      } catch (r) {
        pae.internalError(r, "TLOG_CREATE_ENTRY_ERROR", "error creating tlog entry");
      }
      if (t.logId === void 0 || t.kindVersion === void 0)
        pae.internalError(
          Error("invalid tlog entry"),
          "TLOG_CREATE_ENTRY_ERROR",
          "error creating tlog entry",
        );
      return { ...t, logId: t.logId, kindVersion: t.kindVersion };
    }
  }
  Bui.TLogV2Client = Fui;
});