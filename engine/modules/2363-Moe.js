
var Moe,
  Njo = "@effect/opentelemetry/Metrics",
  Fjo = (e, t) => {
    if (t === void 0 || Object.keys(t).length === 0) return e;
    let r = Object.entries(t).sort((s, a) => s[0].localeCompare(a[0]));
    return `${e}:${JSON.stringify(r)}`;
  },
  kGn = () => {
    let e = Date.now();
    return [Math.floor(e / 1000), (e % 1000) * 1e6];
  },
  mSe = (e, t) => {
    let r = t.unit ?? t.time_unit ?? "1";
    return {
      name: e.id,
      description: e.description ?? "",
      unit: r,
      type: Bjo(e),
      valueType: Rjo(e),
      advice: {},
    };
  },
  Bjo = (e) => {
    switch (e.type) {
      case "Histogram":
        return Q2.HISTOGRAM;
      case "Gauge":
        return Q2.OBSERVABLE_GAUGE;
      case "Frequency":
        return Q2.COUNTER;
      case "Counter":
        return e.state.incremental ? Q2.COUNTER : Q2.UP_DOWN_COUNTER;
      case "Summary":
        return Q2.COUNTER;
    }
  },
  Rjo = (e) => {
    if (e.type === "Counter")
      return typeof e.state.count === "bigint" ? Moe.ValueType.INT : Moe.ValueType.DOUBLE;
    else if (e.type === "Gauge")
      return typeof e.state.value === "bigint" ? Moe.ValueType.INT : Moe.ValueType.DOUBLE;
    return Moe.ValueType.DOUBLE;
  };