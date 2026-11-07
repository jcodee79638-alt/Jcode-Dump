
var pNs = "~effect/observability/Metric/MetricRegistryKey",
  dNs,
  wsn = (e) => {
    let t = Pp(e, dNs);
    return Array.from(t.values()).map(({ hooks: r, ...s }) => ({ ...s, state: r.get(e) }));
  };