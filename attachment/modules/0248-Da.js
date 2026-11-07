
class Da extends Q {
  #t = null;
  constructor(t) {
    super(t, { isRenderable: !0, ignoreBorder: !0 });
  }
  render() {
    this.container.classList.add("circleAnnotation");
    const { data: t, width: e, height: s } = this,
      i = this.svgFactory.create(e, s, !0),
      n = t.borderStyle.width,
      r = (this.#t = this.svgFactory.createElement("svg:ellipse"));
    return (
      r.setAttribute("cx", e / 2),
      r.setAttribute("cy", s / 2),
      r.setAttribute("rx", e / 2 - n / 2),
      r.setAttribute("ry", s / 2 - n / 2),
      r.setAttribute("stroke-width", n || 1),
      r.setAttribute("stroke", "transparent"),
      r.setAttribute("fill", "transparent"),
      i.append(r),
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