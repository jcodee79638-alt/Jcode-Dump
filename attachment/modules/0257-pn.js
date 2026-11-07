
class pn extends Q {
  constructor(t) {
    (super(t, { isRenderable: !0, ignoreBorder: !0 }), (this.annotationEditorType = B.STAMP));
  }
  render() {
    return (
      this.container.classList.add("stampAnnotation"),
      this.container.setAttribute("role", "img"),
      !this.data.popupRef && this.hasPopupData && ((this.hasOwnCommentButton = !0), this._createPopup()),
      this._editOnDoubleClick(),
      this.container
    );
  }
}