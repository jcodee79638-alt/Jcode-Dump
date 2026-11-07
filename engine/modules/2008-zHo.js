
function zHo(e) {
  let t = Evn.normalize(BHo(e.url)),
    r = t.split(/[\\/]+/).filter(Boolean);
  if (!r.length) return;
  return {
    host: "file",
    path: t,
    segments: r.map((s) => s.replace(/:$/, "")),
    owner: void 0,
    repo: Yor(r[r.length - 1]),
    remote: e.remote,
    label: t,
    protocol: "file:",
  };
}