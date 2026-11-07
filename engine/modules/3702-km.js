
var km,
  owi,
  Xc,
  JZ = (e) => {
    switch (typeof e) {
      case "undefined":
        return Xc.undefined;
      case "string":
        return Xc.string;
      case "number":
        return Number.isNaN(e) ? Xc.nan : Xc.number;
      case "boolean":
        return Xc.boolean;
      case "function":
        return Xc.function;
      case "bigint":
        return Xc.bigint;
      case "symbol":
        return Xc.symbol;
      case "object":
        if (Array.isArray(e)) return Xc.array;
        if (e === null) return Xc.null;
        if (e.then && typeof e.then === "function" && e.catch && typeof e.catch === "function")
          return Xc.promise;
        if (typeof Map < "u" && e instanceof Map) return Xc.map;
        if (typeof Set < "u" && e instanceof Set) return Xc.set;
        if (typeof Date < "u" && e instanceof Date) return Xc.date;
        return Xc.object;
      default:
        return Xc.unknown;
    }
  };