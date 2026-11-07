
function Ht(e, n) {
  return typeof e == "string" && e.length <= n && !/[\u0000-\u001f\u007f-\u009f]/.test(e);
}