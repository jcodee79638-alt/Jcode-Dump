
var fAi = Ie(function (CTe) {
  var hJo =
    (CTe && CTe.__importDefault) ||
    function (e) {
      return e && e.__esModule ? e : { default: e };
    };
  Object.defineProperty(CTe, "__esModule", { value: !0 });
  CTe.getUserAgent = void 0;
  var lAi = hJo(cr("os")),
    LJo = () => {
      let e = uAi().version,
        t = process.version,
        r = lAi.default.platform(),
        s = lAi.default.arch();
      return `sigstore-js/${e} (Node ${t}) (${r}/${s})`;
    };
  CTe.getUserAgent = LJo;
});