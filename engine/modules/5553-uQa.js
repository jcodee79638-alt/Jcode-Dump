
var uQa,
  qKi = (e, t, r) => {
    if (!uQa.has(e)) throw new is(`JSON.${e} is not available in CodeMode.`, r);
    switch (e) {
      case "stringify": {
        let s = t[1];
        if (Array.isArray(s) || s instanceof A9)
          throw new is("JSON.stringify replacers are not supported in CodeMode.", r, "UnsupportedSyntax", [
            Zee,
          ]);
        let a = t[2],
          H = typeof a === "number" || typeof a === "string" ? a : void 0;
        return JSON.stringify(Qee(DJ(t[0], "JSON.stringify value")), null, H);
      }
      case "parse": {
        let s = t[0];
        if (typeof s !== "string") throw new is("JSON.parse expects a string.", r);
        try {
          return DJ(JSON.parse(s), "JSON.parse result");
        } catch (a) {
          throw new is(
            `JSON.parse received invalid JSON: ${a instanceof Error ? a.message : String(a)}`,
            r,
          ).as("SyntaxError");
        }
      }
    }
    throw new is(`JSON.${e} is not available in CodeMode.`, r);
  };