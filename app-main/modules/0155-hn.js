
function hn(e) {
  return Ce(e) || /(?:^|\/)(?:.*prompt.*|\.DS_Store)$/i.test(e.replaceAll("\\", "/"));
}