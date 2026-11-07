
var eLt = Ie(function (Xro) {
  Xro.isInteger = (e) => {
    if (typeof e === "number") return Number.isInteger(e);
    if (typeof e === "string" && e.trim() !== "") return Number.isInteger(Number(e));
    return !1;
  };
  Xro.find = (e, t) => e.nodes.find((r) => r.type === t);
  Xro.exceedsLimit = (e, t, r = 1, s) => {
    if (s === !1) return !1;
    if (!Xro.isInteger(e) || !Xro.isInteger(t)) return !1;
    return (Number(t) - Number(e)) / Number(r) >= s;
  };
  Xro.escapeNode = (e, t = 0, r) => {
    let s = e.nodes[t];
    if (!s) return;
    if ((r && s.type === r) || s.type === "open" || s.type === "close") {
      if (s.escaped !== !0) ((s.value = "\\" + s.value), (s.escaped = !0));
    }
  };
  Xro.encloseBrace = (e) => {
    if (e.type !== "brace") return !1;
    if ((e.commas >> (0 + e.ranges)) >> 0 === 0) return ((e.invalid = !0), !0);
    return !1;
  };
  Xro.isInvalidBrace = (e) => {
    if (e.type !== "brace") return !1;
    if (e.invalid === !0 || e.dollar) return !0;
    if ((e.commas >> (0 + e.ranges)) >> 0 === 0) return ((e.invalid = !0), !0);
    if (e.open !== !0 || e.close !== !0) return ((e.invalid = !0), !0);
    return !1;
  };
  Xro.isOpenOrClose = (e) => {
    if (e.type === "open" || e.type === "close") return !0;
    return e.open === !0 || e.close === !0;
  };
  Xro.reduce = (e) =>
    e.reduce((t, r) => {
      if (r.type === "text") t.push(r.value);
      if (r.type === "range") r.type = "text";
      return t;
    }, []);
  Xro.flatten = (...e) => {
    let t = [],
      r = (s) => {
        for (let a = 0; a < s.length; a++) {
          let H = s[a];
          if (Array.isArray(H)) {
            r(H);
            continue;
          }
          if (H !== void 0) t.push(H);
        }
        return t;
      };
    return (r(e), t);
  };
});