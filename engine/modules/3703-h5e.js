
var h5e = ne(() => {
  (function (e) {
    e.assertEqual = (a) => {};
    function t(a) {}
    e.assertIs = t;
    function r(a) {
      throw Error();
    }
    ((e.assertNever = r),
      (e.arrayToEnum = (a) => {
        let H = {};
        for (let u of a) H[u] = u;
        return H;
      }),
      (e.getValidEnumValues = (a) => {
        let H = e.objectKeys(a).filter((f) => typeof a[a[f]] !== "number"),
          u = {};
        for (let f of H) u[f] = a[f];
        return e.objectValues(u);
      }),
      (e.objectValues = (a) =>
        e.objectKeys(a).map(function (H) {
          return a[H];
        })),
      (e.objectKeys =
        typeof Object.keys === "function"
          ? (a) => Object.keys(a)
          : (a) => {
              let H = [];
              for (let u in a) if (Object.prototype.hasOwnProperty.call(a, u)) H.push(u);
              return H;
            }),
      (e.find = (a, H) => {
        for (let u of a) if (H(u)) return u;
        return;
      }),
      (e.isInteger =
        typeof Number.isInteger === "function"
          ? (a) => Number.isInteger(a)
          : (a) => typeof a === "number" && Number.isFinite(a) && Math.floor(a) === a));
    function s(a, H = " | ") {
      return a.map((u) => (typeof u === "string" ? `'${u}'` : u)).join(H);
    }
    ((e.joinValues = s),
      (e.jsonStringifyReplacer = (a, H) => {
        if (typeof H === "bigint") return H.toString();
        return H;
      }));
  })(km || (km = {}));
  (function (e) {
    e.mergeShapes = (t, r) => ({ ...t, ...r });
  })(owi || (owi = {}));
  Xc = km.arrayToEnum([
    "string",
    "nan",
    "number",
    "integer",
    "float",
    "boolean",
    "date",
    "bigint",
    "symbol",
    "function",
    "undefined",
    "null",
    "array",
    "object",
    "unknown",
    "promise",
    "void",
    "never",
    "map",
    "set",
  ]);
});