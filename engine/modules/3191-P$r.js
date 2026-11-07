
var P$r = Ie(function (Ivc, Vyi) {
  var Wyi = b$r();
  Vyi.exports = j$r;
  function j$r() {
    (Wyi.call(this),
      (this.screenX = this.screenY = this.clientX = this.clientY = 0),
      (this.ctrlKey = this.altKey = this.shiftKey = this.metaKey = !1),
      (this.button = 0),
      (this.buttons = 1),
      (this.relatedTarget = null));
  }
  j$r.prototype = Object.create(Wyi.prototype, {
    constructor: { value: j$r },
    initMouseEvent: {
      value: function (e, t, r, s, a, H, u, f, d, _, L, I, D, S, T) {
        switch (
          (this.initEvent(e, t, r, s, a),
          (this.screenX = H),
          (this.screenY = u),
          (this.clientX = f),
          (this.clientY = d),
          (this.ctrlKey = _),
          (this.altKey = L),
          (this.shiftKey = I),
          (this.metaKey = D),
          (this.button = S),
          S)
        ) {
          case 0:
            this.buttons = 1;
            break;
          case 1:
            this.buttons = 4;
            break;
          case 2:
            this.buttons = 2;
            break;
          default:
            this.buttons = 0;
            break;
        }
        this.relatedTarget = T;
      },
    },
    getModifierState: {
      value: function (e) {
        switch (e) {
          case "Alt":
            return this.altKey;
          case "Control":
            return this.ctrlKey;
          case "Shift":
            return this.shiftKey;
          case "Meta":
            return this.metaKey;
          default:
            return !1;
        }
      },
    },
  });
});