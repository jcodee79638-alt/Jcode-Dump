
var kVn = Ie(function (CVn) {
  Object.defineProperty(CVn, "__esModule", { value: !0 });
  CVn.isPromiseLike = void 0;
  var Wvo = (e) => e !== null && typeof e === "object" && typeof e.then === "function";
  CVn.isPromiseLike = Wvo;
});