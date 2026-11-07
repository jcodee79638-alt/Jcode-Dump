
function $Ri(e) {
  if (!e) return { port: uPe, path: ice };
  try {
    let t = new URL(e),
      r = t.port ? parseInt(t.port, 10) : t.protocol === "https:" ? 443 : 80,
      s = t.pathname || ice;
    return { port: r, path: s };
  } catch {
    return { port: uPe, path: ice };
  }
}