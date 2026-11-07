
async function y5i(e) {
  let t = UH("roslyn-language-server");
  if (t) return t;
  let r = await M5i();
  if (r) return r;
  return (
    (Sjr ||= KGa(e).finally(() => {
      Sjr = void 0;
    })),
    Sjr
  );
}