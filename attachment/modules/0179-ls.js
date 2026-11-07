
function ls(c, t) {
  return new Xe(
    `Unexpected server response (${c}) while retrieving PDF "${t.href}".`,
    c,
    c === 404 || (c === 0 && t.protocol === "file:"),
  );
}