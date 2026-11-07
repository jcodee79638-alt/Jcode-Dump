
var Rli = Ie(function (BTe) {
  var ozo =
    (BTe && BTe.__importDefault) ||
    function (e) {
      return e && e.__esModule ? e : { default: e };
    };
  Object.defineProperty(BTe, "__esModule", { value: !0 });
  BTe.verifySignature = void 0;
  var Bli = Udr(),
    azo = ozo(cr("crypto")),
    Hzo = (e, t, r) => {
      let s = Buffer.from(Bli.canonicalize(e));
      return azo.default.verify(void 0, s, t, Buffer.from(r, "hex"));
    };
  BTe.verifySignature = Hzo;
});