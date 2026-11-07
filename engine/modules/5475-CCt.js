
function CCt(e, t) {
  var { computed: r, key: s } = e;
  return !r && ((s.type === "Identifier" && s.name === t) || (s.type === "Literal" && s.value === t));
}