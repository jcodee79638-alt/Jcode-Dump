
function CDa(e, t) {
  return ((t.lastIndex = 0), t.test(e.protocol.endsWith(":") ? e.protocol.slice(0, -1) : e.protocol));
}