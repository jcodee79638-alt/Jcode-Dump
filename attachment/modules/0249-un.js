
class un extends Q {
  #t = null;
  constructor(t) {
    (super(t, { isRenderable: !0, ignoreBorder: !0 }),
      (this.containerClassName = "polylineAnnotation"),
      (this.svgElementName = "svg:polyline"));
  }
  render() {
    this.container.classList.add(this.containerClassName);
    const {
      data: { rect: t, vertices: e, borderStyle: s, popupRef: i },
      width: n,
      height: r,
    } = this;
    if (!e) return this.container;
    const a = this.svgFactory.create(n, r, !0);
    let o = [];
    for (let h = 0, d = e.length; h < d; h += 2) {
      const u = e[h] - t[0],
        f = t[3] - e[h + 1];
      o.push(`${u},${f}`);
    }
    o = o.join(" ");
    const l = (this.#t = this.svgFactory.createElement(this.svgElementName));
    return (
      l.setAttribute("points", o),
      l.setAttribute("stroke-width", s.width || 1),
      l.setAttribute("stroke", "transparent"),
      l.setAttribute("fill", "transparent"),
      a.append(l),
      this.container.append(a),
      !i && this.hasPopupData && ((this.hasOwnCommentButton = !0), this._createPopup()),
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