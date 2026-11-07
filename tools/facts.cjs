const fs = require("fs");
const s = fs.readFileSync("raw/jac-engine.bundle.js", "latin1");

function around(needle, n = 8, w = 110) {
  let i = 0, c = 0;
  while ((i = s.indexOf(needle, i)) >= 0 && c < n) {
    console.log(JSON.stringify(s.slice(Math.max(0, i - w), i + w)));
    i++;
    c++;
  }
}
around("jaccoder", 12);
console.log("--- literals with jac ---");
const set = new Set();
for (const m of s.match(/"[A-Za-z0-9._-]*jac[A-Za-z0-9._-]*"/gi) || []) set.add(m);
console.log([...set].slice(0, 60).join(" "));
console.log("--- appdata/config paths ---");
for (const m of new Set(s.match(/"(?:[^"]*AppData[^"]*|[^"]*\.config[^"]*|[^"]*\.local[^"]*)"/g) || [])) {
  if (m.length < 90) console.log(m);
}
