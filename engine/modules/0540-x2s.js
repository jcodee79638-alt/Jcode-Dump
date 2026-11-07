
function x2s(e) {
  if (e === "") return [];
  if (e.charCodeAt(0) !== 47) throw Error(`Invalid JSON Pointer, it must start with "/": ${af(e)}`);
  return e.split("/").slice(1).map(Wpe);
}