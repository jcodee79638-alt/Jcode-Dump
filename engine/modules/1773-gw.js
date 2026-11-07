
function gw(e) {
  return new TextEncoder().encode(`${e}\x00`);
}