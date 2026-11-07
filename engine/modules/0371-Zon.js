
function Zon(e) {
  return (t) => {
    let r = ME(t);
    return r._tag === "Literal" ? r.literal === e : r._tag === "UniqueSymbol" ? r.symbol === e : !0;
  };
}