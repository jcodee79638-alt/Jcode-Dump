
function bSa(e) {
  return (typeof e === "string" && e.startsWith("SUQz")) ||
    (typeof e !== "string" && e.length > 10 && e[0] === 73 && e[1] === 68 && e[2] === 51)
    ? vSa(e)
    : e;
}