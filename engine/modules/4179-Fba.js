
var Fba,
  aXe = (e) => e.text().trim(),
  nyr = (e) => e.split("\x00").filter(Boolean),
  Bba = (e) => ({
    exitCode: 1,
    text: () => "",
    stdout: Buffer.alloc(0),
    stderr: Buffer.from(e instanceof Error ? e.message : String(e)),
    truncated: !1,
  }),
  lOi = (e) => {
    if (e === "??") return "added";
    if (e.includes("U")) return "modified";
    if (e.includes("A") && !e.includes("D")) return "added";
    if (e.includes("D") && !e.includes("A")) return "deleted";
    return "modified";
  },
  Uhe,
  Rba,
  HXe;