
function OBa() {
  if (typeof navigator > "u" || !navigator) return null;
  let e = [
    { key: "edge", pattern: /Edge(?:\W+(\d+)\.(\d+)(?:\.(\d+))?)?/ },
    { key: "ie", pattern: /MSIE(?:\W+(\d+)\.(\d+)(?:\.(\d+))?)?/ },
    { key: "ie", pattern: /Trident(?:.*rv\:(\d+)\.(\d+)(?:\.(\d+))?)?/ },
    { key: "chrome", pattern: /Chrome(?:\W+(\d+)\.(\d+)(?:\.(\d+))?)?/ },
    { key: "firefox", pattern: /Firefox(?:\W+(\d+)\.(\d+)(?:\.(\d+))?)?/ },
    { key: "safari", pattern: /(?:Version\W+(\d+)\.(\d+)(?:\.(\d+))?)?(?:\W+Mobile\S*)?\W+Safari/ },
  ];
  for (let { key: t, pattern: r } of e) {
    let s = r.exec(navigator.userAgent);
    if (s) {
      let a = s[1] || 0,
        H = s[2] || 0,
        u = s[3] || 0;
      return { browser: t, version: `${a}.${H}.${u}` };
    }
  }
  return null;
}