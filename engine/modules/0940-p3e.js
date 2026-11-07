
var p3e,
  UVs,
  gtr,
  kdn,
  $tr = (e, t) => {
    if (Array.isArray(e)) {
      for (let r = 0; r < e.length; r++) t(wdn(e[r]));
      return;
    }
    for (let r in e) {
      t(r);
      let s = e[r];
      for (let a = 0; a < s.length; a++) t(`${r}:${wdn(s[a])}`);
    }
  };