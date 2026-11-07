
function cJi(e) {
  return e.type === "Identifier" || (e.type === "ParenthesizedExpression" && cJi(e.expression));
}