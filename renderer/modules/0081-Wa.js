
function Wa(e) {
  return r(hn, {
    get each() {
      return e.text.split(/(```[\s\S]*?(?:```|$))/g).filter(Boolean);
    },
    children: (n) =>
      r(g, {
        get when() {
          return n().startsWith("```");
        },
        get fallback() {
          return (() => {
            var i = Ia();
            return (
              t(
                i,
                r(hn, {
                  get each() {
                    return n()
                      .split(/\n\s*\n/)
                      .filter(Boolean);
                  },
                  children: (s) => {
                    const l = Pe(() =>
                      s().trim().split(`
`),
                    );
                    return r(wi, {
                      get fallback() {
                        return (() => {
                          var a = Da();
                          return (
                            t(
                              a,
                              r(Rn, {
                                get text() {
                                  return s();
                                },
                              }),
                            ),
                            a
                          );
                        })();
                      },
                      get children() {
                        return [
                          r(gn, {
                            get when() {
                              return l().every((a) => /^\s*[-*]\s+/.test(a));
                            },
                            get children() {
                              var a = qa();
                              return (
                                t(
                                  a,
                                  r(hn, {
                                    get each() {
                                      return l();
                                    },
                                    children: (c) =>
                                      (() => {
                                        var d = Qr();
                                        return (
                                          t(
                                            d,
                                            r(Rn, {
                                              get text() {
                                                return c().replace(/^\s*[-*]\s+/, "");
                                              },
                                            }),
                                          ),
                                          d
                                        );
                                      })(),
                                  }),
                                ),
                                a
                              );
                            },
                          }),
                          r(gn, {
                            get when() {
                              return l().every((a) => /^\s*\d+\.\s+/.test(a));
                            },
                            get children() {
                              var a = La();
                              return (
                                t(
                                  a,
                                  r(hn, {
                                    get each() {
                                      return l();
                                    },
                                    children: (c) =>
                                      (() => {
                                        var d = Qr();
                                        return (
                                          t(
                                            d,
                                            r(Rn, {
                                              get text() {
                                                return c().replace(/^\s*\d+\.\s+/, "");
                                              },
                                            }),
                                          ),
                                          d
                                        );
                                      })(),
                                  }),
                                ),
                                a
                              );
                            },
                          }),
                          r(gn, {
                            get when() {
                              return /^#{1,6}\s+/.test(s());
                            },
                            get children() {
                              var a = Ma();
                              return (
                                t(
                                  a,
                                  r(Rn, {
                                    get text() {
                                      return s().replace(/^#{1,6}\s+/, "");
                                    },
                                  }),
                                ),
                                a
                              );
                            },
                          }),
                        ];
                      },
                    });
                  },
                }),
              ),
              i
            );
          })();
        },
        get children() {
          return r(Ya, {
            get block() {
              return n();
            },
          });
        },
      }),
  });
}