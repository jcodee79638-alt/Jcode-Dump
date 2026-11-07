
var ztn = ne(() => {
  Sj();
  FM();
  KH();
  wC();
  mI();
  Yu();
  nye();
  q_();
  $Kt();
  ((Jtn = {
    [Xtn]: { _A: (e) => e, _E: (e) => e },
    ...wh,
    [Symbol.iterator]() {
      return new tie(this);
    },
  }),
    (hOs = Object.assign(Object.create(Jtn), {
      _tag: "Success",
      _op: "Success",
      [V_](e) {
        return gKt(e) && IKt(e) && hp(this.success, e.success);
      },
      [W_]() {
        return yv(ad(this._tag))(ad(this.success));
      },
      toString() {
        return `success(${af(this.success)})`;
      },
      toJSON() {
        return { _id: "Result", _tag: this._tag, value: BM(this.success) };
      },
    })),
    (LOs = Object.assign(Object.create(Jtn), {
      _tag: "Failure",
      _op: "Failure",
      [V_](e) {
        return gKt(e) && EKt(e) && hp(this.failure, e.failure);
      },
      [W_]() {
        return yv(ad(this._tag))(ad(this.failure));
      },
      toString() {
        return `failure(${af(this.failure)})`;
      },
      toJSON() {
        return { _id: "Result", _tag: this._tag, failure: BM(this.failure) };
      },
    })),
    (Ktn = Wr(2, (e, t) => (c2e(e) ? DKt(t()) : yKt(e.value)))));
});