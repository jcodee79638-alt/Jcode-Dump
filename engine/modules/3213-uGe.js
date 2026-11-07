
var uGe = Ie(function (Vvc, Q1i) {
  Q1i.exports = yxt;
  var z1i = cgr(),
    K1i = kD(),
    GLa = Ext(),
    XLa = tgr();
  function yxt() {
    z1i.call(this);
  }
  yxt.prototype = Object.create(z1i.prototype, {
    substringData: {
      value: function (t, r) {
        if (arguments.length < 2) throw TypeError("Not enough arguments");
        if (((t = t >>> 0), (r = r >>> 0), t > this.data.length || t < 0 || r < 0)) K1i.IndexSizeError();
        return this.data.substring(t, t + r);
      },
    },
    appendData: {
      value: function (t) {
        if (arguments.length < 1) throw TypeError("Not enough arguments");
        this.data += String(t);
      },
    },
    insertData: {
      value: function (t, r) {
        return this.replaceData(t, 0, r);
      },
    },
    deleteData: {
      value: function (t, r) {
        return this.replaceData(t, r, "");
      },
    },
    replaceData: {
      value: function (t, r, s) {
        var a = this.data,
          H = a.length;
        if (((t = t >>> 0), (r = r >>> 0), (s = String(s)), t > H || t < 0)) K1i.IndexSizeError();
        if (t + r > H) r = H - t;
        var u = a.substring(0, t),
          f = a.substring(t + r);
        this.data = u + s + f;
      },
    },
    isEqual: {
      value: function (t) {
        return this._data === t._data;
      },
    },
    length: {
      get: function () {
        return this.data.length;
      },
    },
  });
  Object.defineProperties(yxt.prototype, GLa);
  Object.defineProperties(yxt.prototype, XLa);
});