
function zye(e, t) {
  if (e.checks) {
    let r = e.checks[e.checks.length - 1];
    return yan(e, sut(e.checks.slice(0, -1), r.annotate(t)));
  }
  return bBe(e, (r) => {
    r.annotations.value = { ...r.annotations.value, ...t };
  });
}