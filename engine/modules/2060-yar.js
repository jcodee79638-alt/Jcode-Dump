
var yar = Ie(function (ZYH, qjn) {
  qjn.exports = function (e, t) {
    let r = t.engines[e] || t.engines[Jlo(e)];
    if (typeof r > "u") throw Error('gray-matter engine "' + e + '" is not registered');
    if (typeof r === "function") r = { parse: r };
    return r;
  };
  function Jlo(e) {
    switch (e.toLowerCase()) {
      case "js":
      case "javascript":
        return "javascript";
      case "coffee":
      case "coffeescript":
      case "cson":
        return "coffee";
      case "yaml":
      case "yml":
        return "yaml";
      default:
        return e;
    }
  }
});