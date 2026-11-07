
var S_o = (e) => {
    let t = e.attributes ? sHr(Object.entries(e.attributes)) : [];
    if ((t.push({ key: "service.name", value: { stringValue: e.serviceName } }), e.serviceVersion))
      t.push({ key: "service.version", value: { stringValue: e.serviceVersion } });
    return { attributes: t, droppedAttributesCount: 0 };
  },
  Pwn,
  Cwn = (e) => {
    let t = e.attributes.find((r) => r.key === "service.name");
    if (!t || !t.value.stringValue) throw Error("Resource does not contain a service name");
    return t.value.stringValue;
  },
  sHr = (e) => {
    let t = [];
    for (let [r, s] of e) t.push({ key: r, value: X$t(s) });
    return t;
  },
  X$t = (e) => {
    if (Array.isArray(e)) return { arrayValue: { values: e.map(X$t) } };
    switch (typeof e) {
      case "string":
        return { stringValue: e };
      case "bigint":
        return { intValue: Number(e) };
      case "number":
        return Number.isInteger(e) ? { intValue: e } : { doubleValue: e };
      case "boolean":
        return { boolValue: e };
      default:
        return { stringValue: af(e) };
    }
  };