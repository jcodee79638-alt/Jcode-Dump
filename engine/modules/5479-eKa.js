
function eKa(e) {
  var t = (gJi[e] = {
    binary: Jce(KJa[e] + " " + KXi),
    binaryOfStrings: Jce(QJa[e]),
    nonBinary: { General_Category: Jce(KXi), Script: Jce(ZJa[e]) },
  });
  ((t.nonBinary.Script_Extensions = t.nonBinary.Script),
    (t.nonBinary.gc = t.nonBinary.General_Category),
    (t.nonBinary.sc = t.nonBinary.Script),
    (t.nonBinary.scx = t.nonBinary.Script_Extensions));
}