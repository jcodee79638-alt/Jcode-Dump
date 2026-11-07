
async function ctn(e) {
  await dI(e, 268435456);
  for (let [t, r] of [
    ["-wal", 67108864],
    ["-shm", 4194304],
    ["-journal", 33554432],
  ])
    if (await UM(e + t)) await dI(e + t, r);
}