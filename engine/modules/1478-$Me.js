
var $Me = ne(() => {
  w0n();
  lEn();
  ((a) => {
    function e(H) {
      return {
        cwd: H.cwd,
        absolute: H.absolute,
        dot: H.dot,
        follow: H.symlink ?? !1,
        nodir: H.include !== "all",
      };
    }
    async function t(H, u = {}) {
      return qmt(H, e(u));
    }
    a.scan = t;
    function r(H, u = {}) {
      return Jmt(H, e(u));
    }
    a.scanSync = r;
    function s(H, u) {
      return pw(u, H, { dot: !0 });
    }
    a.match = s;
  })((wG ||= {}));
});