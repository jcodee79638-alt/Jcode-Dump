
var jhi = Ie(function (bhi) {
  Object.defineProperty(bhi, "__esModule", { value: !0 });
  bhi.default = bna;
  function bna(e) {
    var t = [];
    for (var r = 1; r < arguments.length; r++) t[r - 1] = arguments[r];
    while (t.length > 0) {
      var s = t.shift();
      if (!e[s]) return;
      e = e[s];
    }
    return e;
  }
});