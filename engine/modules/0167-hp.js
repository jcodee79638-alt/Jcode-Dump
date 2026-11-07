
function hp() {
  if (arguments.length === 1) return (e) => zfe(e, arguments[0]);
  return zfe(arguments[0], arguments[1]);
}