
var b1e = ne(() => {
  n2();
  BH();
  FM();
  mI();
  Ov();
  g1e();
  RZt = class RZt extends IE("HttpBodyError") {
    [lun] = lun;
  };
  IRe = class IRe {
    [BZt];
    constructor() {
      this[BZt] = BZt;
    }
    [F0]() {
      return this.toJSON();
    }
    toString() {
      return af(this, { ignoreToString: !0 });
    }
  };
  fun = class fun extends IRe {
    _tag = "Empty";
    toJSON() {
      return { _id: "effect/HttpBody", _tag: "Empty" };
    }
  };
  Qpe = new fun();
  pun = class pun extends IRe {
    _tag = "Raw";
    body;
    contentType;
    contentLength;
    constructor(e, t, r) {
      super();
      ((this.body = e), (this.contentType = t), (this.contentLength = r));
    }
    toJSON() {
      return {
        _id: "effect/HttpBody",
        _tag: "Raw",
        body: this.body,
        contentType: this.contentType,
        contentLength: this.contentLength,
      };
    }
  };
  dun = class dun extends IRe {
    _tag = "Uint8Array";
    body;
    contentType;
    contentLength;
    constructor(e, t, r) {
      super();
      ((this.body = e), (this.contentType = t), (this.contentLength = r));
    }
    toJSON() {
      return {
        _id: "effect/HttpBody",
        _tag: "Uint8Array",
        body:
          this.contentType.startsWith("text/") || this.contentType.endsWith("json")
            ? new TextDecoder().decode(this.body)
            : `Uint8Array(${this.body.length})`,
        contentType: this.contentType,
        contentLength: this.contentLength,
      };
    }
  };
  qBs = new TextEncoder();
  mun = class mun extends IRe {
    _tag = "Stream";
    stream;
    contentType;
    contentLength;
    constructor(e, t, r) {
      super();
      ((this.stream = e), (this.contentType = t), (this.contentLength = r));
    }
    toJSON() {
      return {
        _id: "effect/HttpBody",
        _tag: "Stream",
        contentType: this.contentType,
        contentLength: this.contentLength,
      };
    }
  };
});