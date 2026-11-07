
class Rs extends Q {
  constructor(t) {
    const { data: e, elements: s, parent: i } = t,
      n = !!i._commentManager;
    if (
      (super(t, { isRenderable: !n && Q._hasPopupData(e) }), (this.elements = s), n && Q._hasPopupData(e))
    ) {
      const r = (this.popup = this.#t());
      for (const a of s) a.popup = r;
    } else this.popup = null;
  }
  #t() {
    return new Pa({
      container: this.container,
      color: this.data.color,
      titleObj: this.data.titleObj,
      modificationDate: this.data.modificationDate || this.data.creationDate,
      contentsObj: this.data.contentsObj,
      richText: this.data.richText,
      rect: this.data.rect,
      parentRect: this.data.parentRect || null,
      parent: this.parent,
      elements: this.elements,
      open: this.data.open,
      commentManager: this.parent._commentManager,
    });
  }
  render() {
    const { container: t } = this;
    (t.classList.add("popupAnnotation"), (t.role = "comment"));
    const e = (this.popup = this.#t()),
      s = [];
    for (const i of this.elements)
      ((i.popup = e), (i.container.ariaHasPopup = "dialog"), s.push(i.data.id), i.addHighlightArea());
    return (
      this.container.setAttribute("aria-controls", s.map((i) => `${le}${i}`).join(",")),
      this.container
    );
  }
}