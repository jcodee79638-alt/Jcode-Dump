
function Dp(e, t = 0) {
  let r = CA + t * Z8;
  ($n.setValue(r, e.id, "i32"),
    (r += lu),
    $n.setValue(r, e.startIndex, "i32"),
    (r += lu),
    $n.setValue(r, e.startPosition.row, "i32"),
    (r += lu),
    $n.setValue(r, e.startPosition.column, "i32"),
    (r += lu),
    $n.setValue(r, e[0], "i32"));
}