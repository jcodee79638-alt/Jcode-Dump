
class Oa extends Q {
  constructor(t) {
    super(t, { isRenderable: !0, ignoreBorder: !0 });
  }
  render() {
    return (
      this.container.classList.add("caretAnnotation"),
      !this.data.popupRef && this.hasPopupData && ((this.hasOwnCommentButton = !0), this._createPopup()),
      this.container
    );
  }
}