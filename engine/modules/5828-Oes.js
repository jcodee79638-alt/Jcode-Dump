
function Oes(e, t) {
  let r = new URL(e);
  return (
    (r.pathname = `${r.pathname.replace(/\/$/, "")}${t.pathname}`),
    (r.search = t.search),
    (r.hash = t.hash),
    r.searchParams.delete("workspace"),
    r.searchParams.delete("directory"),
    r
  );
}