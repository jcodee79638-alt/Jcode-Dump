
function vdt(e) {
  return `{${e
    .map((t) => {
      if (Array.isArray(t)) return vdt(t);
      if (typeof t === "string") return `"${t.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
      return `${t}`;
    })
    .join(",")}}`;
}