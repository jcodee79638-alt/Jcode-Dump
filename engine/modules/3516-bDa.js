
function bDa(e, t) {
  if (!t.normalize && t.protocol?.source === _bi.source && !/^https?:\/\//i.test(e)) return iji;
  try {
    if (typeof URL < "u") {
      let r = URL;
      if (typeof r.parse === "function") return r.parse(e) ?? FSt;
    }
    return new URL(e);
  } catch {
    return FSt;
  }
}