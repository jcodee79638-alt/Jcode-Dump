
function kAn(e, t) {
  return (r) => {
    switch (r._tag) {
      case "Fail":
        return `Fail(${e(r.error)})`;
      case "Die":
        return `Die(${t(r.defect)})`;
      case "Interrupt":
        return "Interrupt";
    }
  };
}