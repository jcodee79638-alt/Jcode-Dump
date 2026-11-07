
async function PFa(e = uPe) {
  return new Promise((t) => {
    let r = yFa(e, "127.0.0.1");
    (r.on("connect", () => {
      (r.destroy(), t(!0));
    }),
      r.on("error", () => {
        t(!1);
      }));
  });
}