
function aZt(e, t) {
  return e.some((r) => {
    switch (r._tag) {
      case "Filter":
        return r.meta._tag === t;
      case "FilterGroup":
        return aZt(r.checks, t);
    }
  });
}