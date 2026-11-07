
function l8s(e = vAt.join(vAt.dirname(process.execPath), "JacAuth.exe"), t) {
  return {
    async withLock(r) {
      let s = a8s(e, ["transaction", ...(t ? ["--test-directory", t] : [])], {
          windowsHide: !0,
          shell: !1,
          stdio: ["pipe", "pipe", "pipe"],
        }),
        a = [],
        H = "",
        u = !1,
        f = () => {
          ((u = !0), a.splice(0).forEach((I) => I.reject(new Sc("storage"))));
        };
      (s.on("error", f),
        s.on("exit", f),
        s.stdin.on("error", f),
        s.stdout.on("error", f),
        s.stderr.resume(),
        s.stdout.setEncoding("utf8"),
        s.stdout.on("data", (I) => {
          if (((H += I), H.length > 131072)) {
            (s.kill(), f());
            return;
          }
          while (
            H.includes(`
`)
          ) {
            let D = H.indexOf(`
`),
              S = H.slice(0, D);
            H = H.slice(D + 1);
            let T = a.shift();
            if (!T) {
              (s.kill(), f());
              return;
            }
            try {
              T.resolve(JSON.parse(S));
            } catch {
              T.reject(new Sc("storage"));
            }
          }
        }));
      let d = () =>
          new Promise((I, D) => {
            if (u) D(new Sc("storage"));
            else a.push({ resolve: I, reject: D });
          }),
        _ = d(),
        L = setTimeout(() => {
          (s.kill(), f());
        }, 65000);
      try {
        let I = QDe(await _);
        if (I.ok !== !0) throw new Sc("storage");
        let D = {
          current: Ven(I.value),
          async save(S) {
            let T = d();
            if (
              (s.stdin.write(
                JSON.stringify({ op: "save", value: S }) +
                  `
`,
              ),
              QDe(await T).ok !== !0)
            )
              throw new Sc("storage");
            D.current = S;
          },
        };
        return await r(D);
      } catch (I) {
        if (I instanceof Sc) throw I;
        throw new Sc("storage");
      } finally {
        (clearTimeout(L), s.stdin.end(), s.unref());
      }
    },
  };
}