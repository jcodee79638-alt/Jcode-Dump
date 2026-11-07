
var J$r = Ie(function (hLa) {
  var g1i = kD();
  hLa.property = function (e) {
    if (Array.isArray(e.type)) {
      var t = Object.create(null);
      e.type.forEach(function (a) {
        t[a.value || a] = a.alias || a;
      });
      var r = e.missing;
      if (r === void 0) r = null;
      var s = e.invalid;
      if (s === void 0) s = r;
      return {
        get: function () {
          var a = this._getattr(e.name);
          if (a === null) return r;
          if (((a = t[a.toLowerCase()]), a !== void 0)) return a;
          if (s !== null) return s;
          return a;
        },
        set: function (a) {
          this._setattr(e.name, a);
        },
      };
    } else if (e.type === Boolean)
      return {
        get: function () {
          return this.hasAttribute(e.name);
        },
        set: function (a) {
          if (a) this._setattr(e.name, "");
          else this.removeAttribute(e.name);
        },
      };
    else if (
      e.type === Number ||
      e.type === "long" ||
      e.type === "unsigned long" ||
      e.type === "limited unsigned long with fallback"
    )
      return _La(e);
    else if (!e.type || e.type === String)
      return {
        get: function () {
          return this._getattr(e.name) || "";
        },
        set: function (a) {
          if (e.treatNullAsEmptyString && a === null) a = "";
          this._setattr(e.name, a);
        },
      };
    else if (typeof e.type === "function") return e.type(e.name, e);
    throw Error("Invalid attribute definition");
  };
  function _La(e) {
    var t;
    if (typeof e.default === "function") t = e.default;
    else if (typeof e.default === "number")
      t = function () {
        return e.default;
      };
    else
      t = function () {
        g1i.assert(!1, typeof e.default);
      };
    var r = e.type === "unsigned long",
      s = e.type === "long",
      a = e.type === "limited unsigned long with fallback",
      { min: H, max: u, setmin: f } = e;
    if (H === void 0) {
      if (r) H = 0;
      if (s) H = -2147483648;
      if (a) H = 1;
    }
    if (u === void 0) {
      if (r || s || a) u = 2147483647;
    }
    return {
      get: function () {
        var d = this._getattr(e.name),
          _ = e.float ? parseFloat(d) : parseInt(d, 10);
        if (d === null || !isFinite(_) || (H !== void 0 && _ < H) || (u !== void 0 && _ > u))
          return t.call(this);
        if (r || s || a) {
          if (!/^[ \t\n\f\r]*[-+]?[0-9]/.test(d)) return t.call(this);
          _ = _ | 0;
        }
        return _;
      },
      set: function (d) {
        if (!e.float) d = Math.floor(d);
        if (f !== void 0 && d < f) g1i.IndexSizeError(e.name + " set to " + d);
        if (r) d = d < 0 || d > 2147483647 ? t.call(this) : d | 0;
        else if (a) d = d < 1 || d > 2147483647 ? t.call(this) : d | 0;
        else if (s) d = d < -2147483648 || d > 2147483647 ? t.call(this) : d | 0;
        this._setattr(e.name, String(d));
      },
    };
  }
  hLa.registerChangeHandler = function (e, t, r) {
    var s = e.prototype;
    if (!Object.prototype.hasOwnProperty.call(s, "_attributeChangeHandlers"))
      s._attributeChangeHandlers = Object.create(s._attributeChangeHandlers || null);
    s._attributeChangeHandlers[t] = r;
  };
});