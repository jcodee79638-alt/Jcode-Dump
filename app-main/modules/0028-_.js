
function _(e, t) {
  if (Object.keys(e).some((n) => !t.includes(n))) throw Error("Invalid request.");
  return e;
}