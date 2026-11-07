
function nYa(e) {
  return { ...Object.fromEntries(Object.entries(e).filter((r) => r[0] !== "client")), server: e.client };
}