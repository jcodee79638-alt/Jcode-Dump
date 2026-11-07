
function VYa(...e) {
  return e.filter(Boolean).flatMap((t) =>
    t
      .split(
        `
`,
      )
      .map((r) => r.trim())
      .flatMap((r) => {
        let s = r.match(/^warning:\s+failed to remove\s+(.+):\s+/i);
        if (!s) return [];
        let a = s[1]?.trim().replace(/^['"]|['"]$/g, "");
        if (!a) return [];
        return [a];
      }),
  );
}