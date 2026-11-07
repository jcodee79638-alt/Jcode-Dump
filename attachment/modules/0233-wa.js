
class wa extends Q {
  constructor(t) {
    (super(t, { isRenderable: !0, ignoreBorder: !0 }), (this.editor = t.editor));
  }
  render() {
    return ((this.container.className = "editorAnnotation"), this.container);
  }
  createOrUpdatePopup() {
    const { editor: t } = this;
    t.hasComment && this._createPopup(t.comment);
  }
  get hasCommentButton() {
    return this.enableComment && this.editor.hasComment;
  }
  get commentButtonPosition() {
    return this.editor.commentButtonPositionInPage;
  }
  get commentText() {
    return this.editor.comment.text;
  }
  set commentText(t) {
    ((this.editor.comment = t), t || this.removePopup());
  }
  get commentData() {
    return this.editor.getData();
  }
  remove() {
    (this.parent.removeAnnotation(this.data.id),
      this.container.remove(),
      (this.container = null),
      this.removePopup());
  }
}