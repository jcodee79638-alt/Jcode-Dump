
function zcr(e, t) {
  let r = typeof e;
  if (r === "string") return { stringValue: e };
  if (r === "number") {
    if (!Number.isInteger(e)) return { doubleValue: e };
    return { intValue: e };
  }
  if (r === "boolean") return { boolValue: e };
  if (e instanceof Uint8Array) return { bytesValue: t.encodeUint8Array(e) };
  if (Array.isArray(e)) {
    let s = Array(e.length);
    for (let a = 0; a < e.length; a++) s[a] = zcr(e[a], t);
    return { arrayValue: { values: s } };
  }
  if (r === "object" && e != null) {
    let s = Object.keys(e),
      a = Array(s.length);
    for (let H = 0; H < s.length; H++) a[H] = { key: s[H], value: zcr(e[s[H]], t) };
    return { kvlistValue: { values: a } };
  }
  return {};
}