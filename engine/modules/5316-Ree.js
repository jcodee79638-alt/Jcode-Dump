
var Ree = ne(() => {
  cee();
  Ree();
  f5i = Tl(V_t(), 1);
  p5i = class p5i extends Error {
    cmd;
    code;
    stdout;
    stderr;
    constructor(e, t, r, s) {
      let a = s.toString().trim();
      super(
        a
          ? `Command failed with code ${t}: ${e.join(" ")}
${a}`
          : `Command failed with code ${t}: ${e.join(" ")}`,
      );
      ((this.name = "ProcessRunFailedError"),
        (this.cmd = [...e]),
        (this.code = t),
        (this.stdout = r),
        (this.stderr = s));
    }
  };
});