
var iR = ne(() => {
  bc = class bc extends Error {};
  CI = class CI extends bc {
    constructor(e, t, r, s) {
      super(`${CI.makeMessage(e, t, r)}`);
      ((this.status = e), (this.headers = s), (this.requestID = s?.get("x-request-id")), (this.error = t));
      let a = t;
      ((this.code = a?.code), (this.param = a?.param), (this.type = a?.type));
    }
    static makeMessage(e, t, r) {
      let s = t?.message
        ? typeof t.message === "string"
          ? t.message
          : JSON.stringify(t.message)
        : t
          ? JSON.stringify(t)
          : r;
      if (e && s) return `${e} ${s}`;
      if (e) return `${e} status code (no body)`;
      if (s) return s;
      return "(no status code or body)";
    }
    static generate(e, t, r, s) {
      if (!e || !s) return new ELe({ message: r, cause: aKe(t) });
      let a = t?.error;
      if (e === 400) return new HKe(e, a, r, s);
      if (e === 401) return new cKe(e, a, r, s);
      if (e === 403) return new AKe(e, a, r, s);
      if (e === 404) return new uKe(e, a, r, s);
      if (e === 409) return new lKe(e, a, r, s);
      if (e === 422) return new fKe(e, a, r, s);
      if (e === 429) return new pKe(e, a, r, s);
      if (e >= 500) return new dKe(e, a, r, s);
      return new CI(e, a, r, s);
    }
  };
  hx = class hx extends CI {
    constructor({ message: e } = {}) {
      super(void 0, void 0, e || "Request was aborted.", void 0);
    }
  };
  ELe = class ELe extends CI {
    constructor({ message: e, cause: t }) {
      super(void 0, void 0, e || "Connection error.", void 0);
      if (t) this.cause = t;
    }
  };
  ILe = class ILe extends ELe {
    constructor({ message: e } = {}) {
      super({ message: e ?? "Request timed out." });
    }
  };
  HKe = class HKe extends CI {};
  cKe = class cKe extends CI {};
  AKe = class AKe extends CI {};
  uKe = class uKe extends CI {};
  lKe = class lKe extends CI {};
  fKe = class fKe extends CI {};
  pKe = class pKe extends CI {};
  dKe = class dKe extends CI {};
  mKe = class mKe extends bc {
    constructor() {
      super("Could not parse response content as the length limit was reached");
    }
  };
  _Ke = class _Ke extends bc {
    constructor() {
      super("Could not parse response content as the request was rejected by the content filter");
    }
  };
  Cee = class Cee extends Error {
    constructor(e) {
      super(e);
    }
  };
  VPe = class VPe extends CI {
    constructor(e, t, r) {
      let s = "OAuth2 authentication error",
        a = void 0;
      if (t && typeof t === "object") {
        let H = t;
        a = H.error;
        let u = H.error_description;
        if (u && typeof u === "string") s = u;
        else if (a) s = a;
      }
      super(e, t, s, r);
      this.error_code = a;
    }
  };
  oPt = class oPt extends bc {
    constructor(e, t, r) {
      super(e);
      ((this.provider = t), (this.cause = r));
    }
  };
});