
var Njn = Ie(function (zYH, Ujn) {
  /*!
   * strip-bom-string <https://github.com/jonschlinkert/strip-bom-string>
   *
   * Copyright (c) 2015, 2017, Jon Schlinkert.
   * Released under the MIT License.
   */ Ujn.exports = function (e) {
    if (typeof e === "string" && e.charAt(0) === "\uFEFF") return e.slice(1);
    return e;
  };
});