
function wie(e, t) {
  return (r) => {
    if (r._tag === "None") return vQ;
    return t(r.value) ? Jt(r) : bn(new OU(e, r));
  };
}