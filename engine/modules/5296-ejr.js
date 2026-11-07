
var ejr = Ie(function (Xqi) {
  Object.defineProperty(Xqi, "__esModule", { value: !0 });
  Xqi.Message =
    Xqi.NotificationType9 =
    Xqi.NotificationType8 =
    Xqi.NotificationType7 =
    Xqi.NotificationType6 =
    Xqi.NotificationType5 =
    Xqi.NotificationType4 =
    Xqi.NotificationType3 =
    Xqi.NotificationType2 =
    Xqi.NotificationType1 =
    Xqi.NotificationType0 =
    Xqi.NotificationType =
    Xqi.RequestType9 =
    Xqi.RequestType8 =
    Xqi.RequestType7 =
    Xqi.RequestType6 =
    Xqi.RequestType5 =
    Xqi.RequestType4 =
    Xqi.RequestType3 =
    Xqi.RequestType2 =
    Xqi.RequestType1 =
    Xqi.RequestType =
    Xqi.RequestType0 =
    Xqi.AbstractMessageSignature =
    Xqi.ParameterStructures =
    Xqi.ResponseError =
    Xqi.ErrorCodes =
      void 0;
  var eO = UCe(),
    Ybr;
  (function (e) {
    ((e.ParseError = -32700),
      (e.InvalidRequest = -32600),
      (e.MethodNotFound = -32601),
      (e.InvalidParams = -32602),
      (e.InternalError = -32603),
      (e.jsonrpcReservedErrorRangeStart = -32099),
      (e.serverErrorStart = -32099),
      (e.MessageWriteError = -32099),
      (e.MessageReadError = -32098),
      (e.PendingResponseRejected = -32097),
      (e.ConnectionInactive = -32096),
      (e.ServerNotInitialized = -32002),
      (e.UnknownErrorCode = -32001),
      (e.jsonrpcReservedErrorRangeEnd = -32000),
      (e.serverErrorEnd = -32000));
  })(Ybr || (Xqi.ErrorCodes = Ybr = {}));
  class Zbr extends Error {
    constructor(e, t, r) {
      super(t);
      ((this.code = eO.number(e) ? e : Ybr.UnknownErrorCode),
        (this.data = r),
        Object.setPrototypeOf(this, Zbr.prototype));
    }
    toJson() {
      let e = { code: this.code, message: this.message };
      if (this.data !== void 0) e.data = this.data;
      return e;
    }
  }
  Xqi.ResponseError = Zbr;
  class CP {
    constructor(e) {
      this.kind = e;
    }
    static is(e) {
      return e === CP.auto || e === CP.byName || e === CP.byPosition;
    }
    toString() {
      return this.kind;
    }
  }
  Xqi.ParameterStructures = CP;
  CP.auto = new CP("auto");
  CP.byPosition = new CP("byPosition");
  CP.byName = new CP("byName");
  class VE {
    constructor(e, t) {
      ((this.method = e), (this.numberOfParams = t));
    }
    get parameterStructures() {
      return CP.auto;
    }
  }
  Xqi.AbstractMessageSignature = VE;
  class yqi extends VE {
    constructor(e) {
      super(e, 0);
    }
  }
  Xqi.RequestType0 = yqi;
  class Mqi extends VE {
    constructor(e, t = CP.auto) {
      super(e, 1);
      this._parameterStructures = t;
    }
    get parameterStructures() {
      return this._parameterStructures;
    }
  }
  Xqi.RequestType = Mqi;
  class xqi extends VE {
    constructor(e, t = CP.auto) {
      super(e, 1);
      this._parameterStructures = t;
    }
    get parameterStructures() {
      return this._parameterStructures;
    }
  }
  Xqi.RequestType1 = xqi;
  class Sqi extends VE {
    constructor(e) {
      super(e, 2);
    }
  }
  Xqi.RequestType2 = Sqi;
  class Tqi extends VE {
    constructor(e) {
      super(e, 3);
    }
  }
  Xqi.RequestType3 = Tqi;
  class vqi extends VE {
    constructor(e) {
      super(e, 4);
    }
  }
  Xqi.RequestType4 = vqi;
  class bqi extends VE {
    constructor(e) {
      super(e, 5);
    }
  }
  Xqi.RequestType5 = bqi;
  class jqi extends VE {
    constructor(e) {
      super(e, 6);
    }
  }
  Xqi.RequestType6 = jqi;
  class Pqi extends VE {
    constructor(e) {
      super(e, 7);
    }
  }
  Xqi.RequestType7 = Pqi;
  class Cqi extends VE {
    constructor(e) {
      super(e, 8);
    }
  }
  Xqi.RequestType8 = Cqi;
  class wqi extends VE {
    constructor(e) {
      super(e, 9);
    }
  }
  Xqi.RequestType9 = wqi;
  class kqi extends VE {
    constructor(e, t = CP.auto) {
      super(e, 1);
      this._parameterStructures = t;
    }
    get parameterStructures() {
      return this._parameterStructures;
    }
  }
  Xqi.NotificationType = kqi;
  class Oqi extends VE {
    constructor(e) {
      super(e, 0);
    }
  }
  Xqi.NotificationType0 = Oqi;
  class Uqi extends VE {
    constructor(e, t = CP.auto) {
      super(e, 1);
      this._parameterStructures = t;
    }
    get parameterStructures() {
      return this._parameterStructures;
    }
  }
  Xqi.NotificationType1 = Uqi;
  class Nqi extends VE {
    constructor(e) {
      super(e, 2);
    }
  }
  Xqi.NotificationType2 = Nqi;
  class Fqi extends VE {
    constructor(e) {
      super(e, 3);
    }
  }
  Xqi.NotificationType3 = Fqi;
  class Bqi extends VE {
    constructor(e) {
      super(e, 4);
    }
  }
  Xqi.NotificationType4 = Bqi;
  class Rqi extends VE {
    constructor(e) {
      super(e, 5);
    }
  }
  Xqi.NotificationType5 = Rqi;
  class Wqi extends VE {
    constructor(e) {
      super(e, 6);
    }
  }
  Xqi.NotificationType6 = Wqi;
  class Vqi extends VE {
    constructor(e) {
      super(e, 7);
    }
  }
  Xqi.NotificationType7 = Vqi;
  class qqi extends VE {
    constructor(e) {
      super(e, 8);
    }
  }
  Xqi.NotificationType8 = qqi;
  class Gqi extends VE {
    constructor(e) {
      super(e, 9);
    }
  }
  Xqi.NotificationType9 = Gqi;
  var Dqi;
  (function (e) {
    function t(a) {
      let H = a;
      return H && eO.string(H.method) && (eO.string(H.id) || eO.number(H.id));
    }
    e.isRequest = t;
    function r(a) {
      let H = a;
      return H && eO.string(H.method) && a.id === void 0;
    }
    e.isNotification = r;
    function s(a) {
      let H = a;
      return H && (H.result !== void 0 || !!H.error) && (eO.string(H.id) || eO.number(H.id) || H.id === null);
    }
    e.isResponse = s;
  })(Dqi || (Xqi.Message = Dqi = {}));
});