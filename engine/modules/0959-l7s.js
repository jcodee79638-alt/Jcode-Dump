
function l7s(e, t = {}) {
  let r = [],
    s = [];
  s.push(`const [ ${e.map((d, _) => `c${_}`).join(", ")} ] = rows[i];`);
  let a = {},
    H = {},
    u = Array.from({ length: e.length });
  for (let d = 0; d < e.length; ++d) {
    let { field: _, path: L, codec: I, arrayDimensions: D } = e[d],
      S,
      T,
      C,
      O = !1;
    if (vi(_, Kl)) ((O = !0), (S = _), (C = `field: decoder${d}`));
    else if (vi(_, pH)) ((S = _.decoder), (C = `field: { decoder: decoder${d} }`));
    else if (vi(_, X_)) ((S = _._.sql.decoder), (C = `field: { _: { sql: { decoder: decoder${d} } } }`));
    else ((S = _.sql.decoder), (C = `field: { sql: { decoder: decoder${d} } }`));
    if (((T = `decoder${d}.mapFromDriverValue`), S.mapFromDriverValue.isNoop)) T = "";
    if (T) r.push(`const { ${C}${I ? `, codec: codec${d}` : ""} } = columns[${d}];`);
    else if (I) r.push(`const { codec: codec${d} } = columns[${d}];`);
    let B = `c${d}`,
      V = B;
    if (I) V = `codec${d}(${V}, ${D})`;
    if (T) V = `${T}(${V})`;
    if (((u[d] = B === V ? `${B}` : `${B} === null ? ${B} : ${V}`), L.length !== 2 || !O)) continue;
    if (H[L[0]] === void 0) H[L[0]] = [`c${d}`];
    else H[L[0]]?.push(`c${d}`);
    let [q] = L,
      Z = iV(_.table);
    a[q] = t[Z] ? !1 : typeof a[q] === "string" ? (a[q] === Z ? Z : !1) : Z;
  }
  s.push("mapped[i] = {");
  let f = [];
  for (let d = 0; d < e.length; ++d) {
    let { path: _ } = e[d],
      L = _.map((T) => JSON.stringify(T)),
      I = u[d],
      D = _.slice(0, -1),
      S = 0;
    while (S < f.length && S < D.length && f[S] === D[S]) S++;
    for (let T = f.length - 1; T >= S; --T) s.push(`${"\t".repeat(T + 1)}},`);
    for (let T = S; T < D.length; ++T)
      s.push(
        `${"\t".repeat(T + 1)}${L[T]}: ${T === 0 && D.length === 1 && typeof a[_[0]] === "string" ? `${H[_[0]]?.map((C) => `${C} === null`).join(" && ")} ? null : {` : "{"}`,
      );
    ((f = D), s.push(`${"\t".repeat(_.length)}${L[_.length - 1]}: ${I},`));
  }
  for (let d = f.length - 1; d >= 0; --d) s.push(`${"\t".repeat(d + 1)}},`);
  return (
    s.push("};"),
    `${
      r.length
        ? `${r.join(`
	`)}
	`
        : ""
    }for (let i = 0; i < length; ++i) {
		${s.join(`
		`)}
	}`
  );
}