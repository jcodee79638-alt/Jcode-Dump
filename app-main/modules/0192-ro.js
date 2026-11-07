
function ro(e) {
  if (e !== "start" && e !== "build" && e !== "test") throw Error("Choose a profile command.");
  return e;
}