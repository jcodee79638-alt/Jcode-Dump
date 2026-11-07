
var E$i = Ie(function (b$c, g$i) {
  var k1t = m7e(),
    { diff: THa } = H$i(),
    { diffApply: vHa } = f$i(),
    bHa = Object.getOwnPropertyNames(Object.prototype),
    jHa = (e) => {
      if (((e = e.toString()), e.charCodeAt(0) === 65279)) e = e.slice(1);
      return e;
    },
    PHa = /\|{7,}/g,
    m$i = /<{7,}/g,
    _$i = /={7,}/g,
    h$i = />{7,}/g,
    L$i = (e) => e.match(m$i) && e.match(_$i) && e.match(h$i),
    CHa = (e, t, r) => {
      if (((r = r || "ours"), r !== "theirs" && r !== "ours"))
        throw TypeError('prefer param must be "ours" or "theirs" if set');
      if (((e = jHa(e)), !L$i(e))) return k1t(e);
      let s = e.split(/[\n\r]+/g).reduce(
          (f, d) => {
            if (d.match(PHa)) f.state = "parent";
            else if (d.match(m$i)) f.state = "ours";
            else if (d.match(_$i)) f.state = "theirs";
            else if (d.match(h$i)) f.state = "top";
            else {
              if (f.state === "top" || f.state === "ours") f.ours += d;
              if (f.state === "top" || f.state === "theirs") f.theirs += d;
              if (f.state === "top" || f.state === "parent") f.parent += d;
            }
            return f;
          },
          { state: "top", ours: "", theirs: "", parent: "" },
        ),
        a = k1t(s.parent, t),
        H = k1t(s.ours, t),
        u = k1t(s.theirs, t);
      return r === "ours" ? d$i(a, H, u) : d$i(a, u, H);
    },
    p$i = (e) => e && typeof e === "object",
    $$i = (e, t, r, s) => {
      let a = r[s];
      if (p$i(e[a]) && p$i(t[a]) && Array.isArray(e[a]) === Array.isArray(t[a]))
        return $$i(e[a], t[a], r, s + 1);
      e[a] = t[a];
    },
    d$i = (e, t, r) => {
      let s = THa(e, t);
      for (let a = 0; a < s.length; a++) {
        if (bHa.find((H) => s[a].path.includes(H))) continue;
        try {
          vHa(r, [s[a]]);
        } catch (H) {
          $$i(r, t, s[a].path, 0);
        }
      }
      return r;
    };
  g$i.exports = Object.assign(CHa, { isDiff: L$i });
});