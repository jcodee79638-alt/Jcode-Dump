
function To(e) {
  return !!R && bs(e, R.webContents, Gt);
}
P.ipcMain.handle("jac:flushed", (e) => {
  if (To(e)) ir?.();
});