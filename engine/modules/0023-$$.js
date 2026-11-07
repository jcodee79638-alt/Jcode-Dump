
function $$(e, t) {
  if (Object.keys(e).some((r) => !t.includes(r))) throw Error("Invalid request.");
  return e;
}