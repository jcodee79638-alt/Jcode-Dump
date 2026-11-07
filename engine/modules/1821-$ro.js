
function $ro(e) {
  let t = lxe.create(e);
  if (!t.ok) return t;
  let r = t.value;
  return {
    ok: !0,
    value: {
      destroy: () => r.destroy(),
      isScanning: () => r.isScanning(),
      waitForScan: (s) => r.waitForScan(s),
      refreshGitStatus: () => r.refreshGitStatus(),
      fileSearch: (s, a) => r.fileSearch(s, a),
      glob: (s, a) => r.glob(s, a),
      directorySearch: (s, a) => r.directorySearch(s, a),
      mixedSearch: (s, a) => r.mixedSearch(s, a),
      grep: (s, a) => r.grep(s, a),
      trackQuery: (s, a) => r.trackQuery(s, a),
      getHistoricalQuery: (s) => r.getHistoricalQuery(s),
    },
  };
}