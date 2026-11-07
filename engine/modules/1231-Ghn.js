
function Ghn(e, t) {
  let r = [...t].sort((f, d) =>
      f.folderMillis !== d.folderMillis
        ? f.folderMillis - d.folderMillis
        : (f.name ?? "").localeCompare(d.name ?? ""),
    ),
    s = new Map(),
    a = new Map();
  for (let f of r) {
    if (!s.has(f.folderMillis)) s.set(f.folderMillis, []);
    (s.get(f.folderMillis).push(f), a.set(f.hash, f));
  }
  let H = [],
    u = [];
  for (let f of e) {
    let d = String(f.created_at),
      _ = Number(d.substring(0, d.length - 3) + "000"),
      L = s.get(_),
      I = L?.length === 1 ? L[0] : void 0,
      D = L && L.length > 1 ? L.find((C) => C.hash && f.hash && C.hash === f.hash) : void 0,
      S = I || D ? void 0 : a.get(f.hash),
      T = I ?? D ?? S;
    if (T) {
      H.push({
        name: T.name,
        selector:
          f.id !== null
            ? { column: "id", value: f.id }
            : I
              ? { column: "created_at", value: f.created_at }
              : { column: "hash", value: f.hash },
      });
      continue;
    }
    u.push(f);
  }
  if (u.length > 0) throw Dqs(u);
  return H;
}