
async function $jr(e) {
  if (e.exitCode !== null || e.signalCode !== null) return;
  if (!e.pid) {
    e.kill();
    return;
  }
  if ((await lR(["taskkill", "/pid", String(e.pid), "/T", "/F"], { nothrow: !0 })).code === 0) return;
  e.kill();
}