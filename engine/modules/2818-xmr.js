
var xmr = Ie(function (HLc, zmi) {
  var Hta = (e) => {
    let t = new Set([e]);
    for (let s of t) {
      for (let a of s.edgesOut.values()) if (a.valid && a.peer && a.to) t.add(a.to);
      for (let a of s.edgesIn) if (a.valid && a.peer) t.add(a.from);
    }
    let r = new Map();
    for (let s of t)
      for (let a of s.edgesIn) {
        if (!a.valid) continue;
        if (!a.peer || a.from.isTop) {
          let H = new Set([s]);
          for (let u of H) for (let f of u.edgesOut.values()) if (f.valid && f.peer && f.to) H.add(f.to);
          if (H.has(e)) r.set(a, H);
        }
      }
    return r;
  };
  zmi.exports = Hta;
});