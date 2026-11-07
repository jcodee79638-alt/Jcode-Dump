
var zKi,
  QKi,
  YKi,
  ZKi = (e, t, r, s) => {
    let a = (u) => {
        let f = r[u];
        if (f === void 0) return;
        if (typeof f !== "number") throw new is(`Number.${t} expects a number argument.`, s);
        return f;
      },
      H;
    switch (t) {
      case "toFixed":
        H = e.toFixed(a(0));
        break;
      case "toExponential":
        H = e.toExponential(a(0));
        break;
      case "toPrecision": {
        let u = a(0);
        H = u === void 0 ? e.toString() : e.toPrecision(u);
        break;
      }
      case "toString": {
        let u = a(0);
        if (u !== void 0 && (u < 2 || u > 36))
          throw new is("Number.toString radix must be between 2 and 36.", s);
        H = e.toString(u);
        break;
      }
      default:
        throw new is(`Number method '${t}' is not available in CodeMode.`, s);
    }
    return q$(H, `Number.${t} result`);
  },
  ezi = (e, t, r) => {
    let s = t[0];
    switch (e) {
      case "isInteger":
        return Number.isInteger(s);
      case "isFinite":
        return Number.isFinite(s);
      case "isNaN":
        return Number.isNaN(s);
      case "isSafeInteger":
        return Number.isSafeInteger(s);
      case "parseInt": {
        let a = t[1];
        if (a !== void 0 && typeof a !== "number")
          throw new is("Number.parseInt expects a numeric radix.", r);
        return parseInt(vd(s), a);
      }
      case "parseFloat":
        return parseFloat(vd(s));
      default:
        throw new is(`Number.${e} is not available in CodeMode.`, r);
    }
  };