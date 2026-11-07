
var iRa = (e) => {
    let t = 0,
      r = [];
    while (t < e.length) {
      let s = e[t];
      if (s === "\\") {
        t++;
        continue;
      }
      if (s === "{") {
        (r.push({ type: "brace", value: "{" }), t++);
        continue;
      }
      if (s === "}") {
        (r.push({ type: "brace", value: "}" }), t++);
        continue;
      }
      if (s === "[") {
        (r.push({ type: "paren", value: "[" }), t++);
        continue;
      }
      if (s === "]") {
        (r.push({ type: "paren", value: "]" }), t++);
        continue;
      }
      if (s === ":") {
        (r.push({ type: "separator", value: ":" }), t++);
        continue;
      }
      if (s === ",") {
        (r.push({ type: "delimiter", value: "," }), t++);
        continue;
      }
      if (s === '"') {
        let f = "",
          d = !1;
        s = e[++t];
        while (s !== '"') {
          if (t === e.length) {
            d = !0;
            break;
          }
          if (s === "\\") {
            if ((t++, t === e.length)) {
              d = !0;
              break;
            }
            ((f += s + e[t]), (s = e[++t]));
          } else ((f += s), (s = e[++t]));
        }
        if (((s = e[++t]), !d)) r.push({ type: "string", value: f });
        continue;
      }
      if (s && /\s/.test(s)) {
        t++;
        continue;
      }
      let H = /[0-9]/;
      if ((s && H.test(s)) || s === "-" || s === ".") {
        let f = "";
        if (s === "-") ((f += s), (s = e[++t]));
        while ((s && H.test(s)) || s === ".") ((f += s), (s = e[++t]));
        r.push({ type: "number", value: f });
        continue;
      }
      let u = /[a-z]/i;
      if (s && u.test(s)) {
        let f = "";
        while (s && u.test(s)) {
          if (t === e.length) break;
          ((f += s), (s = e[++t]));
        }
        if (f == "true" || f == "false" || f === "null") r.push({ type: "name", value: f });
        else {
          t++;
          continue;
        }
        continue;
      }
      t++;
    }
    return r;
  },
  bPe = (e) => {
    if (e.length === 0) return e;
    let t = e[e.length - 1];
    switch (t.type) {
      case "separator":
        return ((e = e.slice(0, e.length - 1)), bPe(e));
        break;
      case "number":
        let r = t.value[t.value.length - 1];
        if (r === "." || r === "-") return ((e = e.slice(0, e.length - 1)), bPe(e));
      case "string":
        let s = e[e.length - 2];
        if (s?.type === "delimiter") return ((e = e.slice(0, e.length - 1)), bPe(e));
        else if (s?.type === "brace" && s.value === "{") return ((e = e.slice(0, e.length - 1)), bPe(e));
        break;
      case "delimiter":
        return ((e = e.slice(0, e.length - 1)), bPe(e));
        break;
    }
    return e;
  },
  sRa = (e) => {
    let t = [];
    if (
      (e.map((r) => {
        if (r.type === "brace")
          if (r.value === "{") t.push("}");
          else t.splice(t.lastIndexOf("}"), 1);
        if (r.type === "paren")
          if (r.value === "[") t.push("]");
          else t.splice(t.lastIndexOf("]"), 1);
      }),
      t.length > 0)
    )
      t.reverse().map((r) => {
        if (r === "}") e.push({ type: "brace", value: "}" });
        else if (r === "]") e.push({ type: "paren", value: "]" });
      });
    return e;
  },
  oRa = (e) => {
    let t = "";
    return (
      e.map((r) => {
        switch (r.type) {
          case "string":
            t += '"' + r.value + '"';
            break;
          default:
            t += r.value;
            break;
        }
      }),
      t
    );
  },
  Pjt = (e) => JSON.parse(oRa(sRa(bPe(iRa(e)))));