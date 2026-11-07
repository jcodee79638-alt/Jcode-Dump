
var Cgt = Ie(function (e7n) {
  Object.defineProperty(e7n, "__esModule", { value: !0 });
  e7n.execAsync = void 0;
  var YVn = cr("child_process"),
    ZVn = cr("util");
  e7n.execAsync = ZVn.promisify(YVn.exec);
});