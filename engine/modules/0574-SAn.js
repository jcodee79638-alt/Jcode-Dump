
function SAn(e, t) {
  return cd(e, {
    elements: t,
    mapElements(r, s) {
      let a = r(this.elements);
      return SAn(KQt(a, s?.unsafePreserveChecks ? this.ast.checks : void 0), a);
    },
  });
}