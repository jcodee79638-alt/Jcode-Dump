
function OEa(e, t) {
  let r = t.ast,
    s = UEa(e(r), sHe(r), lhe(r));
  return Pie({ decode: (a) => bn(new hBe(Lo(a), { message: "Encode only schema" })), encode: s });
}