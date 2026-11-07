
function Vxt(e) {
  return e
    ? e.replace(
        /(\n+\s*)+/g,
        `
`,
      )
    : "";
}