
function qlt(e, t) {
  let r = Hlt(t);
  return (s) => {
    if (s._tag === "None") return vQ;
    return s.value === t ? r : bn(new OU(e, s));
  };
}