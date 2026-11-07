
var Sxt = Ie(function (ibc, UMi) {
  var { parse: o$a } = PMi();
  UMi.exports = function (e) {
    let t = new OMi(e);
    return new Proxy(t, {
      get: function (s, a) {
        return a in s ? s[a] : s.getPropertyValue(CMi(a));
      },
      has: function (s, a) {
        return !0;
      },
      set: function (s, a, H) {
        if (a in s) s[a] = H;
        else s.setProperty(CMi(a), H ?? void 0);
        return !0;
      },
    });
  };
  function CMi(e) {
    return e.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
  }
  function OMi(e) {
    this._element = e;
  }
  var wMi = "!important";
  function kMi(e) {
    let t = { property: {}, priority: {} };
    if (!e) return t;
    let r = o$a(e);
    if (r.length < 2) return t;
    for (let s = 0; s < r.length; s += 2) {
      let a = r[s],
        H = r[s + 1];
      if (H.endsWith(wMi)) ((t.priority[a] = "important"), (H = H.slice(0, -wMi.length).trim()));
      t.property[a] = H;
    }
    return t;
  }
  var Ibe = {};
  OMi.prototype = Object.create(Object.prototype, {
    _parsed: {
      get: function () {
        if (!this._parsedStyles || this.cssText !== this._lastParsedText) {
          var e = this.cssText;
          ((this._parsedStyles = kMi(e)), (this._lastParsedText = e), delete this._names);
        }
        return this._parsedStyles;
      },
    },
    _serialize: {
      value: function () {
        var e = this._parsed,
          t = "";
        for (var r in e.property) {
          if (t) t += " ";
          if (((t += r + ": " + e.property[r]), e.priority[r])) t += " !" + e.priority[r];
          t += ";";
        }
        ((this.cssText = t), (this._lastParsedText = t), delete this._names);
      },
    },
    cssText: {
      get: function () {
        return this._element.getAttribute("style");
      },
      set: function (e) {
        this._element.setAttribute("style", e);
      },
    },
    length: {
      get: function () {
        if (!this._names) this._names = Object.getOwnPropertyNames(this._parsed.property);
        return this._names.length;
      },
    },
    item: {
      value: function (e) {
        if (!this._names) this._names = Object.getOwnPropertyNames(this._parsed.property);
        return this._names[e];
      },
    },
    getPropertyValue: {
      value: function (e) {
        return ((e = e.toLowerCase()), this._parsed.property[e] || "");
      },
    },
    getPropertyPriority: {
      value: function (e) {
        return ((e = e.toLowerCase()), this._parsed.priority[e] || "");
      },
    },
    setProperty: {
      value: function (e, t, r) {
        if (((e = e.toLowerCase()), t === null || t === void 0)) t = "";
        if (r === null || r === void 0) r = "";
        if (t !== Ibe) t = "" + t;
        if (((t = t.trim()), t === "")) {
          this.removeProperty(e);
          return;
        }
        if (r !== "" && r !== Ibe && !/^important$/i.test(r)) return;
        var s = this._parsed;
        if (t === Ibe) {
          if (!s.property[e]) return;
          if (r !== "") s.priority[e] = "important";
          else delete s.priority[e];
        } else {
          if (t.indexOf(";") !== -1) return;
          var a = kMi(e + ":" + t);
          if (Object.getOwnPropertyNames(a.property).length === 0) return;
          if (Object.getOwnPropertyNames(a.priority).length !== 0) return;
          for (var H in a.property)
            if (((s.property[H] = a.property[H]), r === Ibe)) continue;
            else if (r !== "") s.priority[H] = "important";
            else if (s.priority[H]) delete s.priority[H];
        }
        this._serialize();
      },
    },
    setPropertyValue: {
      value: function (e, t) {
        return this.setProperty(e, t, Ibe);
      },
    },
    setPropertyPriority: {
      value: function (e, t) {
        return this.setProperty(e, Ibe, t);
      },
    },
    removeProperty: {
      value: function (e) {
        e = e.toLowerCase();
        var t = this._parsed;
        if (e in t.property) (delete t.property[e], delete t.priority[e], this._serialize());
      },
    },
  });
});