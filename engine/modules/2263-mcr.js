
var mcr = Ie(function (NVn) {
  Object.defineProperty(NVn, "__esModule", { value: !0 });
  NVn.defaultResource =
    NVn.emptyResource =
    NVn.resourceFromDetectedResource =
    NVn.resourceFromAttributes =
      void 0;
  var u5 = kf(),
    tSe = bD(),
    r8 = foe(),
    UVn = pcr(),
    A5 = kVn();
  class e7e {
    _rawAttributes;
    _asyncAttributesPending = !1;
    _schemaUrl;
    _memoizedAttributes;
    static FromAttributeList(e, t) {
      let r = new e7e({}, t);
      return (
        (r._rawAttributes = OVn(e)),
        (r._asyncAttributesPending = e.filter(([s, a]) => A5.isPromiseLike(a)).length > 0),
        r
      );
    }
    constructor(e, t) {
      let r = e.attributes ?? {};
      ((this._rawAttributes = Object.entries(r).map(([s, a]) => {
        if (A5.isPromiseLike(a)) this._asyncAttributesPending = !0;
        return [s, a];
      })),
        (this._rawAttributes = OVn(this._rawAttributes)),
        (this._schemaUrl = Xvo(t?.schemaUrl)));
    }
    get asyncAttributesPending() {
      return this._asyncAttributesPending;
    }
    async waitForAsyncAttributes() {
      if (!this.asyncAttributesPending) return;
      for (let e = 0; e < this._rawAttributes.length; e++) {
        let [t, r] = this._rawAttributes[e];
        this._rawAttributes[e] = [t, A5.isPromiseLike(r) ? await r : r];
      }
      this._asyncAttributesPending = !1;
    }
    get attributes() {
      if (this.asyncAttributesPending)
        u5.diag.error("Accessing resource attributes before async attributes settled");
      if (this._memoizedAttributes) return this._memoizedAttributes;
      let e = {};
      for (let [t, r] of this._rawAttributes) {
        if (A5.isPromiseLike(r)) {
          u5.diag.debug(`Unsettled resource attribute ${t} skipped`);
          continue;
        }
        if (r != null) e[t] ??= r;
      }
      if (!this._asyncAttributesPending) this._memoizedAttributes = e;
      return e;
    }
    getRawAttributes() {
      return this._rawAttributes;
    }
    get schemaUrl() {
      return this._schemaUrl;
    }
    merge(e) {
      if (e == null) return this;
      let t = Jvo(this, e),
        r = t ? { schemaUrl: t } : void 0;
      return e7e.FromAttributeList([...e.getRawAttributes(), ...this.getRawAttributes()], r);
    }
  }
  function dcr(e, t) {
    return e7e.FromAttributeList(Object.entries(e), t);
  }
  NVn.resourceFromAttributes = dcr;
  function Vvo(e, t) {
    return new e7e(e, t);
  }
  NVn.resourceFromDetectedResource = Vvo;
  function qvo() {
    return dcr({});
  }
  NVn.emptyResource = qvo;
  function Gvo() {
    return dcr({
      [r8.ATTR_SERVICE_NAME]: UVn.defaultServiceName(),
      [r8.ATTR_TELEMETRY_SDK_LANGUAGE]: tSe.SDK_INFO[r8.ATTR_TELEMETRY_SDK_LANGUAGE],
      [r8.ATTR_TELEMETRY_SDK_NAME]: tSe.SDK_INFO[r8.ATTR_TELEMETRY_SDK_NAME],
      [r8.ATTR_TELEMETRY_SDK_VERSION]: tSe.SDK_INFO[r8.ATTR_TELEMETRY_SDK_VERSION],
    });
  }
  NVn.defaultResource = Gvo;
  function OVn(e) {
    return e.map(([t, r]) => {
      if (A5.isPromiseLike(r))
        return [
          t,
          r.catch((s) => {
            u5.diag.debug("promise rejection for resource attribute: %s - %s", t, s);
            return;
          }),
        ];
      return [t, r];
    });
  }
  function Xvo(e) {
    if (typeof e === "string" || e === void 0) return e;
    u5.diag.warn("Schema URL must be string or undefined, got %s. Schema URL will be ignored.", e);
    return;
  }
  function Jvo(e, t) {
    let r = e?.schemaUrl,
      s = t?.schemaUrl,
      a = r === void 0 || r === "",
      H = s === void 0 || s === "";
    if (a) return s;
    if (H) return r;
    if (r === s) return r;
    u5.diag.warn(
      'Schema URL merge conflict: old resource has "%s", updating resource has "%s". Resulting resource will have undefined Schema URL.',
      r,
      s,
    );
    return;
  }
});