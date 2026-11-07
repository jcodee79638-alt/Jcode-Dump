
function tAn(e) {
  let t = Tft(e);
  return (r, s) => Yg(zC(t(r, s), (a) => Error(a.toString(), { cause: a })));
}