
function es(e) {
  const n = e.at(-1),
    i = n?.parts.map((u) => u.type).lastIndexOf("tool") ?? -1,
    s = n?.parts.slice(i + 1).filter((u) => u.type === "text" || u.type === "file") ?? [],
    l = [];
  if (i < 0)
    for (let u = e.length - 2; u >= 0; u--) {
      const h = e[u];
      if (h.finish !== "length" || h.error || h.parts.some((m) => m.type === "tool")) break;
      l.unshift(h);
    }
  const a = l.length
      ? [...l.flatMap((u) => u.parts.filter((h) => h.type === "text" || h.type === "file")), ...s].reduce(
          (u, h) => {
            const m = u.at(-1);
            return m?.type === "text" && h.type === "text"
              ? ((u[u.length - 1] = { ...m, text: (m.text ?? "") + (h.text ?? "") }), u)
              : (u.push(h), u);
          },
          [],
        )
      : s,
    c =
      n && i < 0 && !a.length && (!n.completedAt || n.error || n.finish === "error")
        ? e
            .slice(0, -1)
            .reverse()
            .find((u) => u.finish === "error" && u.parts.some((h) => h.type === "text" && h.text?.trim()))
        : void 0,
    d = c?.parts.filter((u) => u.type === "text" || u.type === "file") ?? a,
    f = n && d.some((u) => u.type === "text" && u.text?.trim()) ? { ...n, parts: d, error: void 0 } : void 0;
  return {
    answer: f,
    activity: e
      .map((u) =>
        u.id === f?.id
          ? { ...u, parts: u.parts.slice(0, i + 1) }
          : u.id === c?.id || l.some((h) => h.id === u.id)
            ? { ...u, parts: u.parts.filter((h) => h.type !== "text" && h.type !== "file") }
            : u,
      )
      .filter((u) =>
        u.parts.some((h) => (h.type === "text" && h.text?.trim()) || h.type === "tool" || h.type === "file"),
      ),
    errors: e.filter((u) => u.error),
    toolCount: e.reduce((u, h) => u + h.parts.filter((m) => m.type === "tool").length, 0),
  };
}