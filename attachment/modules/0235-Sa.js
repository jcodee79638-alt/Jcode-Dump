
class Sa extends Q {
  constructor(t) {
    super(t, { isRenderable: !0 });
  }
  render() {
    this.container.classList.add("textAnnotation");
    const t = document.createElement("img");
    return (
      (t.src = this.imageResourcesPath + "annotation-" + this.data.name.toLowerCase() + ".svg"),
      t.setAttribute("data-l10n-id", "pdfjs-text-annotation-type"),
      t.setAttribute("data-l10n-args", JSON.stringify({ type: this.data.name })),
      !this.data.popupRef && this.hasPopupData && ((this.hasOwnCommentButton = !0), this._createPopup()),
      this.container.append(t),
      this.container
    );
  }
}