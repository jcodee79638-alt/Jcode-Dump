
function Nbr(e, t) {
  let r = Object.entries($v(e));
  if (r.length > 64) throw Error("Too many MCP settings.");
  return Object.fromEntries(
    r.map(([s, a]) => {
      iL(s, 256);
      let H = iL(a, 8192);
      if (
        s.includes("\x00") ||
        H.includes("\x00") ||
        (t === "headers" && (!/^[!#$%&'*+.^_`|~0-9A-Za-z-]+$/.test(s) || /[\r\n]/.test(H))) ||
        (t === "environment" && !/^[A-Za-z_][A-Za-z0-9_]*$/.test(s))
      )
        throw Error("Invalid MCP settings.");
      return [s, H];
    }),
  );
}