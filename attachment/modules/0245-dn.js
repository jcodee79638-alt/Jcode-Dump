
class dn extends Q {
  constructor(t) {
    (super(t, { isRenderable: !0, ignoreBorder: !0 }),
      (this.textContent = t.data.textContent),
      (this.textPosition = t.data.textPosition),
      (this.annotationEditorType = B.FREETEXT));
  }
  render() {
    if ((this.container.classList.add("freeTextAnnotation"), this.textContent)) {
      const t = (this.contentElement = document.createElement("div"));
      (t.classList.add("annotationTextContent"), t.setAttribute("role", "comment"));
      for (const e of this.textContent) {
        const s = document.createElement("span");
        ((s.textContent = e), t.append(s));
      }
      this.container.append(t);
    }
    return (
      !this.data.popupRef && this.hasPopupData && ((this.hasOwnCommentButton = !0), this._createPopup()),
      this._editOnDoubleClick(),
      this.container
    );
  }
}