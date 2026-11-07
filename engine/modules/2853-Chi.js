
var Chi = Ie(function (Phi) {
  Object.defineProperty(Phi, "__esModule", { value: !0 });
  Phi.default = Pna;
  function Pna(e) {
    var t = [];
    for (var r = 1; r < arguments.length; r++) t[r - 1] = arguments[r];
    while (t.length > 0) {
      var s = t.shift();
      if (!e[s]) e[s] = {};
      e = e[s];
    }
  }
});