
var u1i = Ie(function (bvc, A1i) {
  A1i.exports = class extends Array {
    constructor(t) {
      super((t && t.length) || 0);
      if (t) for (var r in t) this[r] = t[r];
    }
    item(t) {
      return this[t] || null;
    }
  };
});