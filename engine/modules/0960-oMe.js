
function oMe(e, t) {
  let r = `	"use strict";
	const { columns } = this;
	const { length } = rows;
	const mapped = Array.from({ length });
	${l7s(e, t)}
	return mapped;
	//# sourceURL=drizzle:jit-query-mapper`;
  return Object.assign(new ydt("rows", r).bind({ columns: e }), {
    body: `function jitQueryMapper (rows) {
${r}
}`,
  });
}