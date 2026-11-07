
var k7,
  Zee =
    "Supported orchestration syntax: tools.* calls (they return promises - resolve them with await), data literals, destructuring, optional chaining, template literals, conditionals, switch, loops (incl. for...of and for...in over object/array/tools keys), arrow functions, spread, try/catch, array methods (map/filter/find/findIndex/some/every/reduce/flatMap/forEach/sort/slice/concat/indexOf/lastIndexOf/at/flat/reverse/includes/join), string methods (incl. match/matchAll/replace/split with regular expressions), Date/RegExp/Map/Set/URL/URLSearchParams, URI encoding helpers, Object/Math/JSON helpers, captured console.log/warn/error/dir/table, and Promise.all/allSettled/race/resolve/reject over arrays mixing promises and plain values for parallel tool calls (promise chaining with .then/.catch is not supported - use await with try/catch).",
  is,
  IQe = (e, t) => new is(`Syntax '${e}' is not supported in CodeMode. ${Zee}`, t, "UnsupportedSyntax", [Zee]),
  mwe = (e) => typeof e === "object" && e !== null,
  eM = (e, t) => {
    if (!mwe(e) || typeof e.type !== "string") throw new is(`Invalid AST node while reading ${t}.`);
    return e;
  },
  vT = (e, t) => {
    let r = e[t];
    if (!Array.isArray(r)) throw new is(`Expected '${t}' to be an array.`, e);
    return r;
  },
  A0 = (e, t) => {
    let r = e[t];
    if (typeof r !== "string") throw new is(`Expected '${t}' to be a string.`, e);
    return r;
  },
  _we = (e, t) => {
    let r = e[t];
    if (typeof r !== "boolean") throw new is(`Expected '${t}' to be a boolean.`, e);
    return r;
  },
  u9 = (e, t) => {
    let r = e[t];
    if (r === void 0 || r === null) return;
    return eM(r, t);
  },
  _u = (e, t) => eM(e[t], t),
  wPr = (e) => ({
    line: Math.max(1, (e.loc?.start.line ?? 2) - 1),
    column: Math.max(1, (e.loc?.start.column ?? 4) - 3),
  }),
  TKi = (e) => {
    if (!e?.loc) return "";
    let t = wPr(e);
    return ` (line ${t.line}, col ${t.column})`;
  };