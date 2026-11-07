
class AMr {
  constructor(e) {
    this._ajv = e ?? D9a();
  }
  getValidator(e) {
    let t =
      "$id" in e && typeof e.$id === "string"
        ? (this._ajv.getSchema(e.$id) ?? this._ajv.compile(e))
        : this._ajv.compile(e);
    return (r) => {
      if (t(r)) return { valid: !0, data: r, errorMessage: void 0 };
      else return { valid: !1, data: void 0, errorMessage: this._ajv.errorsText(t.errors) };
    };
  }
}