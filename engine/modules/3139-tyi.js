
var tyi = "grep",
  Kma,
  zma,
  Qma = (e) => {
    let t = e.length === 0 ? ["No files found"] : [`Found ${e.length} matches`],
      r = "";
    for (let s of e) {
      if (r !== s.entry.path) {
        if (r) t.push("");
        ((r = s.entry.path), t.push(`${s.entry.path}:`));
      }
      t.push(`  Line ${s.line}: ${s.text}`);
    }
    return t.join(`
`);
  },
  Yma,
  Zma;