
function Zwr(e, t) {
  return new Promise((r, s) => {
    let a = "",
      H = setTimeout(() => {
        (e.stdin?.end(), s(Error("The desktop helper did not respond. Try again.")));
      }, 15000),
      u = () => {
        (clearTimeout(H), s(Error("The desktop helper could not start. Reinstall Jac Code.")));
      };
    (e.once("error", u), e.once("exit", u), e.stdout?.setEncoding("utf8"));
    let f = (d) => {
      if (((a += d), a.length > 4096)) return u();
      if (
        !a.includes(`
`)
      )
        return;
      (clearTimeout(H), e.off("exit", u), e.stdout?.off("data", f));
      try {
        r(
          $v(
            JSON.parse(
              a.slice(
                0,
                a.indexOf(`
`),
              ),
            ),
          ),
        );
      } catch {
        u();
      }
    };
    if ((e.stdout?.on("data", f), t))
      e.stdin?.write(
        JSON.stringify(t) +
          `
`,
      );
  });
}