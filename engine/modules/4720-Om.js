
var Om,
  KWi,
  zc,
  Tee = (e) => {
    switch (typeof e) {
      case "undefined":
        return zc.undefined;
      case "string":
        return zc.string;
      case "number":
        return Number.isNaN(e) ? zc.nan : zc.number;
      case "boolean":
        return zc.boolean;
      case "function":
        return zc.function;
      case "bigint":
        return zc.bigint;
      case "symbol":
        return zc.symbol;
      case "object":
        if (Array.isArray(e)) return zc.array;
        if (e === null) return zc.null;
        if (e.then && typeof e.then === "function" && e.catch && typeof e.catch === "function")
          return zc.promise;
        if (typeof Map < "u" && e instanceof Map) return zc.map;
        if (typeof Set < "u" && e instanceof Set) return zc.set;
        if (typeof Date < "u" && e instanceof Date) return zc.date;
        return zc.object;
      default:
        return zc.unknown;
    }
  };