
function Pva(e) {
  return e
    .replace(/^\/([a-zA-Z]):(?:[\\/]|$)/, (t, r) => `${r.toUpperCase()}:/`)
    .replace(/^\/([a-zA-Z])(?:\/|$)/, (t, r) => `${r.toUpperCase()}:/`)
    .replace(/^\/cygdrive\/([a-zA-Z])(?:\/|$)/, (t, r) => `${r.toUpperCase()}:/`)
    .replace(/^\/mnt\/([a-zA-Z])(?:\/|$)/, (t, r) => `${r.toUpperCase()}:/`);
}