
function wen(e, t = !1, r = process.stdin, s = process.stdout) {
  if (!r.isTTY || !s.isTTY) return Promise.reject(new Sc("terminal"));
  return new Promise((a, H) => {
    let u = r.isRaw,
      f = r.readableFlowing === !0,
      d = new i8s("utf8"),
      _ = "",
      L = !1,
      I = (C) => {
        if (
          (r.off("data", T),
          r.off("end", D),
          r.off("error", D),
          process.off("SIGINT", S),
          r.setRawMode(u),
          !f)
        )
          r.pause();
        if (
          (s.write(`
`),
          C)
        )
          H(C);
        else a(_);
        _ = "";
      },
      D = () => I(new Sc("cancelled")),
      S = () => I(new Sc("cancelled")),
      T = (C) => {
        for (let O of d.write(C)) {
          if (O === "\x03" || O === "\x04") return I(new Sc("cancelled"));
          if (
            O === "\r" ||
            O ===
              `
`
          )
            return I();
          if (O === "\x1B") {
            L = !0;
            continue;
          }
          if (L) {
            if (/[A-Za-z~]/.test(O)) L = !1;
            continue;
          }
          if (O === "\x7F" || O === "\b") {
            if (_) {
              if (((_ = Array.from(_).slice(0, -1).join("")), !t)) s.write("\b \b");
            }
            continue;
          }
          if (O < " " || O === "\x9B" || _.length >= (t ? 4096 : 320)) continue;
          if (((_ += O), !t)) s.write(O);
        }
      };
    (s.write(e),
      r.setRawMode(!0),
      r.on("data", T),
      r.once("end", D),
      r.once("error", D),
      process.once("SIGINT", S),
      r.resume());
  });
}