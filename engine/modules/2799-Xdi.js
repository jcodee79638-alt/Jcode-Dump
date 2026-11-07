
var Xdi = Ie(function (EN) {
  Object.defineProperty(EN, "__esModule", { value: !0 });
  EN.verify =
    EN.sign =
    EN.createVerifier =
    EN.attest =
    EN.VerificationError =
    EN.PolicyError =
    EN.TUFError =
    EN.InternalError =
    EN.DEFAULT_REKOR_URL =
    EN.DEFAULT_FULCIO_URL =
    EN.ValidationError =
      void 0;
  var ZZo = B4e();
  Object.defineProperty(EN, "ValidationError", {
    enumerable: !0,
    get: function () {
      return ZZo.ValidationError;
    },
  });
  var dmr = wdr();
  Object.defineProperty(EN, "DEFAULT_FULCIO_URL", {
    enumerable: !0,
    get: function () {
      return dmr.DEFAULT_FULCIO_URL;
    },
  });
  Object.defineProperty(EN, "DEFAULT_REKOR_URL", {
    enumerable: !0,
    get: function () {
      return dmr.DEFAULT_REKOR_URL;
    },
  });
  Object.defineProperty(EN, "InternalError", {
    enumerable: !0,
    get: function () {
      return dmr.InternalError;
    },
  });
  var eea = byt();
  Object.defineProperty(EN, "TUFError", {
    enumerable: !0,
    get: function () {
      return eea.TUFError;
    },
  });
  var Gdi = Byt();
  Object.defineProperty(EN, "PolicyError", {
    enumerable: !0,
    get: function () {
      return Gdi.PolicyError;
    },
  });
  Object.defineProperty(EN, "VerificationError", {
    enumerable: !0,
    get: function () {
      return Gdi.VerificationError;
    },
  });
  var Wyt = qdi();
  Object.defineProperty(EN, "attest", {
    enumerable: !0,
    get: function () {
      return Wyt.attest;
    },
  });
  Object.defineProperty(EN, "createVerifier", {
    enumerable: !0,
    get: function () {
      return Wyt.createVerifier;
    },
  });
  Object.defineProperty(EN, "sign", {
    enumerable: !0,
    get: function () {
      return Wyt.sign;
    },
  });
  Object.defineProperty(EN, "verify", {
    enumerable: !0,
    get: function () {
      return Wyt.verify;
    },
  });
});