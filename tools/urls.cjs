const fs = require("fs");
const s = fs.readFileSync(process.argv[2], "latin1");
const counts = {};
const re = /https?:\/\/[a-z0-9.\-]+\.[a-z]{2,}[^\s"'`)]*/gi;
for (const u of s.match(re) || []) {
  const h = (u.match(/^https?:\/\/[^/]+/) || [""])[0].toLowerCase();
  counts[h] = (counts[h] || 0) + 1;
}
console.log(
  Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 30)
    .map((x) => x[1] + "  " + x[0])
    .join("\n")
);
