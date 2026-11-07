
var ifn = ne(() => {
  BH();
  mI();
  aL();
  bpt();
  Yln();
  Bpt();
  ker = class ker extends _W {
    [sse];
    constructor() {
      super();
      this[sse] = sse;
    }
  };
  rfn = class rfn extends ker {
    _tag = "Field";
    key;
    contentType;
    value;
    constructor(e, t) {
      super();
      ((this.key = e.name), (this.contentType = e.contentType), (this.value = CRe(e, t)));
    }
    toJSON() {
      return {
        _id: "@effect/platform/Multipart/Part",
        _tag: "Field",
        key: this.key,
        value: this.value,
        contentType: this.contentType,
      };
    }
  };
  nfn = class nfn extends ker {
    _tag = "File";
    key;
    name;
    contentType;
    content;
    contentEffect;
    file;
    constructor(e) {
      super();
      ((this.file = e),
        (this.key = e.info.name),
        (this.name = e.filename ?? e.info.name),
        (this.contentType = e.info.contentType),
        (this.content = B6({ evaluate: () => e, onError: (t) => Ey.fromReason("InternalError", t) })),
        (this.contentEffect = Pln(() => e, { onError: (t) => Ey.fromReason("InternalError", t) })));
    }
    toJSON() {
      return {
        _id: "@effect/platform/Multipart/Part",
        _tag: "File",
        key: this.key,
        name: this.name,
        contentType: this.contentType,
      };
    }
  };
});