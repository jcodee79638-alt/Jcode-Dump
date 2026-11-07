
function Un(e, n) {
  e.state = 0;
  for (let i = 0; i < e.sources.length; i += 1) {
    const s = e.sources[i];
    if (s.sources) {
      const l = s.state;
      l === Nt ? s !== n && (!s.updatedAt || s.updatedAt < Wn) && On(s) : l === zn && Un(s, n);
    }
  }
}