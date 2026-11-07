
var tRi = ne(() => {
  z1 = class z1 extends Error {
    constructor(e, t) {
      super(e);
      ((this.errorUri = t), (this.name = this.constructor.name));
    }
    toResponseObject() {
      let e = { error: this.errorCode, error_description: this.message };
      if (this.errorUri) e.error_uri = this.errorUri;
      return e;
    }
    get errorCode() {
      return this.constructor.errorCode;
    }
  };
  wbt = class wbt extends z1 {};
  wbt.errorCode = "invalid_request";
  Zje = class Zje extends z1 {};
  Zje.errorCode = "invalid_client";
  ePe = class ePe extends z1 {};
  ePe.errorCode = "invalid_grant";
  tPe = class tPe extends z1 {};
  tPe.errorCode = "unauthorized_client";
  kbt = class kbt extends z1 {};
  kbt.errorCode = "unsupported_grant_type";
  Obt = class Obt extends z1 {};
  Obt.errorCode = "invalid_scope";
  Ubt = class Ubt extends z1 {};
  Ubt.errorCode = "access_denied";
  rce = class rce extends z1 {};
  rce.errorCode = "server_error";
  Nbt = class Nbt extends z1 {};
  Nbt.errorCode = "temporarily_unavailable";
  Fbt = class Fbt extends z1 {};
  Fbt.errorCode = "unsupported_response_type";
  Bbt = class Bbt extends z1 {};
  Bbt.errorCode = "unsupported_token_type";
  Rbt = class Rbt extends z1 {};
  Rbt.errorCode = "invalid_token";
  Wbt = class Wbt extends z1 {};
  Wbt.errorCode = "method_not_allowed";
  Vbt = class Vbt extends z1 {};
  Vbt.errorCode = "too_many_requests";
  rPe = class rPe extends z1 {};
  rPe.errorCode = "invalid_client_metadata";
  qbt = class qbt extends z1 {};
  qbt.errorCode = "insufficient_scope";
  Gbt = class Gbt extends z1 {};
  Gbt.errorCode = "invalid_target";
  eRi = {
    [wbt.errorCode]: wbt,
    [Zje.errorCode]: Zje,
    [ePe.errorCode]: ePe,
    [tPe.errorCode]: tPe,
    [kbt.errorCode]: kbt,
    [Obt.errorCode]: Obt,
    [Ubt.errorCode]: Ubt,
    [rce.errorCode]: rce,
    [Nbt.errorCode]: Nbt,
    [Fbt.errorCode]: Fbt,
    [Bbt.errorCode]: Bbt,
    [Rbt.errorCode]: Rbt,
    [Wbt.errorCode]: Wbt,
    [Vbt.errorCode]: Vbt,
    [rPe.errorCode]: rPe,
    [qbt.errorCode]: qbt,
    [Gbt.errorCode]: Gbt,
  };
});