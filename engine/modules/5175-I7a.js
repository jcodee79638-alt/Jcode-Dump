
function I7a(e) {
  return (
    e.parts
      .filter((r) => r.type === "text")
      .map((r) => r.text.trim())
      .filter(Boolean)
      .join(
        `

`,
      )
      .trim() || void 0
  );
}