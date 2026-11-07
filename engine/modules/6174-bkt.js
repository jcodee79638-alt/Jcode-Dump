
var bkt = JaH({ input: process.stdin, crlfDelay: 1 / 0 }),
  ikr = 0;
process.stdin.on("data", (e) => {
  if (((ikr += e.length), ikr > 16000000)) (bkt.close(), LYe().finally(() => process.exit(1)));
});
bkt.on("line", (e) => {
  if (((ikr = 0), Buffer.byteLength(e) > 16000000)) {
    bkt.close();
    return;
  }
  let t = "";
  (async () => {
    let r = $$($v(JSON.parse(e)), ["id", "op", "input"]);
    t = kq(r.id);
    let s = iL(r.op, 40),
      a = await zaH(s, r.input);
    ekr({ id: t, ok: !0, value: a });
  })().catch((r) => ekr({ id: t, ok: !1, message: KaH(r) }));
});
bkt.once("close", () => {
  LYe().finally(() => process.exit(0));
});
process.on("SIGTERM", () => {
  LYe().finally(() => process.exit(0));
});
