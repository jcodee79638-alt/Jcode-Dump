
function SGa(e) {
  let t = e.split(/\r\n|\r|\n/);
  return { line: t.length - 1, character: t.at(-1)?.length ?? 0 };
}