
var ZB = ne(() => {
  Cu = class Cu extends Error {};
  mx = class mx extends Cu {
    constructor(e, t, r, s) {
      super(`${mx.makeMessage(e, t, r)}`);
      ((this.status = e), (this.headers = s), (this.requestID = s?.get("request-id")), (this.error = t));
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
      if (!e || !s) return new ALe({ message: r, cause: iJe(t) });
      let a = t;
      if (e === 400) return new oJe(e, a, r, s);
      if (e === 401) return new aJe(e, a, r, s);
      if (e === 403) return new HJe(e, a, r, s);
      if (e === 404) return new cJe(e, a, r, s);
      if (e === 409) return new AJe(e, a, r, s);
      if (e === 422) return new uJe(e, a, r, s);
      if (e === 429) return new lJe(e, a, r, s);
      if (e >= 500) return new fJe(e, a, r, s);
      return new mx(e, a, r, s);
    }
  };
  SP = class SP extends mx {
    constructor({ message: e } = {}) {
      super(void 0, void 0, e || "Request was aborted.", void 0);
    }
  };
  ALe = class ALe extends mx {
    constructor({ message: e, cause: t }) {
      super(void 0, void 0, e || "Connection error.", void 0);
      if (t) this.cause = t;
    }
  };
  sJe = class sJe extends ALe {
    constructor({ message: e } = {}) {
      super({ message: e ?? "Request timed out." });
    }
  };
  oJe = class oJe extends mx {};
  aJe = class aJe extends mx {};
  HJe = class HJe extends mx {};
  cJe = class cJe extends mx {};
  AJe = class AJe extends mx {};
  uJe = class uJe extends mx {};
  lJe = class lJe extends mx {};
  fJe = class fJe extends mx {};
});