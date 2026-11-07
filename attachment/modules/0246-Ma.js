
class Ma extends Q {
  #t = null;
  constructor(t) {
    super(t, { isRenderable: !0, ignoreBorder: !0 });
  }
  render() {
    this.container.classList.add("lineAnnotation");
    const { data: t, width: e, height: s } = this,
      i = this.svgFactory.create(e, s, !0),
      n = (this.#t = this.svgFactory.createElement("svg:line"));
    return (
      n.setAttribute("x1", t.rect[2] - t.lineCoordinates[0]),
      n.setAttribute("y1", t.rect[3] - t.lineCoordinates[1]),
      n.setAttribute("x2", t.rect[2] - t.lineCoordinates[2]),
      n.setAttribute("y2", t.rect[3] - t.lineCoordinates[3]),
      n.setAttribute("stroke-width", t.borderStyle.width || 1),
      n.setAttribute("stroke", "transparent"),
      n.setAttribute("fill", "transparent"),
      i.append(n),
      this.container.append(i),
      !t.popupRef && this.hasPopupData && ((this.hasOwnCommentButton = !0), this._createPopup()),
      this.container
    );
  }
  getElementsToTriggerPopup() {
    return this.#t;
  }
  addHighlightArea() {
    this.container.classList.add("highlightArea");
  }
}