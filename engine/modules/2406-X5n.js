
var X5n = Ie(function (q5n) {
  Object.defineProperty(q5n, "__esModule", { value: !0 });
  q5n.parseRetryAfterToMills = q5n.isExportHTTPErrorRetryable = void 0;
  function FPo(e) {
    return e === 429 || e === 502 || e === 503 || e === 504;
  }
  q5n.isExportHTTPErrorRetryable = FPo;
  function BPo(e) {
    if (e == null) return;
    let t = Number.parseInt(e, 10);
    if (Number.isInteger(t)) return t > 0 ? t * 1000 : -1;
    let r = new Date(e).getTime() - Date.now();
    if (r >= 0) return r;
    return 0;
  }
  q5n.parseRetryAfterToMills = BPo;
});