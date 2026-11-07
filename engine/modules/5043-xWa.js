
function xWa(e, t) {
  let r = MWa(e.tools ?? [], t.name);
  return {
    ...t,
    ...t,
    parsed_arguments: yWa(r) ? r.$parseRaw(t.arguments) : r?.strict ? JSON.parse(t.arguments) : null,
  };
}