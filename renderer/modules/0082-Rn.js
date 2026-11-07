
function Rn(e) {
  return r(hn, {
    get each() {
      return e.text.split(/(`[^`\n]+`|\*\*[^*\n]+\*\*)/g).filter(Boolean);
    },
    children: (n) =>
      r(wi, {
        get fallback() {
          return n();
        },
        get children() {
          return [
            r(gn, {
              get when() {
                return n().startsWith("`");
              },
              get children() {
                var i = Na();
                return (t(i, () => n().slice(1, -1)), i);
              },
            }),
            r(gn, {
              get when() {
                return n().startsWith("**");
              },
              get children() {
                var i = za();
                return (t(i, () => n().slice(2, -2)), i);
              },
            }),
          ];
        },
      }),
  });
}