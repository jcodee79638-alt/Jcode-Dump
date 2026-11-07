
function An(e) {
  if (e !== "off" && e !== "low" && e !== "high" && e !== "xhigh") throw Error("Choose a thinking level.");
  return e;
}