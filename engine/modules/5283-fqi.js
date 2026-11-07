
function fqi(e) {
  let t = Object.keys(process.env).find((r) => r.toLowerCase() === e.toLowerCase());
  return t ? process.env[t] : void 0;
}