
function uMe(
  { selection: e, isFirst: t, parseJson: r, parseJsonIfString: s, rootJsonMappers: a, arrayModeRoot: H },
  u,
) {
  let f = [],
    d = Rtr(e, "row", "selection", u, r, s, H ? !1 : a, f, { n: 0 }, !!H),
    _ = [];
  _.push(`	"use strict";
	const { selection${u ? ", mapColumnValue" : ""} } = this;`);
  for (let I of f) _.push(`	${I}`);
  if (H)
    if (t) {
      (_.push("\tconst row = rows[0];"), _.push("\tif (!row) return undefined;"));
      for (let I of d.bodyStmts) _.push(`	${I}`);
      _.push(`	return ${d.literal};`);
    } else {
      (_.push("\tconst { length } = rows;"),
        _.push("\tconst mapped = Array.from({ length });"),
        _.push("\tfor (let i = 0; i < length; ++i) {"),
        _.push("\t\tconst row = rows[i];"));
      for (let I of d.bodyStmts) _.push(`		${I}`);
      (_.push(`		mapped[i] = ${d.literal};`), _.push("\t}"), _.push("\treturn mapped;"));
    }
  else if (!d.hasWork) _.push(t ? "\treturn rows[0];" : "\treturn rows;");
  else if (t) {
    (_.push("\tconst row = rows[0];"), _.push("\tif (!row) return undefined;"));
    for (let I of d.bodyStmts) _.push(`	${I}`);
    (_.push(`	rows[0] = ${d.literal};`), _.push("\treturn rows[0];"));
  } else {
    (_.push("\tfor (let i = 0; i < rows.length; ++i) {"), _.push("\t\tconst row = rows[i];"));
    for (let I of d.bodyStmts) _.push(`		${I}`);
    (_.push(`		rows[i] = ${d.literal};`), _.push("\t}"), _.push("\treturn rows;"));
  }
  _.push("\t//# sourceURL=drizzle:jit-relational-query-mapper");
  let L = _.join(`
`);
  return Object.assign(new ydt("rows", L).bind({ selection: e, mapColumnValue: u }), {
    body: `function jitRqbMapper (rows) {
${L}
}`,
  });
}