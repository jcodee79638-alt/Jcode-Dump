
function KrH(e, t, r) {
  let s = r[e.replace(/^\//, "")] ?? r["index.html"] ?? null;
  if (!s) return Jt(KZi());
  return t.readFile(s).pipe(
    Vn((a) => JrH(s, a)),
    GC("PlatformError", "NotFound", () => Jt(KZi())),
  );
}