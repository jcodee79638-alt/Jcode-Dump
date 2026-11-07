
var asi = Ie(function (gpc, osi) {
  var fTe = 1000,
    pTe = fTe * 60,
    dTe = pTe * 60,
    H_e = dTe * 24,
    IWo = H_e * 7,
    DWo = H_e * 365.25;
  osi.exports = function (e, t) {
    t = t || {};
    var r = typeof e;
    if (r === "string" && e.length > 0) return yWo(e);
    else if (r === "number" && isFinite(e)) return t.long ? xWo(e) : MWo(e);
    throw Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(e));
  };
  function yWo(e) {
    if (((e = String(e)), e.length > 100)) return;
    var t =
      /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
        e,
      );
    if (!t) return;
    var r = parseFloat(t[1]),
      s = (t[2] || "ms").toLowerCase();
    switch (s) {
      case "years":
      case "year":
      case "yrs":
      case "yr":
      case "y":
        return r * DWo;
      case "weeks":
      case "week":
      case "w":
        return r * IWo;
      case "days":
      case "day":
      case "d":
        return r * H_e;
      case "hours":
      case "hour":
      case "hrs":
      case "hr":
      case "h":
        return r * dTe;
      case "minutes":
      case "minute":
      case "mins":
      case "min":
      case "m":
        return r * pTe;
      case "seconds":
      case "second":
      case "secs":
      case "sec":
      case "s":
        return r * fTe;
      case "milliseconds":
      case "millisecond":
      case "msecs":
      case "msec":
      case "ms":
        return r;
      default:
        return;
    }
  }
  function MWo(e) {
    var t = Math.abs(e);
    if (t >= H_e) return Math.round(e / H_e) + "d";
    if (t >= dTe) return Math.round(e / dTe) + "h";
    if (t >= pTe) return Math.round(e / pTe) + "m";
    if (t >= fTe) return Math.round(e / fTe) + "s";
    return e + "ms";
  }
  function xWo(e) {
    var t = Math.abs(e);
    if (t >= H_e) return TIt(e, t, H_e, "day");
    if (t >= dTe) return TIt(e, t, dTe, "hour");
    if (t >= pTe) return TIt(e, t, pTe, "minute");
    if (t >= fTe) return TIt(e, t, fTe, "second");
    return e + " ms";
  }
  function TIt(e, t, r, s) {
    var a = t >= r * 1.5;
    return Math.round(e / r) + " " + s + (a ? "s" : "");
  }
});