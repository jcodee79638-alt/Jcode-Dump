
function A1r(e) {
  let r = hvt(e)?.method;
  if (!r) throw Error("Schema is missing a method literal");
  let s = Lvt(r);
  if (typeof s !== "string") throw Error("Schema method literal must be a string");
  return s;
}