
function kua(e, t) {
  return LLr(e).pipe(
    Vn((r) => {
      let s = Oua(r, t);
      if (s._tag === "Unchanged" || s._tag === "Updated") return s;
      return QEi(r, t);
    }),
  );
}