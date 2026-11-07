
function $Ma(e) {
  let t = { type: "number" };
  if (!e.checks) return t;
  for (let r of e.checks)
    switch (r.kind) {
      case "int":
        t.type = "integer";
        break;
      case "min":
        if (r.inclusive) t.minimum = r.value;
        else t.exclusiveMinimum = r.value;
        break;
      case "max":
        if (r.inclusive) t.maximum = r.value;
        else t.exclusiveMaximum = r.value;
        break;
      case "multipleOf":
        t.multipleOf = r.value;
        break;
    }
  return t;
}