
var lzi,
  fzi,
  pzi = (e, t, r) => {
    let s = t.map((a) => {
      if (typeof a !== "number") throw new is(`String.${e} expects number arguments.`, r);
      return a;
    });
    switch (e) {
      case "fromCharCode":
        return String.fromCharCode(...s);
      case "fromCodePoint":
        return String.fromCodePoint(...s);
      default:
        throw new is(`String.${e} is not available in CodeMode.`, r);
    }
  };