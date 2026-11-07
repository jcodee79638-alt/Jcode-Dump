
var ojr = Ie(function (gGi) {
  Object.defineProperty(gGi, "__esModule", { value: !0 });
  gGi.Semaphore = void 0;
  var Cqa = Fce();
  class $Gi {
    constructor(e = 1) {
      if (e <= 0) throw Error("Capacity must be greater than 0");
      ((this._capacity = e), (this._active = 0), (this._waiting = []));
    }
    lock(e) {
      return new Promise((t, r) => {
        (this._waiting.push({ thunk: e, resolve: t, reject: r }), this.runNext());
      });
    }
    get active() {
      return this._active;
    }
    runNext() {
      if (this._waiting.length === 0 || this._active === this._capacity) return;
      (0, Cqa.default)().timer.setImmediate(() => this.doRunNext());
    }
    doRunNext() {
      if (this._waiting.length === 0 || this._active === this._capacity) return;
      let e = this._waiting.shift();
      if ((this._active++, this._active > this._capacity)) throw Error("To many thunks active");
      try {
        let t = e.thunk();
        if (t instanceof Promise)
          t.then(
            (r) => {
              (this._active--, e.resolve(r), this.runNext());
            },
            (r) => {
              (this._active--, e.reject(r), this.runNext());
            },
          );
        else (this._active--, e.resolve(t), this.runNext());
      } catch (t) {
        (this._active--, e.reject(t), this.runNext());
      }
    }
  }
  gGi.Semaphore = $Gi;
});