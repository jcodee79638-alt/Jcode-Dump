
function Drs(e) {
  for (let [t, r] of Object.entries(e)) {
    if (t === "share" && r.properties?.url) {
      r.properties.url = Qwe(r.properties.url);
      continue;
    }
    if (t === "time" && r.properties) {
      Drs(r.properties);
      continue;
    }
    e[t] = Qwe(r);
  }
}