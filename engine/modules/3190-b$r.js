
var b$r = Ie(function (Evc, Ryi) {
  var Byi = dbe();
  Ryi.exports = v$r;
  function v$r() {
    (Byi.call(this), (this.view = null), (this.detail = 0));
  }
  v$r.prototype = Object.create(Byi.prototype, {
    constructor: { value: v$r },
    initUIEvent: {
      value: function (e, t, r, s, a) {
        (this.initEvent(e, t, r), (this.view = s), (this.detail = a));
      },
    },
  });
});