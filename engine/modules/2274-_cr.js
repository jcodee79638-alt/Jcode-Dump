
var _cr = Ie(function (v7n) {
  Object.defineProperty(v7n, "__esModule", { value: !0 });
  v7n.normalizeType = v7n.normalizeArch = void 0;
  var Nbo = (e) => {
    switch (e) {
      case "arm":
        return "arm32";
      case "ppc":
        return "ppc32";
      case "x64":
        return "amd64";
      default:
        return e;
    }
  };
  v7n.normalizeArch = Nbo;
  var Fbo = (e) => {
    switch (e) {
      case "sunos":
        return "solaris";
      case "win32":
        return "windows";
      default:
        return e;
    }
  };
  v7n.normalizeType = Fbo;
});