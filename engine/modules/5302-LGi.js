
var LGi = Ie(function (_Gi) {
  Object.defineProperty(_Gi, "__esModule", { value: !0 });
  _Gi.SharedArrayReceiverStrategy = _Gi.SharedArraySenderStrategy = void 0;
  var lGi = sCt(),
    Zze;
  (function (e) {
    ((e.Continue = 0), (e.Cancelled = 1));
  })(Zze || (Zze = {}));
  class fGi {
    constructor() {
      this.buffers = new Map();
    }
    enableCancellation(e) {
      if (e.id === null) return;
      let t = new SharedArrayBuffer(4),
        r = new Int32Array(t, 0, 1);
      ((r[0] = Zze.Continue), this.buffers.set(e.id, t), (e.$cancellationData = t));
    }
    async sendCancellation(e, t) {
      let r = this.buffers.get(t);
      if (r === void 0) return;
      let s = new Int32Array(r, 0, 1);
      Atomics.store(s, 0, Zze.Cancelled);
    }
    cleanup(e) {
      this.buffers.delete(e);
    }
    dispose() {
      this.buffers.clear();
    }
  }
  _Gi.SharedArraySenderStrategy = fGi;
  class pGi {
    constructor(e) {
      this.data = new Int32Array(e, 0, 1);
    }
    get isCancellationRequested() {
      return Atomics.load(this.data, 0) === Zze.Cancelled;
    }
    get onCancellationRequested() {
      throw Error("Cancellation over SharedArrayBuffer doesn't support cancellation events");
    }
  }
  class dGi {
    constructor(e) {
      this.token = new pGi(e);
    }
    cancel() {}
    dispose() {}
  }
  class mGi {
    constructor() {
      this.kind = "request";
    }
    createCancellationTokenSource(e) {
      let t = e.$cancellationData;
      if (t === void 0) return new lGi.CancellationTokenSource();
      return new dGi(t);
    }
  }
  _Gi.SharedArrayReceiverStrategy = mGi;
});