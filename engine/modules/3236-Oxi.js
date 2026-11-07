
var Oxi = Ie(function (_bc, kxi) {
  var aga = xxt(),
    Hga = xgr();
  kxi.exports = Bgr;
  function Bgr(e, t) {
    ((this._window = e), (this._href = t));
  }
  Bgr.prototype = Object.create(Hga.prototype, {
    constructor: { value: Bgr },
    href: {
      get: function () {
        return this._href;
      },
      set: function (e) {
        this.assign(e);
      },
    },
    assign: {
      value: function (e) {
        var t = new aga(this._href),
          r = t.resolve(e);
        this._href = r;
      },
    },
    replace: {
      value: function (e) {
        this.assign(e);
      },
    },
    reload: {
      value: function () {
        this.assign(this.href);
      },
    },
    toString: {
      value: function () {
        return this.href;
      },
    },
  });
});