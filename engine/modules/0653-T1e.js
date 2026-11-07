
var T1e = ne(() => {
  n2();
  Yu();
  N6 = class N6 extends IE("HttpClientError") {
    constructor(e) {
      if ("cause" in e.reason) super({ ...e, cause: e.reason.cause });
      else super(e);
    }
    [PZt] = PZt;
    get request() {
      return this.reason.request;
    }
    get response() {
      return "response" in this.reason ? this.reason.response : void 0;
    }
    get message() {
      return this.reason.message;
    }
  };
  CZt = class CZt extends IE("TransportError") {
    get methodAndUrl() {
      return `${this.request.method} ${this.request.url}`;
    }
    get message() {
      return ERe(gRe(this._tag), this.description, this.methodAndUrl);
    }
  };
  wZt = class wZt extends IE("InvalidUrlError") {
    get methodAndUrl() {
      return `${this.request.method} ${this.request.url}`;
    }
    get message() {
      return ERe(gRe(this._tag), this.description, this.methodAndUrl);
    }
  };
  kZt = class kZt extends IE("StatusCodeError") {
    get methodAndUrl() {
      return `${this.request.method} ${this.request.url}`;
    }
    get message() {
      let e = `${this.response.status} ${this.methodAndUrl}`;
      return ERe(gRe(this._tag), this.description, e);
    }
  };
  Zie = class Zie extends IE("DecodeError") {
    get methodAndUrl() {
      return `${this.request.method} ${this.request.url}`;
    }
    get message() {
      let e = `${this.response.status} ${this.methodAndUrl}`;
      return ERe(gRe(this._tag), this.description, e);
    }
  };
  OZt = class OZt extends IE("EmptyBodyError") {
    get methodAndUrl() {
      return `${this.request.method} ${this.request.url}`;
    }
    get message() {
      let e = `${this.response.status} ${this.methodAndUrl}`;
      return ERe(gRe(this._tag), this.description, e);
    }
  };
});