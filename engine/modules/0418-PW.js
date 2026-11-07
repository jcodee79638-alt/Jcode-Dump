
var PW = ne(() => {
  n2();
  NQ = class NQ extends IE("BadArgument") {
    get message() {
      return `${this.module}.${this.method}${this.description ? `: ${this.description}` : ""}`;
    }
  };
  Jan = class Jan extends Zut {
    get message() {
      return `${this._tag}: ${this.module}.${this.method}${this.pathOrDescriptor !== void 0 ? ` (${this.pathOrDescriptor})` : ""}${this.description ? `: ${this.description}` : ""}`;
    }
  };
  rYt = class rYt extends IE("PlatformError") {
    constructor(e) {
      if ("cause" in e) super({ reason: e, cause: e.cause });
      else super({ reason: e });
    }
    [Xan] = Xan;
    get message() {
      return this.reason.message;
    }
  };
});