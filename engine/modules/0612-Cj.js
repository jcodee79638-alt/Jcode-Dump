
function Cj(e) {
  return re
    .annotate({
      expected: "a string that will be decoded as JSON",
      contentMediaType: "application/json",
      contentSchema: ME(e.ast),
    })
    .pipe(v$(e, Kon));
}