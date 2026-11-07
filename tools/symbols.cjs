// Build a symbol outline (top-level declarations) for a beautified source file.
const fs = require("fs");
const parser = require("@babel/parser");
const [, , input, out] = process.argv;
const code = fs.readFileSync(input, "utf8");
const ast = parser.parse(code, {
  sourceType: "unambiguous",
  allowReturnOutsideFunction: true,
  errorRecovery: true,
});
const line = (pos) => code.slice(0, pos).split("\n").length;
const rows = [];
(function walk(body) {
  for (const n of body) {
    const name = n.id?.name || n.declarations?.[0]?.id?.name || n.declarations?.[0]?.id?.properties?.[0]?.value?.name;
    if (
      n.type === "FunctionDeclaration" ||
      n.type === "ClassDeclaration" ||
      n.type === "VariableDeclaration"
    ) {
      rows.push({
        line: line(n.start),
        kind: n.type.replace("Declaration", "").toLowerCase(),
        name: name || "(pattern)",
        params: n.params?.length ?? n.declarations?.[0]?.init?.params?.length ?? 0,
        size: n.end - n.start,
      });
    }
  }
})(ast.program.body);
fs.writeFileSync(out, JSON.stringify(rows, null, 0));
console.log(input, rows.length);
