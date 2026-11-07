
async function ii(e = {}) {
  _(e, ["directory", "search", "cursor", "archived"]);
  let t = new URLSearchParams({ roots: "true", limit: "75" });
  if (e.search !== void 0) t.set("search", q(e.search, 1000));
  if (e.cursor !== void 0) {
    let r = q(e.cursor, 100);
    if (!/^\d+$/.test(r)) throw Error("Invalid request.");
    t.set("cursor", r);
  }
  if (e.archived !== void 0) t.set("archived", String(ft(e.archived)));
  let n = await A.request(
      "GET",
      "/experimental/session?" + t,
      e.directory === void 0 ? void 0 : await F(e.directory),
    ),
    i = vt(n.value).map(zt);
  return (
    await Promise.all(
      i
        .filter((r) => r.directory)
        .map((r) =>
          bt(r.directory).catch(() => {
            return;
          }),
        ),
    ),
    { items: i, cursor: n.cursor }
  );
}