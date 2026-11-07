
function _Ma(e, t) {
  let r = e.options instanceof Map ? Array.from(e.options.values()) : e.options;
  if (r.every((s) => s._def.typeName in XIr && (!s._def.checks || !s._def.checks.length))) {
    let s = r.reduce((a, H) => {
      let u = XIr[H._def.typeName];
      return u && !a.includes(u) ? [...a, u] : a;
    }, []);
    return { type: s.length > 1 ? s : s[0] };
  } else if (r.every((s) => s._def.typeName === "ZodLiteral" && !s.description)) {
    let s = r.reduce((a, H) => {
      let u = typeof H._def.value;
      switch (u) {
        case "string":
        case "number":
        case "boolean":
          return [...a, u];
        case "bigint":
          return [...a, "integer"];
        case "object":
          if (H._def.value === null) return [...a, "null"];
        case "symbol":
        case "undefined":
        case "function":
        default:
          return a;
      }
    }, []);
    if (s.length === r.length) {
      let a = s.filter((H, u, f) => f.indexOf(H) === u);
      return {
        type: a.length > 1 ? a : a[0],
        enum: r.reduce((H, u) => (H.includes(u._def.value) ? H : [...H, u._def.value]), []),
      };
    }
  } else if (r.every((s) => s._def.typeName === "ZodEnum"))
    return {
      type: "string",
      enum: r.reduce((s, a) => [...s, ...a._def.values.filter((H) => !s.includes(H))], []),
    };
  return hMa(e, t);
}