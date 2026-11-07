
var KVn = Ie(function (XVn) {
  Object.defineProperty(XVn, "__esModule", { value: !0 });
  XVn.envDetector = void 0;
  var VVn = kf(),
    qVn = foe(),
    Pgt = bD();
  class GVn {
    _MAX_LENGTH = 255;
    _COMMA_SEPARATOR = ",";
    _LABEL_KEY_VALUE_SPLITTER = "=";
    detect(e) {
      let t = {},
        r = Pgt.getStringFromEnv("OTEL_RESOURCE_ATTRIBUTES"),
        s = Pgt.getStringFromEnv("OTEL_SERVICE_NAME");
      if (r)
        try {
          let a = this._parseResourceAttributes(r);
          Object.assign(t, a);
        } catch (a) {
          VVn.diag.debug(`EnvDetector failed: ${a instanceof Error ? a.message : a}`);
        }
      if (s) t[qVn.ATTR_SERVICE_NAME] = s;
      return { attributes: t };
    }
    _parseResourceAttributes(e) {
      if (!e) return {};
      let t = {},
        r = e.split(this._COMMA_SEPARATOR);
      for (let s of r) {
        let a = s.split(this._LABEL_KEY_VALUE_SPLITTER);
        if (a.length !== 2)
          throw Error(
            `Invalid format for OTEL_RESOURCE_ATTRIBUTES: "${s}". Expected format: key=value. The ',' and '=' characters must be percent-encoded in keys and values.`,
          );
        let [H, u] = a,
          f = H.trim(),
          d = u.trim();
        if (f.length === 0) throw Error(`Invalid OTEL_RESOURCE_ATTRIBUTES: empty attribute key in "${s}".`);
        let _, L;
        try {
          ((_ = decodeURIComponent(f)), (L = decodeURIComponent(d)));
        } catch (I) {
          throw Error(
            `Failed to percent-decode OTEL_RESOURCE_ATTRIBUTES entry "${s}": ${I instanceof Error ? I.message : I}`,
          );
        }
        if (_.length > this._MAX_LENGTH)
          throw Error(`Attribute key exceeds the maximum length of ${this._MAX_LENGTH} characters: "${_}".`);
        if (L.length > this._MAX_LENGTH)
          throw Error(
            `Attribute value exceeds the maximum length of ${this._MAX_LENGTH} characters for key "${_}".`,
          );
        t[_] = L;
      }
      return t;
    }
  }
  XVn.envDetector = new GVn();
});