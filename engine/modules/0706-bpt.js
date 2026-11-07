
var bpt = ne(() => {
  R0();
  Jg();
  kpe();
  YA();
  n2();
  BH();
  lD();
  RQ();
  KH();
  mI();
  Hf();
  Bpe();
  TQ();
  aL();
  nZt();
  tse();
  aln();
  cln = class cln extends Zut {};
  Ey = class Ey extends IE("MultipartError") {
    static fromReason(e, t) {
      return new Ey({ reason: new cln({ _tag: e, cause: t }) });
    }
    [Hln] = Hln;
    get message() {
      return this.reason._tag;
    }
  };
  Tpt = class Tpt extends _W {
    [sse];
    constructor() {
      super();
      this[sse] = sse;
    }
  };
  uln = class uln extends Tpt {
    _tag = "Field";
    key;
    contentType;
    value;
    constructor(e, t, r) {
      super();
      ((this.key = e), (this.contentType = t), (this.value = r));
    }
    toJSON() {
      return {
        _id: "@effect/platform/Multipart/Part",
        _tag: "Field",
        key: this.key,
        contentType: this.contentType,
        value: this.value,
      };
    }
  };
  lln = class lln extends Tpt {
    _tag = "File";
    key;
    name;
    contentType;
    content;
    contentEffect;
    constructor(e, t) {
      super();
      ((this.key = e.name),
        (this.name = e.filename ?? e.name),
        (this.contentType = e.contentType),
        (this.content = Hd(t)),
        (this.contentEffect = t.pipe(
          n3s,
          Zo((r) => Ey.fromReason("InternalError", r)),
        )));
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
  fln = class fln extends Tpt {
    _tag = "PersistedFile";
    key;
    name;
    contentType;
    path;
    constructor(e, t, r, s) {
      super();
      ((this.key = e), (this.name = t), (this.contentType = r), (this.path = s));
    }
    toJSON() {
      return {
        _id: "@effect/platform/Multipart/Part",
        _tag: "PersistedFile",
        key: this.key,
        name: this.name,
        contentType: this.contentType,
        path: this.path,
      };
    }
  };
  ((pln = bA("effect/http/Multipart/MaxParts", {
    defaultValue: () => {
      return;
    },
  })),
    (dln = bA("effect/http/Multipart/MaxFieldSize", { defaultValue: ph(NU(10485760)) })),
    (mln = bA("effect/http/Multipart/MaxFileSize", {
      defaultValue: () => {
        return;
      },
    })),
    (_ln = bA("effect/http/Multipart/FieldMimeTypes", { defaultValue: ph(["application/json"]) })));
});