
function R4i(e, t) {
  (AR(e, t.startPosition),
    (e += pJ),
    AR(e, t.endPosition),
    (e += pJ),
    $n.setValue(e, t.startIndex, "i32"),
    (e += lu),
    $n.setValue(e, t.endIndex, "i32"),
    (e += lu));
}