
var yVn = Ie(function (IVn) {
  Object.defineProperty(IVn, "__esModule", { value: !0 });
  IVn._export = void 0;
  var Tgt = kf(),
    EVn = JVe();
  function xvo(e, t) {
    return new Promise((r) => {
      Tgt.context.with(EVn.suppressTracing(Tgt.context.active()), () => {
        e.export(t, r);
      });
    });
  }
  IVn._export = xvo;
});