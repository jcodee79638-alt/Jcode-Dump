
function u5e(e, ...t) {
  for (let r of t)
    for (let s of Reflect.ownKeys(r)) if (Object.prototype.propertyIsEnumerable.call(r, s)) wN(e, s, r[s]);
  return e;
}