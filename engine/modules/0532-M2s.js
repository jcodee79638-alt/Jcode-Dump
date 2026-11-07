
function M2s(e) {
  return t(e.checks);
  function t(r) {
    return r.flatMap((s) => {
      switch (s._tag) {
        case "Filter": {
          if ("regExp" in s.meta) return [s.meta.regExp.source];
          return [];
        }
        case "FilterGroup":
          return t(s.checks);
      }
    });
  }
}