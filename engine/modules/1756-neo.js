
function neo() {
  let e = import.meta.url;
  if (e.includes("$bunfs")) return NWe(process.execPath);
  if (e.startsWith("file://")) return NWe(reo(e));
  return NWe(e);
}