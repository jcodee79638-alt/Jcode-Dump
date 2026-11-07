
function SOi(e) {
  return new RegExp(`^(${MOi}|${xOi})\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{3}Z$`).test(e);
}