
function TGa(e, t) {
  if (!t) return e ?? null;
  return (
    t.split(".").reduce((s, a) => {
      if (!s || typeof s !== "object" || !(a in s)) return;
      return s[a];
    }, e) ?? null
  );
}