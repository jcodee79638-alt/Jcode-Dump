
var AAr = Ie(function (lN, gJn) {
  var d7e = $Jn(),
    UCo = HAr();
  gJn.exports = lN = NCo;
  lN.clean = FCo;
  lN.typeDefs = UCo;
  lN.lib = d7e;
  function NCo(e, t, r = process.argv, s = 2) {
    return d7e.nopt(r.slice(s), {
      types: e || {},
      shorthands: t || {},
      typeDefs: lN.typeDefs,
      invalidHandler: lN.invalidHandler,
      unknownHandler: lN.unknownHandler,
      abbrevHandler: lN.abbrevHandler,
    });
  }
  function FCo(e, t, r = lN.typeDefs) {
    return d7e.clean(e, {
      types: t || {},
      typeDefs: r,
      invalidHandler: lN.invalidHandler,
      unknownHandler: lN.unknownHandler,
      abbrevHandler: lN.abbrevHandler,
    });
  }
});