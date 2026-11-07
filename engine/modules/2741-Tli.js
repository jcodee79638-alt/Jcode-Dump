
var Tli = Ie(function (z4e) {
  var Sli =
    (z4e && z4e.__importDefault) ||
    function (e) {
      return e && e.__esModule ? e : { default: e };
    };
  Object.defineProperty(z4e, "__esModule", { value: !0 });
  z4e.appDataPath = WKo;
  var RKo = Sli(cr("os")),
    FTe = Sli(cr("path"));
  function WKo(e) {
    let t = RKo.default.homedir();
    switch ("win32") {
      case "darwin": {
        let r = FTe.default.join(t, "Library", "Application Support");
        return FTe.default.join(r, e);
      }
      case "win32": {
        let r = process.env.LOCALAPPDATA || FTe.default.join(t, "AppData", "Local");
        return FTe.default.join(r, e, "Data");
      }
      default: {
        let r = process.env.XDG_DATA_HOME || FTe.default.join(t, ".local", "share");
        return FTe.default.join(r, e);
      }
    }
  }
});