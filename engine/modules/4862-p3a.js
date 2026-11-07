
function p3a(e, t = MT.ALL) {
  if (typeof e !== "string") throw TypeError(`expecting str, got ${typeof e}`);
  if (!e.trim()) throw Error(`${e} is empty`);
  return d3a(e.trim(), t);
}