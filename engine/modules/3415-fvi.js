
function fvi(e, t) {
  let r = Promise.resolve();
  function s(a) {
    let H = r.then(
      () =>
        new Promise((u, f) => {
          let d = nDa(
              t?.helper ?? lvi.join(lvi.dirname(process.execPath), "JacAuth.exe"),
              [e, ...(t?.testDirectory ? ["--test-directory", t.testDirectory] : [])],
              { shell: !1, windowsHide: !0, stdio: ["pipe", "pipe", "ignore"] },
            ),
            _ = "",
            L,
            I = !1,
            D = !1,
            S = setTimeout(() => T(Error("Jac Code could not access protected MCP storage.")), 40000);
          function T(C) {
            if (D) return;
            if (((D = !0), clearTimeout(S), d.stdin.end(), C)) {
              (d.kill(), f(C));
              return;
            }
            u(L);
          }
          (d.once("error", () => T(Error("Jac Code could not access protected MCP storage."))),
            d.stdin.on("error", () => T(Error("Jac Code could not access protected MCP storage."))),
            d.once("exit", () => {
              if (!D) T(Error("Jac Code could not access protected MCP storage."));
            }),
            d.stdout.setEncoding("utf8"),
            d.stdout.on("data", (C) => {
              if (((_ += C), _.length > 200000))
                return T(Error("Jac Code protected MCP storage exceeds its limit."));
              while (
                _.includes(`
`)
              ) {
                let O = _.indexOf(`
`),
                  B = _.slice(0, O);
                _ = _.slice(O + 1);
                let V = (() => {
                  try {
                    return JSON.parse(B);
                  } catch {
                    return;
                  }
                })();
                if (!V || typeof V !== "object" || !("ok" in V) || V.ok !== !0)
                  return T(Error("Jac Code could not access protected MCP storage."));
                if (!I) {
                  if (((I = !0), (L = "value" in V ? V.value : void 0), a === void 0)) {
                    T();
                    return;
                  }
                  let q = JSON.stringify({ op: "save", value: a });
                  if (q.length > 120000) return T(Error("Jac Code protected MCP storage exceeds its limit."));
                  d.stdin.write(
                    q +
                      `
`,
                    (Z) => {
                      if (Z) T(Error("Jac Code could not access protected MCP storage."));
                    },
                  );
                  continue;
                }
                T();
              }
            }));
        }),
    );
    return (
      (r = H.then(
        () => {
          return;
        },
        () => {
          return;
        },
      )),
      H
    );
  }
  return { read: () => s(), write: (a) => s(a) };
}