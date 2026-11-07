
class Ki extends Xs {
  #t = Te;
  constructor(t) {
    super();
    const { serializable: e } = t;
    if (e === Te) return;
    const { map: s, hash: i, transfer: n } = e,
      r = structuredClone(s, n ? { transfer: n } : null);
    this.#t = { map: r, hash: i, transfer: [] };
  }
  get print() {
    $("Should not call PrintAnnotationStorage.print");
  }
  get serializable() {
    return this.#t;
  }
  get modifiedIds() {
    return k(this, "modifiedIds", { ids: new Set(), hash: "" });
  }
}