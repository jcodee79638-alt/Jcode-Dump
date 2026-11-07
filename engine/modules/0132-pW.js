
var pW = ne(() => {
  GFe();
  $tn = class $tn extends R8s {
    emit(e, t) {
      if (t.payload && typeof t.payload === "object" && !("id" in t.payload))
        t.payload.id = t.payload.syncEvent?.id ?? Ltn("evt", "ascending");
      return super.emit(e, t);
    }
  };
  g$ = new $tn();
});