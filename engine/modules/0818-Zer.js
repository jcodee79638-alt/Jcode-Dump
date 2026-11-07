
function Zer(e) {
  return e.kind === "group" ? e.dependencies.flatMap(Zer) : [e];
}