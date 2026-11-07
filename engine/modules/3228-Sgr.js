
var Sgr = Ie(function (obc, RMi) {
  var FMi = J$r(),
    a$a = fxt().isApiWritable;
  RMi.exports = function (e, t, r, s) {
    var a = e.ctor;
    if (a) {
      var H = e.props || {};
      if (e.attributes)
        for (var u in e.attributes) {
          var f = e.attributes[u];
          if (typeof f !== "object" || Array.isArray(f)) f = { type: f };
          if (!f.name) f.name = u.toLowerCase();
          H[u] = FMi.property(f);
        }
      if (
        ((H.constructor = { value: a, writable: a$a }),
        (a.prototype = Object.create((e.superclass || t).prototype, H)),
        e.events)
      )
        c$a(a, e.events);
      r[e.name] = a;
    } else a = t;
    return (
      (e.tags || (e.tag && [e.tag]) || []).forEach(function (d) {
        s[d] = a;
      }),
      a
    );
  };
  function BMi(e, t, r, s) {
    ((this.body = e), (this.document = t), (this.form = r), (this.element = s));
  }
  BMi.prototype.build = function () {
    return () => {};
  };
  function H$a(e, t, r, s) {
    var a = e.ownerDocument || Object.create(null),
      H = e.form || Object.create(null);
    e[t] = new BMi(s, a, H, e).build();
  }
  function c$a(e, t) {
    var r = e.prototype;
    t.forEach(function (s) {
      (Object.defineProperty(r, "on" + s, {
        get: function () {
          return this._getEventHandler(s);
        },
        set: function (a) {
          this._setEventHandler(s, a);
        },
      }),
        FMi.registerChangeHandler(e, "on" + s, H$a));
    });
  }
});