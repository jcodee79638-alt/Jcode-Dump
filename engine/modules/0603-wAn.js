
function wAn(e, t) {
  return (r, s) => {
    if (r._tag !== s._tag) return !1;
    switch (r._tag) {
      case "Fail":
        return e(r.error, s.error);
      case "Die":
        return t(r.defect, s.defect);
      case "Interrupt":
        return r.fiberId === s.fiberId;
    }
  };
}