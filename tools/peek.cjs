const fs = require("fs");
if (process.argv[2] === "index") {
  const i = JSON.parse(fs.readFileSync("engine/modules/_index.json", "utf8"));
  for (const m of i.modules.slice(0, 40)) console.log(m.line, m.names.join(","));
} else {
  const s = fs.readFileSync("raw/jac-engine.bundle.js", "latin1");
  const re = /\.(?:get|post|patch|put|delete)\(\s*"(\/[^"]{1,60})"/g;
  let m;
  const set = new Set();
  while ((m = re.exec(s))) set.add(m[1]);
  console.log([...set].slice(0, 90).join("\n"));
}
