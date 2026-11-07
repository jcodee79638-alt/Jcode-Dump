
function Ci(e, n) {
  const i = $r(e.directory);
  return n
    .filter((s) => i === $r(s.directory) || i.startsWith(`${$r(s.directory)}/`))
    .sort((s, l) => l.directory.length - s.directory.length)[0];
}