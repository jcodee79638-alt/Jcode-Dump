
var tMr = Ie(function (z8, eMr) {
  Object.defineProperty(z8, "__esModule", { value: !0 });
  z8.MissingRefError =
    z8.ValidationError =
    z8.CodeGen =
    z8.Name =
    z8.nil =
    z8.stringify =
    z8.str =
    z8._ =
    z8.KeywordCxt =
    z8.Ajv =
      void 0;
  var zNa = aFi(),
    QNa = iBi(),
    YNa = uBi(),
    fBi = lBi(),
    ZNa = ["/properties"],
    Tbt = "http://json-schema.org/draft-07/schema";
  class BXe extends zNa.default {
    _addVocabularies() {
      if (
        (super._addVocabularies(), QNa.default.forEach((e) => this.addVocabulary(e)), this.opts.discriminator)
      )
        this.addKeyword(YNa.default);
    }
    _addDefaultMetaSchema() {
      if ((super._addDefaultMetaSchema(), !this.opts.meta)) return;
      let e = this.opts.$data ? this.$dataMetaSchema(fBi, ZNa) : fBi;
      (this.addMetaSchema(e, Tbt, !1), (this.refs["http://json-schema.org/schema"] = Tbt));
    }
    defaultMeta() {
      return (this.opts.defaultMeta = super.defaultMeta() || (this.getSchema(Tbt) ? Tbt : void 0));
    }
  }
  z8.Ajv = BXe;
  eMr.exports = z8 = BXe;
  eMr.exports.Ajv = BXe;
  Object.defineProperty(z8, "__esModule", { value: !0 });
  z8.default = BXe;
  var e9a = kXe();
  Object.defineProperty(z8, "KeywordCxt", {
    enumerable: !0,
    get: function () {
      return e9a.KeywordCxt;
    },
  });
  var Jje = fd();
  Object.defineProperty(z8, "_", {
    enumerable: !0,
    get: function () {
      return Jje._;
    },
  });
  Object.defineProperty(z8, "str", {
    enumerable: !0,
    get: function () {
      return Jje.str;
    },
  });
  Object.defineProperty(z8, "stringify", {
    enumerable: !0,
    get: function () {
      return Jje.stringify;
    },
  });
  Object.defineProperty(z8, "nil", {
    enumerable: !0,
    get: function () {
      return Jje.nil;
    },
  });
  Object.defineProperty(z8, "Name", {
    enumerable: !0,
    get: function () {
      return Jje.Name;
    },
  });
  Object.defineProperty(z8, "CodeGen", {
    enumerable: !0,
    get: function () {
      return Jje.CodeGen;
    },
  });
  var t9a = nbt();
  Object.defineProperty(z8, "ValidationError", {
    enumerable: !0,
    get: function () {
      return t9a.default;
    },
  });
  var r9a = OXe();
  Object.defineProperty(z8, "MissingRefError", {
    enumerable: !0,
    get: function () {
      return r9a.default;
    },
  });
});