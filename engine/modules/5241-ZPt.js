
function ZPt(e) {
  let t = {};
  return (
    (t.startPosition = KLe(e)),
    (e += pJ),
    (t.endPosition = KLe(e)),
    (e += pJ),
    (t.startIndex = $n.getValue(e, "i32") >>> 0),
    (e += lu),
    (t.endIndex = $n.getValue(e, "i32") >>> 0),
    t
  );
}