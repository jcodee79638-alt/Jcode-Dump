
var wjn = Ie(function (_lo, SD) {
  var g$t = Ajn(),
    Cjn = Pjn();
  function E$t(e) {
    return function () {
      throw Error("Function " + e + " is deprecated and cannot be used.");
    };
  }
  _lo.Type = ix();
  _lo.Schema = Eme();
  _lo.FAILSAFE_SCHEMA = p$t();
  _lo.JSON_SCHEMA = lar();
  _lo.CORE_SCHEMA = far();
  _lo.DEFAULT_SAFE_SCHEMA = Pxe();
  _lo.DEFAULT_FULL_SCHEMA = EVe();
  _lo.load = g$t.load;
  _lo.loadAll = g$t.loadAll;
  _lo.safeLoad = g$t.safeLoad;
  _lo.safeLoadAll = g$t.safeLoadAll;
  _lo.dump = Cjn.dump;
  _lo.safeDump = Cjn.safeDump;
  _lo.YAMLException = bxe();
  _lo.MINIMAL_SCHEMA = p$t();
  _lo.SAFE_SCHEMA = Pxe();
  _lo.DEFAULT_SCHEMA = EVe();
  _lo.scan = E$t("scan");
  _lo.parse = E$t("parse");
  _lo.compose = E$t("compose");
  _lo.addConstructor = E$t("addConstructor");
});