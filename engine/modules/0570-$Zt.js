
function $Zt(e, t) {
  return cd(e, {
    fields: t,
    mapFields(r, s) {
      let a = r(this.fields);
      return $Zt(klt(a, s?.unsafePreserveChecks ? this.ast.checks : void 0), a);
    },
  });
}