
function Lja(e) {
  let t = e.match(/^(.+) \(fork #(\d+)\)$/);
  if (t) {
    let r = t[1],
      s = parseInt(t[2], 10);
    return `${r} (fork #${s + 1})`;
  }
  return `${e} (fork #1)`;
}