
async function Zis(e = fetch, t = Qis) {
  let r = await e(`${O0}/install/latest.json`, {
    cache: "no-store",
    redirect: "error",
    signal: AbortSignal.timeout(15000),
    headers: { "X-Jac-Version": h_ },
  });
  return WaH(JSON.parse(new TextDecoder("utf-8", { fatal: !0 }).decode(await Yis(r, 65536))), t);
}