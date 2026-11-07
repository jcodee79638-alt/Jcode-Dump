
function x$(e, t) {
  if (e.encoding === t) return e;
  return bBe(e, (r) => {
    r.encoding.value = t;
  });
}