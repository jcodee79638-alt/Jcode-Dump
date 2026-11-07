
function sxn(e) {
  let t = pg(),
    r = t.symbols.fff_get_scan_progress(e),
    s = YG(r);
  if (!("success" in s)) return s;
  if (s.handlePtr === 0) return zv("scan progress returned null");
  let a = G6(s.handlePtr),
    H = {
      scannedFilesCount: Number(ha.u64(a, dro)),
      isScanning: ha.u8(a, mro) !== 0,
      isWatcherReady: ha.u8(a, _ro) !== 0,
      isWarmupComplete: ha.u8(a, hro) !== 0,
    };
  return (t.symbols.fff_free_scan_progress(a), { ok: !0, value: H });
}