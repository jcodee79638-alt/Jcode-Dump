
class PVi {
  constructor() {
    ((this.event = null), (this.data = []), (this.chunks = []));
  }
  decode(e) {
    if (e.endsWith("\r")) e = e.substring(0, e.length - 1);
    if (!e) {
      if (!this.event && !this.data.length) return null;
      let a = {
        event: this.event,
        data: this.data.join(`
`),
        raw: this.chunks,
      };
      return ((this.event = null), (this.data = []), (this.chunks = []), a);
    }
    if ((this.chunks.push(e), e.startsWith(":"))) return null;
    let [t, r, s] = YRa(e, ":");
    if (s.startsWith(" ")) s = s.substring(1);
    if (t === "event") this.event = s;
    else if (t === "data") this.data.push(s);
    return null;
  }
}