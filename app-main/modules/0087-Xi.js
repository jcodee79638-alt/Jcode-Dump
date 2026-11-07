
async function Xi(e, t, n) {
  await on(e);
  let i = { files: [], bytes: 0, skipped: 0, reasons: {}, uncaptured: [], incomplete: !1 },
    r = { entries: 0 };
  function s(l, u, p = !0) {
    if ((i.skipped++, (i.reasons[u] = (i.reasons[u] ?? 0) + 1), i.uncaptured.push(l), p)) i.incomplete = !0;
  }
  async function o(l) {
    let u = l ? (await X(e, l)).filename : e,
      p = await z.readdir(u).catch(() => (s(l, "unreadable folder"), []));
    for (let w of p.sort()) {
      if (++r.entries > 6000) {
        s("", "directory entry limit");
        return;
      }
      let f = l ? `${l}/${w}` : w,
        h = Ce(f);
      if (h) {
        s(f, h, h === "unsafe path");
        continue;
      }
      if (St(n, W.default.resolve(e, f))) {
        s(f, "checkpoint storage", !1);
        continue;
      }
      let m = await X(e, f).catch(() => {
        return;
      });
      if (!m) {
        s(f.length <= 512 ? f : l, "unsafe path or link");
        continue;
      }
      let b = await z.lstat(m.filename).catch(() => {
        return;
      });
      if (!b) {
        s(f, "file changed or unreadable");
        continue;
      }
      if (b.isDirectory()) {
        if ((await o(f), r.entries > 6000)) return;
        continue;
      }
      if (!b.isFile() || b.nlink > 1) {
        s(f, "unsupported file or link");
        continue;
      }
      if (b.size > ie.fileBytes) {
        s(f, "file size limit");
        continue;
      }
      if (i.files.length >= ie.files || i.bytes + b.size > ie.checkpointBytes) {
        s(f, "checkpoint size or file count limit");
        continue;
      }
      let C = await an(e, f, Math.min(ie.fileBytes, ie.checkpointBytes - i.bytes)).catch(() => {
        return;
      });
      if (!C) {
        s(f, "file changed or unreadable");
        continue;
      }
      if (
        /-----BEGIN (?:[A-Z ]*PRIVATE KEY|OPENSSH PRIVATE KEY)-----|(?:\b(?:api[_-]?(?:key|token)|access[_-]?token|client[_-]?secret|password|secret)["']?\s*[=:]\s*["']?)(?:sk-[A-Za-z0-9_-]{16,}|[A-Za-z0-9_\/+.-]{24,})/i.test(
          new TextDecoder().decode(C.bytes),
        )
      ) {
        s(f, "credential content", !1);
        continue;
      }
      let g = { path: f, hash: C.hash, size: C.bytes.length };
      (await t(g, C.bytes), i.files.push(g), (i.bytes += g.size));
    }
  }
  return (await o(""), i);
}