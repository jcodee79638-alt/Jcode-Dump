
function OVa(e) {
  let t = new Map(),
    r = null,
    s = 0,
    a = 0,
    H = !1,
    u = -1;
  for (let f of e.split(`
`)) {
    let d = f.match(/^\s*gitlab_identifier:\s*"?([^"#\s]+)"?/);
    if (d) {
      if (r) t.set(r, { context: s || Lbr, output: a || $br });
      ((r = d[1]), (s = 0), (a = 0), (H = !1), (u = -1));
    }
    let _ = f.match(/^\s*max_context_tokens:\s*([0-9_]+)/);
    if (_ && r) s = parseInt(_[1].replace(/_/g, ""), 10);
    if (/^\s*params:\s*$/.test(f)) ((H = !0), (u = f.match(/^(\s*)/)?.[1].length ?? 0));
    else if (H && /^\s*\S+:/.test(f)) {
      if ((f.match(/^(\s*)/)?.[1].length ?? 0) <= u) ((H = !1), (u = -1));
    }
    if (H) {
      let L = f.match(/^\s*max_tokens:\s*([0-9_]+)/);
      if (L && r) a = parseInt(L[1].replace(/_/g, ""), 10);
    }
  }
  if (r) t.set(r, { context: s || Lbr, output: a || $br });
  return t;
}