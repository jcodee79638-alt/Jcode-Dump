(function () {
  const n = document.createElement("link").relList;
  if (n && n.supports && n.supports("modulepreload")) return;
  for (const l of document.querySelectorAll('link[rel="modulepreload"]')) s(l);
  new MutationObserver((l) => {
    for (const a of l)
      if (a.type === "childList")
        for (const c of a.addedNodes) c.tagName === "LINK" && c.rel === "modulepreload" && s(c);
  }).observe(document, { childList: !0, subtree: !0 });
  function i(l) {
    const a = {};
    return (
      l.integrity && (a.integrity = l.integrity),
      l.referrerPolicy && (a.referrerPolicy = l.referrerPolicy),
      l.crossOrigin === "use-credentials"
        ? (a.credentials = "include")
        : l.crossOrigin === "anonymous"
          ? (a.credentials = "omit")
          : (a.credentials = "same-origin"),
      a
    );
  }
  function s(l) {
    if (l.ep) return;
    l.ep = !0;
    const a = i(l);
    fetch(l.href, a);
  }
})();