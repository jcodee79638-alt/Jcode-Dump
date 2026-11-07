
var vQn = Ie(function (SQn) {
  Object.defineProperty(SQn, "__esModule", { value: !0 });
  SQn.assertValidPattern = void 0;
  var p8o = 65536,
    d8o = (e) => {
      if (typeof e !== "string") throw TypeError("invalid pattern");
      if (e.length > p8o) throw TypeError("pattern is too long");
    };
  SQn.assertValidPattern = d8o;
});