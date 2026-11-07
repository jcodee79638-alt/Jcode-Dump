
function Ubr(e) {
  let t = JSON.stringify(e, null, 2);
  return t.length > 60000
    ? t.slice(0, 60000) +
        `
[Additional MCP content omitted]`
    : t;
}