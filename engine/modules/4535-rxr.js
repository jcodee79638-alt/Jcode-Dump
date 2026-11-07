
async function rxr(e = j2a) {
  let t = `${t3i.env.SYSTEMROOT ?? t3i.env.windir ?? "C:\\Windows"}\\System32\\reg.exe`,
    { stdout: r } = await e(t, [
      "QUERY",
      " HKEY_CURRENT_USER\\Software\\Microsoft\\Windows\\Shell\\Associations\\UrlAssociations\\http\\UserChoice",
      "/v",
      "ProgId",
    ]),
    s = /ProgId\s*REG_SZ\s*(?<id>\S+)/.exec(r);
  if (!s) throw new r3i(`Cannot find Windows browser in stdout: ${JSON.stringify(r)}`);
  let { id: a } = s.groups,
    H = a.lastIndexOf("."),
    u = a.lastIndexOf("-"),
    f = H === -1 ? void 0 : a.slice(0, H),
    d = u === -1 ? void 0 : a.slice(0, u);
  return Hjt[a] ?? Hjt[f] ?? Hjt[d] ?? { name: a, id: a };
}