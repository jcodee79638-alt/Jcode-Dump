
var dXn = Ie(function (fXn) {
  Object.defineProperty(fXn, "__esModule", { value: !0 });
  fXn.createRetryingTransport = void 0;
  var m5 = kf(),
    Qcr = 5,
    KPo = 1000,
    zPo = 5000,
    QPo = 1.5,
    uXn = 0.2;
  function YPo() {
    return Math.random() * (2 * uXn) - uXn;
  }
  class lXn {
    _transport;
    constructor(e) {
      this._transport = e;
    }
    retry(e, t, r) {
      return new Promise((s, a) => {
        setTimeout(() => {
          this._transport.send(e, t).then(s, a);
        }, r);
      });
    }
    async send(e, t) {
      let r = Qcr,
        s = KPo,
        a = Date.now() + t,
        H = await this._transport.send(e, t);
      while (H.status === "retryable" && r > 0) {
        r--;
        let u = Math.max(Math.min(s * (1 + YPo()), zPo), 0);
        s = s * QPo;
        let f = H.retryInMillis ?? u,
          d = a - Date.now();
        if (f > d)
          return (
            m5.diag.info(
              `Export retry time ${Math.round(f)}ms exceeds remaining timeout ${Math.round(d)}ms, not retrying further.`,
            ),
            H
          );
        (m5.diag.verbose(`Scheduling export retry in ${Math.round(f)}ms`), (H = await this.retry(e, d, f)));
      }
      if (H.status === "success") m5.diag.verbose(`Export succeeded after ${Qcr - r} retry attempts.`);
      else if (H.status === "retryable") m5.diag.info(`Export failed after maximum retry attempts (${Qcr}).`);
      else m5.diag.info(`Export failed with non-retryable error: ${H.error}`);
      return H;
    }
    shutdown() {
      return this._transport.shutdown();
    }
  }
  function ZPo(e) {
    return new lXn(e.transport);
  }
  fXn.createRetryingTransport = ZPo;
});