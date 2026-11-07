
function T4a(e) {
  return (e.parent?.type === "redirected_statement" ? e.parent.text : e.text).trim();
}