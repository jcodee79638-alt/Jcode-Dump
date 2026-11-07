
function os(c) {
  return URL.parse(c)?.origin ?? null;
}