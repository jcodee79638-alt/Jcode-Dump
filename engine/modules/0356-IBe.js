
function IBe(e, t) {
  return e.some((r) => {
    switch (r._tag) {
      case "Filter":
        return r.annotations?.meta?._tag === t;
      case "FilterGroup":
        return IBe(r.checks, t);
    }
  });
}