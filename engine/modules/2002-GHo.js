
function GHo(e) {
  return Boolean(e) && !e.startsWith("-") && !/[\s/\\]/.test(e);
}