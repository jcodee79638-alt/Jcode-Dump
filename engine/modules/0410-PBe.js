
function PBe(e, t, r, s, a) {
  for (let H = 0; H < e.length; H++) {
    let u = e[H];
    if (u._tag === "FilterGroup") PBe(u.checks, t, r, s, a);
    else {
      let f = u.run(t, s, a);
      if (f) {
        if ((r.push(new wQt(t, u, f)), u.aborted || a?.errors !== "all")) return;
      }
    }
  }
}