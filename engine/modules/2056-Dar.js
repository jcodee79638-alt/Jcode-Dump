
var Dar = Ie(function (exports, module) {
  var yaml = Ojn(),
    engines = (exports = module.exports);
  engines.yaml = { parse: yaml.safeLoad.bind(yaml), stringify: yaml.safeDump.bind(yaml) };
  engines.json = {
    parse: JSON.parse.bind(JSON),
    stringify: function (e, t) {
      let r = Object.assign({ replacer: null, space: 2 }, t);
      return JSON.stringify(e, r.replacer, r.space);
    },
  };
  engines.javascript = {
    parse: function parse(str, options, wrap) {
      try {
        if (wrap !== !1)
          str =
            `(function() {
return ` +
            str.trim() +
            `;
}());`;
        return eval(str) || {};
      } catch (e) {
        if (wrap !== !1 && /(unexpected|identifier)/i.test(e.message)) return parse(str, options, !1);
        throw SyntaxError(e);
      }
    },
    stringify: function () {
      throw Error("stringifying JavaScript is not supported");
    },
  };
});