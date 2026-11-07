
var XKi,
  lQa,
  JKi = (e, t, r) => {
    if (!lQa.has(e)) throw new is(`Math.${e} is not available in CodeMode.`, r);
    let s = t.map((u) => {
        if (typeof u !== "number") throw new is(`Math.${e} expects number arguments.`, r);
        return u;
      }),
      [a = Number.NaN, H = Number.NaN] = s;
    switch (e) {
      case "max":
        return Math.max(...s);
      case "min":
        return Math.min(...s);
      case "abs":
        return Math.abs(a);
      case "floor":
        return Math.floor(a);
      case "ceil":
        return Math.ceil(a);
      case "round":
        return Math.round(a);
      case "trunc":
        return Math.trunc(a);
      case "sign":
        return Math.sign(a);
      case "sqrt":
        return Math.sqrt(a);
      case "cbrt":
        return Math.cbrt(a);
      case "pow":
        return Math.pow(a, H);
      case "hypot":
        return Math.hypot(...s);
      case "log":
        return Math.log(a);
      case "log2":
        return Math.log2(a);
      case "log10":
        return Math.log10(a);
      case "exp":
        return Math.exp(a);
    }
    throw new is(`Math.${e} is not available in CodeMode.`, r);
  };