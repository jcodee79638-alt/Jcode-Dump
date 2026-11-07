
var tie,
  HOs = () => {
    let t = { ["~effect/Utils/internal"]: (a) => a() },
      r = {
        ["~effect/Utils/internal"]: (a) => {
          try {
            return a();
          } finally {
          }
        },
      };
    return t["~effect/Utils/internal"](() => Error().stack)?.includes("~effect/Utils/internal") === !0
      ? t["~effect/Utils/internal"]
      : r["~effect/Utils/internal"];
  },
  I$;