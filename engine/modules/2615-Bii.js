
var Bii = Ie(function (ppc, Jfr) {
  /*!
   * negotiator
   * Copyright(c) 2012 Federico Romero
   * Copyright(c) 2012-2014 Isaac Z. Schlueter
   * Copyright(c) 2015 Douglas Christopher Wilson
   * MIT Licensed
   */ var cWo = yii(),
    AWo = Tii(),
    uWo = Cii(),
    lWo = Fii();
  Jfr.exports = k$;
  Jfr.exports.Negotiator = k$;
  function k$(e) {
    if (!(this instanceof k$)) return new k$(e);
    this.request = e;
  }
  k$.prototype.charset = function (t) {
    var r = this.charsets(t);
    return r && r[0];
  };
  k$.prototype.charsets = function (t) {
    return cWo(this.request.headers["accept-charset"], t);
  };
  k$.prototype.encoding = function (t, r) {
    var s = this.encodings(t, r);
    return s && s[0];
  };
  k$.prototype.encodings = function (t, r) {
    var s = r || {};
    return AWo(this.request.headers["accept-encoding"], t, s.preferred);
  };
  k$.prototype.language = function (t) {
    var r = this.languages(t);
    return r && r[0];
  };
  k$.prototype.languages = function (t) {
    return uWo(this.request.headers["accept-language"], t);
  };
  k$.prototype.mediaType = function (t) {
    var r = this.mediaTypes(t);
    return r && r[0];
  };
  k$.prototype.mediaTypes = function (t) {
    return lWo(this.request.headers.accept, t);
  };
  k$.prototype.preferredCharset = k$.prototype.charset;
  k$.prototype.preferredCharsets = k$.prototype.charsets;
  k$.prototype.preferredEncoding = k$.prototype.encoding;
  k$.prototype.preferredEncodings = k$.prototype.encodings;
  k$.prototype.preferredLanguage = k$.prototype.language;
  k$.prototype.preferredLanguages = k$.prototype.languages;
  k$.prototype.preferredMediaType = k$.prototype.mediaType;
  k$.prototype.preferredMediaTypes = k$.prototype.mediaTypes;
});