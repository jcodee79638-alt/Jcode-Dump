
function pt(e) {
  if (e !== "read" && e !== "ask" && e !== "full") throw Error("Choose an access mode.");
  return e;
}