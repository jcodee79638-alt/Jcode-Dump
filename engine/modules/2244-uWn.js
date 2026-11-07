
var uWn = Ie(function (cWn) {
  Object.defineProperty(cWn, "__esModule", { value: !0 });
  cWn.addHrTimes =
    cWn.isTimeInput =
    cWn.isTimeInputHrTime =
    cWn.hrTimeToSeconds =
    cWn.hrTimeToMilliseconds =
    cWn.hrTimeToMicroseconds =
    cWn.hrTimeToNanoseconds =
    cWn.hrTimeToTimeStamp =
    cWn.hrTimeDuration =
    cWn.timeInputToHrTime =
    cWn.hrTime =
    cWn.getTimeOrigin =
    cWn.millisToHrTime =
      void 0;
  var moe = ocr(),
    oWn = 9,
    mTo = 6,
    _To = Math.pow(10, mTo),
    zVe = Math.pow(10, oWn);
  function QVe(e) {
    let t = e / 1000,
      r = Math.trunc(t),
      s = Math.round((e % 1000) * _To);
    return [r, s];
  }
  cWn.millisToHrTime = QVe;
  function hTo() {
    return moe.otperformance.timeOrigin;
  }
  cWn.getTimeOrigin = hTo;
  function aWn(e) {
    let t = QVe(moe.otperformance.timeOrigin),
      r = QVe(typeof e === "number" ? e : moe.otperformance.now());
    return HWn(t, r);
  }
  cWn.hrTime = aWn;
  function LTo(e) {
    if (acr(e)) return e;
    else if (typeof e === "number")
      if (e < moe.otperformance.timeOrigin / 2) return aWn(e);
      else return QVe(e);
    else if (e instanceof Date) return QVe(e.getTime());
    else throw TypeError("Invalid input type");
  }
  cWn.timeInputToHrTime = LTo;
  function $To(e, t) {
    let r = t[0] - e[0],
      s = t[1] - e[1];
    if (s < 0) ((r -= 1), (s += zVe));
    return [r, s];
  }
  cWn.hrTimeDuration = $To;
  function gTo(e) {
    let t = oWn,
      r = `${"0".repeat(t)}${e[1]}Z`,
      s = r.substring(r.length - t - 1);
    return new Date(e[0] * 1000).toISOString().replace("000Z", s);
  }
  cWn.hrTimeToTimeStamp = gTo;
  function ETo(e) {
    return e[0] * zVe + e[1];
  }
  cWn.hrTimeToNanoseconds = ETo;
  function ITo(e) {
    return e[0] * 1e6 + e[1] / 1000;
  }
  cWn.hrTimeToMicroseconds = ITo;
  function DTo(e) {
    return e[0] * 1000 + e[1] / 1e6;
  }
  cWn.hrTimeToMilliseconds = DTo;
  function yTo(e) {
    return e[0] + e[1] / zVe;
  }
  cWn.hrTimeToSeconds = yTo;
  function acr(e) {
    return Array.isArray(e) && e.length === 2 && typeof e[0] === "number" && typeof e[1] === "number";
  }
  cWn.isTimeInputHrTime = acr;
  function MTo(e) {
    return acr(e) || typeof e === "number" || e instanceof Date;
  }
  cWn.isTimeInput = MTo;
  function HWn(e, t) {
    let r = [e[0] + t[0], e[1] + t[1]];
    if (r[1] >= zVe) ((r[1] -= zVe), (r[0] += 1));
    return r;
  }
  cWn.addHrTimes = HWn;
});