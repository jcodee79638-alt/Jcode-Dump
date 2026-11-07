
var z$r = Ie(function (Uvc, x1i) {
  var K$r = kD();
  x1i.exports = M1i;
  function M1i(e, t) {
    ((this._getString = e),
      (this._setString = t),
      (this._length = 0),
      (this._lastStringValue = ""),
      this._update());
  }
  Object.defineProperties(M1i.prototype, {
    length: {
      get: function () {
        return this._length;
      },
    },
    item: {
      value: function (e) {
        var t = mbe(this);
        if (e < 0 || e >= t.length) return null;
        return t[e];
      },
    },
    contains: {
      value: function (e) {
        e = String(e);
        var t = mbe(this);
        return t.indexOf(e) > -1;
      },
    },
    add: {
      value: function () {
        var e = mbe(this);
        for (var t = 0, r = arguments.length; t < r; t++) {
          var s = aGe(arguments[t]);
          if (e.indexOf(s) < 0) e.push(s);
        }
        this._update(e);
      },
    },
    remove: {
      value: function () {
        var e = mbe(this);
        for (var t = 0, r = arguments.length; t < r; t++) {
          var s = aGe(arguments[t]),
            a = e.indexOf(s);
          if (a > -1) e.splice(a, 1);
        }
        this._update(e);
      },
    },
    toggle: {
      value: function (t, r) {
        if (((t = aGe(t)), this.contains(t))) {
          if (r === void 0 || r === !1) return (this.remove(t), !1);
          return !0;
        } else {
          if (r === void 0 || r === !0) return (this.add(t), !0);
          return !1;
        }
      },
    },
    replace: {
      value: function (t, r) {
        if (String(r) === "") K$r.SyntaxError();
        ((t = aGe(t)), (r = aGe(r)));
        var s = mbe(this),
          a = s.indexOf(t);
        if (a < 0) return !1;
        var H = s.indexOf(r);
        if (H < 0) s[a] = r;
        else if (a < H) ((s[a] = r), s.splice(H, 1));
        else s.splice(a, 1);
        return (this._update(s), !0);
      },
    },
    toString: {
      value: function () {
        return this._getString();
      },
    },
    value: {
      get: function () {
        return this._getString();
      },
      set: function (e) {
        (this._setString(e), this._update());
      },
    },
    _update: {
      value: function (e) {
        if (e) (y1i(this, e), this._setString(e.join(" ").trim()));
        else y1i(this, mbe(this));
        this._lastStringValue = this._getString();
      },
    },
  });
  function y1i(e, t) {
    var r = e._length,
      s;
    e._length = t.length;
    for (s = 0; s < t.length; s++) e[s] = t[s];
    for (; s < r; s++) e[s] = void 0;
  }
  function aGe(e) {
    if (((e = String(e)), e === "")) K$r.SyntaxError();
    if (/[ \t\r\n\f]/.test(e)) K$r.InvalidCharacterError();
    return e;
  }
  function ELa(e) {
    var t = e._length,
      r = Array(t);
    for (var s = 0; s < t; s++) r[s] = e[s];
    return r;
  }
  function mbe(e) {
    var t = e._getString();
    if (t === e._lastStringValue) return ELa(e);
    var r = t.replace(/(^[ \t\r\n\f]+)|([ \t\r\n\f]+$)/g, "");
    if (r === "") return [];
    else {
      var s = Object.create(null);
      return r.split(/[ \t\r\n\f]+/g).filter(function (a) {
        var H = "$" + a;
        if (s[H]) return !1;
        return ((s[H] = !0), !0);
      });
    }
  }
});