
function Vr(c) {
  let t = !0,
    e = s("filename\\*", "i").exec(c);
  if (e) {
    e = e[1];
    let h = a(e);
    return ((h = unescape(h)), (h = o(h)), (h = l(h)), n(h));
  }
  if (((e = r(c)), e)) {
    const h = l(e);
    return n(h);
  }
  if (((e = s("filename", "i").exec(c)), e)) {
    e = e[1];
    let h = a(e);
    return ((h = l(h)), n(h));
  }
  function s(h, d) {
    return new RegExp("(?:^|;)\\s*" + h + '\\s*=\\s*([^";\\s][^;\\s]*|"(?:[^"\\\\]|\\\\"?)+"?)', d);
  }
  function i(h, d) {
    if (h) {
      if (!/^[\x00-\xFF]+$/.test(d)) return d;
      try {
        const u = new TextDecoder(h, { fatal: !0 }),
          f = es(d);
        ((d = u.decode(f)), (t = !1));
      } catch {}
    }
    return d;
  }
  function n(h) {
    return (t && /[\x80-\xff]/.test(h) && ((h = i("utf-8", h)), t && (h = i("iso-8859-1", h))), h);
  }
  function r(h) {
    const d = [];
    let u;
    const f = s("filename\\*((?!0\\d)\\d+)(\\*?)", "ig");
    for (; (u = f.exec(h)) !== null;) {
      let [, g, m, b] = u;
      if (((g = parseInt(g, 10)), g in d)) {
        if (g === 0) break;
        continue;
      }
      d[g] = [m, b];
    }
    const p = [];
    for (let g = 0; g < d.length && g in d; ++g) {
      let [m, b] = d[g];
      ((b = a(b)), m && ((b = unescape(b)), g === 0 && (b = o(b))), p.push(b));
    }
    return p.join("");
  }
  function a(h) {
    if (h.startsWith('"')) {
      const d = h.slice(1).split('\\"');
      for (let u = 0; u < d.length; ++u) {
        const f = d[u].indexOf('"');
        (f !== -1 && ((d[u] = d[u].slice(0, f)), (d.length = u + 1)),
          (d[u] = d[u].replaceAll(/\\(.)/g, "$1")));
      }
      h = d.join('"');
    }
    return h;
  }
  function o(h) {
    const d = h.indexOf("'");
    if (d === -1) return h;
    const u = h.slice(0, d),
      p = h.slice(d + 1).replace(/^[^']*'/, "");
    return i(u, p);
  }
  function l(h) {
    return !h.startsWith("=?") || /[\x00-\x19\x80-\xff]/.test(h)
      ? h
      : h.replaceAll(/=\?([\w-]*)\?([QB])\?((?:[^?]|\?(?!=))*)\?=/gi, function (d, u, f, p) {
          if (f === "q" || f === "Q")
            return (
              (p = p
                .replaceAll("_", " ")
                .replaceAll(/=([0-9a-f]{2})/gi, (g, m) => String.fromCharCode(parseInt(m, 16)))),
              i(u, p)
            );
          try {
            p = atob(p);
          } catch {}
          return i(u, p);
        });
  }
  return "";
}