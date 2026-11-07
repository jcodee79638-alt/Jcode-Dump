
function xSt(e, t) {
  let r = qZ(e),
    s = [];
  for (let a of Reflect.ownKeys(t)) {
    if (!Object.getOwnPropertyDescriptor(r, a)?.enumerable) throw Error(`Unrecognized key: "${String(a)}"`);
    if (t[a]) s.push(a);
  }
  return s;
}