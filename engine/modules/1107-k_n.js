
function k_n(e, t, r) {
  if (vi(r, aMe) && r.config) return { fields: r.config.fields, references: r.config.references };
  let s = t[pde(r.referencedTable)];
  if (!s) throw Error(`Table "${r.referencedTable[TH.Symbol.Name]}" not found in schema`);
  let a = e[s];
  if (!a) throw Error(`Table "${s}" not found in schema`);
  let H = r.sourceTable,
    u = t[pde(H)];
  if (!u) throw Error(`Table "${H[TH.Symbol.Name]}" not found in schema`);
  let f = [];
  for (let d of Object.values(a.relations))
    if (
      (r.relationName && r !== d && d.relationName === r.relationName) ||
      (!r.relationName && d.referencedTable === r.sourceTable)
    )
      f.push(d);
  if (f.length > 1)
    throw r.relationName
      ? Error(`There are multiple relations with name "${r.relationName}" in table "${s}"`)
      : Error(
          `There are multiple relations between "${s}" and "${r.sourceTable[TH.Symbol.Name]}". Please specify relation name`,
        );
  if (f[0] && vi(f[0], aMe) && f[0].config)
    return { fields: f[0].config.references, references: f[0].config.fields };
  throw Error(`There is not enough information to infer relation "${u}.${r.fieldName}"`);
}