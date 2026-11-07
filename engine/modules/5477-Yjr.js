
function Yjr(e) {
  return (
    (e.type === "MemberExpression" && e.property.type === "PrivateIdentifier") ||
    (e.type === "ChainExpression" && Yjr(e.expression)) ||
    (e.type === "ParenthesizedExpression" && Yjr(e.expression))
  );
}