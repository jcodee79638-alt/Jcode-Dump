
function QsH(e) {
  for (let [t, r] of Object.entries(e.components?.schemas ?? {})) {
    let s = WsH[t];
    if (s) {
      r.description = s;
      continue;
    }
    delete r.description;
  }
}