
function uwi(e) {
  let t = "[0-5]\\d";
  if (e.precision) t = `${t}\\.\\d{${e.precision}}`;
  else if (e.precision == null) t = `${t}(\\.\\d+)?`;
  let r = e.precision ? "+" : "?";
  return `([01]\\d|2[0-3]):[0-5]\\d(:${t})${r}`;
}