
var kfi = Ie(function (sve) {
  var Qdr =
    (sve && sve.__importDefault) ||
    function (e) {
      return e && e.__esModule ? e : { default: e };
    };
  Object.defineProperty(sve, "__esModule", { value: !0 });
  sve.withTempFile = void 0;
  var zdr = Qdr(cr("fs/promises")),
    hQo = Qdr(cr("os")),
    wfi = Qdr(cr("path")),
    LQo = async (e) => $Qo(async (t) => e(wfi.default.join(t, "tempfile")));
  sve.withTempFile = LQo;
  var $Qo = async (e) => {
    let t = await zdr.default.realpath(hQo.default.tmpdir()),
      r = await zdr.default.mkdtemp(t + wfi.default.sep);
    try {
      return await e(r);
    } finally {
      await zdr.default.rm(r, { force: !0, recursive: !0, maxRetries: 3 });
    }
  };
});