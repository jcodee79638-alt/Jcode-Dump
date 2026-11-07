
var $Se = Ie(function (Bcc, lAr) {
  var Sw = AAr(),
    { validate: RCo } = uAr();
  class DJn {}
  class yJn {}
  var WCo = P$t(),
    VCo = (e, t, r) => {
      let s = WCo(r);
      if (!s) return !1;
      e[t] = s;
    },
    qCo = Sw.typeDefs.path.validate,
    GCo = (e, t, r) => {
      if (typeof r !== "string") return !1;
      return qCo(e, t, r);
    };
  lAr.exports = {
    ...Sw.typeDefs,
    semver: { type: yJn, validate: VCo, description: "full valid SemVer string" },
    Umask: { type: DJn, validate: RCo, description: "octal number in range 0o000..0o777 (0..511)" },
    url: { ...Sw.typeDefs.url, description: 'full url with "http://"' },
    path: { ...Sw.typeDefs.path, validate: GCo, description: "valid filesystem path" },
    Number: { ...Sw.typeDefs.Number, description: "numeric value" },
    Boolean: { ...Sw.typeDefs.Boolean, description: "boolean value (true or false)" },
    Date: { ...Sw.typeDefs.Date, description: "valid Date string" },
  };
  Sw.typeDefs = lAr.exports;
});