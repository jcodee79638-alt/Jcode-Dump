
async function $aH(e) {
  let t = await oL(gaH(e));
  return {
    hostname: t.hostname,
    port: t.port,
    url: t.url,
    stop: (r) =>
      flt(t.stop(r)).then(() => {
        return;
      }),
  };
}