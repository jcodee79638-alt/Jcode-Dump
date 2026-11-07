(function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const i of document.querySelectorAll('link[rel="modulepreload"]')) s(i);
  new MutationObserver((i) => {
    for (const n of i)
      if (n.type === "childList")
        for (const r of n.addedNodes) r.tagName === "LINK" && r.rel === "modulepreload" && s(r);
  }).observe(document, { childList: !0, subtree: !0 });
  function e(i) {
    const n = {};
    return (
      i.integrity && (n.integrity = i.integrity),
      i.referrerPolicy && (n.referrerPolicy = i.referrerPolicy),
      i.crossOrigin === "use-credentials"
        ? (n.credentials = "include")
        : i.crossOrigin === "anonymous"
          ? (n.credentials = "omit")
          : (n.credentials = "same-origin"),
      n
    );
  }
  function s(i) {
    if (i.ep) return;
    i.ep = !0;
    const n = e(i);
    fetch(i.href, n);
  }
})();