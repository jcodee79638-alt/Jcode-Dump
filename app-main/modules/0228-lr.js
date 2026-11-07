
async function lr() {
  if (!oi || !R || R.isDestroyed()) return;
  await new Promise((e, t) => {
    let n = setTimeout(() => {
      ((ir = void 0), t(Error("Jac Code is still saving your draft. Try closing again.")));
    }, 15000);
    ((ir = () => {
      (clearTimeout(n), (ir = void 0), e());
    }),
      R.webContents.send("jac:flush"));
  });
}