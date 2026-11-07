
var tde = ne(() => {
  Jg();
  YA();
  n2();
  BH();
  upt();
  KH();
  Hf();
  Yu();
  ppt();
  p2();
  Nv = class Nv extends IE("HttpServerError") {
    constructor(e) {
      if ("cause" in e.reason) super({ ...e, cause: e.reason.cause });
      else super(e);
    }
    [ner] = ner;
    stack = `${this.name}: ${this.message}`;
    get request() {
      return this.reason.request;
    }
    get response() {
      return "response" in this.reason ? this.reason.response : void 0;
    }
    [kj]() {
      return this.reason[kj]();
    }
    get [ZW]() {
      return this.reason[ZW] ?? !1;
    }
    get message() {
      return this.reason.message;
    }
  };
  d2 = class d2 extends IE("RequestParseError") {
    [kj]() {
      return Jt(Rd({ status: 400 }));
    }
    get methodAndUrl() {
      return `${this.request.method} ${this.request.url}`;
    }
    get message() {
      return Oun(this._tag, this.description, this.methodAndUrl);
    }
  };
  ier = class ier extends IE("RouteNotFound") {
    [kj]() {
      return Jt(Rd({ status: 404 }));
    }
    [ZW] = !0;
    get methodAndUrl() {
      return `${this.request.method} ${this.request.url}`;
    }
    get message() {
      return Oun(this._tag, this.description, this.methodAndUrl);
    }
  };
  mpt = class mpt extends IE("ResponseError") {
    [kj]() {
      return Jt(Rd({ status: 500 }));
    }
    get methodAndUrl() {
      return `${this.request.method} ${this.request.url}`;
    }
    get message() {
      let e = `${this._tag} (${this.response.status} ${this.methodAndUrl})`;
      return this.description ? `${e}: ${this.description}` : e;
    }
  };
  ser = class ser extends IE("ServeError") {};
  ede = class ede extends _i()("effect/http/HttpServerError/ClientAbort") {
    static annotation = this.context(!0).pipe(Oh(rQt, { name: "ClientAbort", stack: IU, parent: void 0 }));
  };
  ((dpt = Rd({ status: 500 })),
    ($Rs = Jt(dpt)),
    (gRs = Jt(Rd({ status: 499 }))),
    (ERs = Jt(Rd({ status: 503 }))));
});