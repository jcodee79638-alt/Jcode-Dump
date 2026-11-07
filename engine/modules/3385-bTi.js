
var bTi = Ie(function ($Cc, vTi) {
  var TTi = SIa;
  process.nextTick(xIa, 42);
  vTi.exports = IIa;
  function IIa(e) {
    var t = s;
    return r;
    function r(a) {
      t(a || yIa);
    }
    function s(a) {
      var H = [a];
      ((t = u), e(f));
      function u(d) {
        H.push(d);
      }
      function f(d) {
        var _ = arguments;
        t = DIa(d) ? s : L;
        while (H.length) L(H.shift());
        function L(I) {
          TTi(MIa, I, _);
        }
      }
    }
  }
  function DIa(e) {
    return Object.prototype.toString.call(e) === "[object Error]";
  }
  function yIa() {}
  function MIa(e, t) {
    e.apply(null, t);
  }
  function xIa(e) {
    if (e === 42) TTi = process.nextTick;
  }
  function SIa(e, t, r) {
    process.nextTick(function () {
      e(t, r);
    });
  }
});