
function yrs(e, t) {
  return e.content?.["application/json"]?.schema?.$ref === `#/components/schemas/${t}`;
}