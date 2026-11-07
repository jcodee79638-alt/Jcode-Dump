
class Ba extends Q {
  #t = null;
  constructor(t) {
    super(t, { isRenderable: !0 });
    const { fileId: e, file: s } = this.data;
    ((this.filename = s.filename),
      (this.content = s.content),
      (this.fileId = e),
      this.linkService.eventBus?.dispatch("fileattachmentannotation", {
        source: this,
        attachmentId: this.fileId,
        ...s,
      }));
  }
  render() {
    this.container.classList.add("fileAttachmentAnnotation");
    const { container: t, data: e } = this;
    let s;
    (e.hasAppearance || e.fillAlpha === 0
      ? (s = document.createElement("div"))
      : ((s = document.createElement("img")),
        (s.src = `${this.imageResourcesPath}annotation-${/paperclip/i.test(e.name) ? "paperclip" : "pushpin"}.svg`),
        e.fillAlpha && e.fillAlpha < 1 && (s.style = `filter: opacity(${Math.round(e.fillAlpha * 100)}%);`)),
      s.addEventListener("dblclick", this.#e.bind(this)),
      (this.#t = s));
    const { isMac: i } = j.platform;
    return (
      t.addEventListener("keydown", (n) => {
        n.key === "Enter" && (i ? n.metaKey : n.ctrlKey) && this.#e();
      }),
      !e.popupRef && this.hasPopupData
        ? ((this.hasOwnCommentButton = !0), this._createPopup())
        : s.classList.add("popupTriggerArea"),
      t.append(s),
      t
    );
  }
  getElementsToTriggerPopup() {
    return this.#t;
  }
  addHighlightArea() {
    this.container.classList.add("highlightArea");
  }
  async #e() {
    const { fileId: t, filename: e, content: s } = this,
      i = (await this.linkService.getAttachmentContent(t)) || s;
    i && this.downloadManager?.openOrDownloadData(i, e);
  }
}