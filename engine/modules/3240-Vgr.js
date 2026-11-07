
var Vgr = Ie(function ($bc, Wxi) {
  var uga = $Ge(),
    lga = C$r(),
    fga = Oxi(),
    EGe = kD();
  Wxi.exports = Wxt;
  function Wxt(e) {
    ((this.document = e || new uga(null).createHTMLDocument("")),
      (this.document._scripting_enabled = !0),
      (this.document.defaultView = this),
      (this.location = new fga(this, this.document._address || "about:blank")));
  }
  Wxt.prototype = Object.create(lga.prototype, {
    console: { value: console },
    history: { value: { back: EGe.nyi, forward: EGe.nyi, go: EGe.nyi } },
    navigator: { value: Nxi() },
    window: {
      get: function () {
        return this;
      },
    },
    self: {
      get: function () {
        return this;
      },
    },
    frames: {
      get: function () {
        return this;
      },
    },
    parent: {
      get: function () {
        return this;
      },
    },
    top: {
      get: function () {
        return this;
      },
    },
    length: { value: 0 },
    frameElement: { value: null },
    opener: { value: null },
    onload: {
      get: function () {
        return this._getEventHandler("load");
      },
      set: function (e) {
        this._setEventHandler("load", e);
      },
    },
    getComputedStyle: {
      value: function (t) {
        return t.style;
      },
    },
  });
  EGe.expose(Bxi(), Wxt);
  EGe.expose(Wgr(), Wxt);
});