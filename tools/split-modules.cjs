// Split a beautified bundle into ordered, navigable "module" files.
// Output is a navigational view: concatenating modules in numeric order
// reproduces the input byte-for-byte (each module retains its trailing text).
const fs = require("fs");
const path = require("path");
const parser = require("@babel/parser");

const [, , input, outDir, mode = "module"] = process.argv;

const code = fs.readFileSync(input, "utf8");
let ast;
try {
  ast = parser.parse(code, {
    sourceType: mode === "script" ? "script" : "module",
    allowReturnOutsideFunction: true,
    allowAwaitOutsideFunction: true,
    errorRecovery: true,
    ranges: true,
    tokens: false,
  });
} catch (e) {
  console.error("parse failed:", e.message);
  process.exit(1);
}

function nameOf(node) {
  const ids = [];
  const add = (p) => {
    if (!p) return;
    if (p.type === "Identifier") ids.push(p.name);
    else if (p.type === "ObjectPattern" || p.type === "ArrayPattern")
      for (const el of p.properties || p.elements || []) add(el && (el.value || el.argument || el.key));
  };
  let n = node;
  if (n.type === "ExportNamedDeclaration" || n.type === "ExportDefaultDeclaration") n = n.declaration || n;
  add(n.id);
  if (n.type === "VariableDeclaration") for (const d of n.declarations) add(d.id);
  if (n.type === "ClassDeclaration" || n.type === "FunctionDeclaration") add(n.id);
  return ids[0] || null;
}

const body = ast.program.body;
const groups = [];
let cur = null;
let pendingStart = 0;

for (const node of body) {
  const start = node.start ?? node.range?.[0] ?? pendingStart;
  const end = node.end ?? node.range?.[1] ?? start;
  const nm = nameOf(node);
  const isDecl =
    /Declaration$/.test(node.type) ||
    node.type === "ImportDeclaration" ||
    (node.type === "ExpressionStatement" &&
      node.expression.type === "AssignmentExpression" &&
      node.expression.left.type === "Identifier");
  if (!cur || (isDecl && nm && node.type !== "ExpressionStatement")) {
    cur = { start, end, names: [], nodes: 0 };
    groups.push(cur);
  }
  cur.end = end;
  cur.nodes++;
  if (nm) cur.names.push(nm);
}

fs.mkdirSync(outDir, { recursive: true });
const index = [];
let cursor = 0;
groups.forEach((g, i) => {
  const prefix = code.slice(cursor, g.start);
  const text = prefix + code.slice(g.start, g.end);
  cursor = g.end;
  const nm = (g.names[0] || "block").replace(/[^\w$.-]/g, "_").slice(0, 48);
  const file = `${String(i + 1).padStart(4, "0")}-${nm}.js`;
  const line = code.slice(0, g.start).split("\n").length;
  fs.writeFileSync(path.join(outDir, file), text);
  index.push({ file, line, names: g.names.slice(0, 6) });
});
if (cursor < code.length) {
  fs.appendFileSync(path.join(outDir, index[index.length - 1].file), code.slice(cursor));
}
fs.writeFileSync(
  path.join(outDir, "_index.json"),
  JSON.stringify({ input, total: index.length, modules: index }, null, 1)
);
console.log("modules:", index.length, "->", outDir);
