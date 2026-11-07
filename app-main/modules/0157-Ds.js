
function Ds(e) {
  return (
    At(e) &&
    Object.keys(e).every((t) => ["id", "name", "commands", "updatedAt"].includes(t)) &&
    typeof e.id === "string" &&
    Wr.test(e.id) &&
    typeof e.name === "string" &&
    e.name.trim().length > 0 &&
    e.name.length <= 100 &&
    !/[\0\r\n]/.test(e.name) &&
    Number.isSafeInteger(e.updatedAt) &&
    Number(e.updatedAt) >= 0 &&
    At(e.commands) &&
    Object.keys(e.commands).length > 0 &&
    Object.entries(e.commands).every(([t, n]) => Us.includes(t) && Hr(n))
  );
}