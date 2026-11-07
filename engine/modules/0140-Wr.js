
var Wr = function (e, t) {
    if (typeof e === "function")
      return function () {
        return e(arguments) ? t.apply(this, arguments) : (r) => t(r, ...arguments);
      };
    switch (e) {
      case 0:
      case 1:
        throw RangeError(`Invalid arity ${e}`);
      case 2:
        return function (r, s) {
          if (arguments.length >= 2) return t(r, s);
          return function (a) {
            return t(a, r);
          };
        };
      case 3:
        return function (r, s, a) {
          if (arguments.length >= 3) return t(r, s, a);
          return function (H) {
            return t(H, r, s);
          };
        };
      default:
        return function () {
          if (arguments.length >= e) return t.apply(this, arguments);
          let r = arguments;
          return function (s) {
            return t(s, ...r);
          };
        };
    }
  },
  Za = (e) => e,
  ph = (e) => () => e,
  d6,
  dW,
  YJt,
  IU,
  m6,
  ZJt;