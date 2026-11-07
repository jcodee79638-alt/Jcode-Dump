
var $Kt = ne(() => {
  Sj();
  FM();
  wC();
  mI();
  Yu();
  nye();
  q_();
  ((qtn = {
    [Vtn]: { _A: (e) => e },
    ...wh,
    [Symbol.iterator]() {
      return new tie(this);
    },
  }),
    (dOs = Object.defineProperty(
      Object.assign(Object.create(qtn), {
        _tag: "Some",
        _op: "Some",
        [V_](e) {
          return mKt(e) && _Kt(e) && hp(this.value, e.value);
        },
        [W_]() {
          return yv(ad(this._tag))(ad(this.value));
        },
        toString() {
          return `some(${af(this.value)})`;
        },
        toJSON() {
          return { _id: "Option", _tag: this._tag, value: BM(this.value) };
        },
      }),
      "valueOrUndefined",
      {
        get() {
          return this.value;
        },
      },
    )),
    (mOs = ad("None")),
    (_Os = Object.assign(Object.create(qtn), {
      _tag: "None",
      _op: "None",
      valueOrUndefined: void 0,
      [V_](e) {
        return mKt(e) && c2e(e);
      },
      [W_]() {
        return mOs;
      },
      toString() {
        return "none()";
      },
      toJSON() {
        return { _id: "Option", _tag: this._tag };
      },
    })),
    (hKt = Object.create(_Os)));
});