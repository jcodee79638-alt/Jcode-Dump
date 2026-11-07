
function Rlt(e, t) {
  if (e.context === t) return e;
  return bBe(e, (r) => {
    r.context.value = t;
  });
}