
function vDr(e) {
  return JSON.stringify(
    e.map((t) => ({
      ...t,
      content:
        typeof t.content === "string"
          ? t.content
          : t.content.map((r) =>
              r.type === "file" ? { ...r, data: r.data instanceof Uint8Array ? wSa(r.data) : r.data } : r,
            ),
    })),
  );
}