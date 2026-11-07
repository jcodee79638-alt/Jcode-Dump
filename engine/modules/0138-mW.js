
function mW(e, t, r, s, a, H, u, f, d) {
  switch (arguments.length) {
    case 1:
      return e;
    case 2:
      return function () {
        return t(e.apply(this, arguments));
      };
    case 3:
      return function () {
        return r(t(e.apply(this, arguments)));
      };
    case 4:
      return function () {
        return s(r(t(e.apply(this, arguments))));
      };
    case 5:
      return function () {
        return a(s(r(t(e.apply(this, arguments)))));
      };
    case 6:
      return function () {
        return H(a(s(r(t(e.apply(this, arguments))))));
      };
    case 7:
      return function () {
        return u(H(a(s(r(t(e.apply(this, arguments)))))));
      };
    case 8:
      return function () {
        return f(u(H(a(s(r(t(e.apply(this, arguments))))))));
      };
    case 9:
      return function () {
        return d(f(u(H(a(s(r(t(e.apply(this, arguments)))))))));
      };
  }
  return;
}