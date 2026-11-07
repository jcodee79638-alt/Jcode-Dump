
function nHo(e, t, r) {
  e.callbacks_.push(function (a) {
    let H = t;
    if (!H || !NLt(H, a)) return;
    a.mapSetPlugin_?.fixSetContents(H);
    let u = Cor(H);
    (NTn(e, H.draft_ ?? H, u, r), FTn(H, a));
  });
}