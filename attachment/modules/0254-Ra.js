
class Ra extends Q {
  constructor(t) {
    super(t, { isRenderable: !0, ignoreBorder: !0, createQuadrilaterals: !0 });
  }
  render() {
    const {
      data: { overlaidText: t, popupRef: e },
    } = this;
    if (
      (!e && this.hasPopupData && ((this.hasOwnCommentButton = !0), this._createPopup()),
      this.container.classList.add("underlineAnnotation"),
      t)
    ) {
      const s = document.createElement("u");
      (s.classList.add("overlaidText"), (s.textContent = t), this.container.append(s));
    }
    return this.container;
  }
}