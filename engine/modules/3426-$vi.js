
class $vi {
  constructor(e) {
    ((this._getter = e), (this._value = void 0));
  }
  get value() {
    let e = this._getter;
    if (e !== void 0) ((this._value = e()), (this._getter = void 0));
    return this._value;
  }
}