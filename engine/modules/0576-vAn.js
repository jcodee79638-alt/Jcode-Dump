
function vAn(e, t) {
  return cd(e, {
    members: t,
    mapMembers(r, s) {
      let a = r(this.members);
      return vAn(Olt(a, this.ast.mode, s?.unsafePreserveChecks ? this.ast.checks : void 0), a);
    },
  });
}