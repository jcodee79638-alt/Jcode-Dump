
class Zs extends Q {
  #t = null;
  #e = [];
  constructor(t) {
    (super(t, { isRenderable: !0, ignoreBorder: !0 }),
      (this.containerClassName = "inkAnnotation"),
      (this.svgElementName = "svg:polyline"),
      (this.annotationEditorType = this.data.it === "InkHighlight" ? B.HIGHLIGHT : B.INK));
  }
  #s(t, e) {
    switch (t) {
      case 90:
        return {
          transform: `rotate(90) translate(${-e[0]},${e[1]}) scale(1,-1)`,
          width: e[3] - e[1],
          height: e[2] - e[0],
        };
      case 180:
        return {
          transform: `rotate(180) translate(${-e[2]},${e[1]}) scale(1,-1)`,
          width: e[2] - e[0],
          height: e[3] - e[1],
        };
      case 270:
        return {
          transform: `rotate(270) translate(${-e[2]},${e[3]}) scale(1,-1)`,
          width: e[3] - e[1],
          height: e[2] - e[0],
        };
      default:
        return {
          transform: `translate(${-e[0]},${e[3]}) scale(1,-1)`,
          width: e[2] - e[0],
          height: e[3] - e[1],
        };
    }
  }
  render() {
    this.container.classList.add(this.containerClassName);
    const {
        data: { rect: t, rotation: e, inkLists: s, borderStyle: i, popupRef: n },
      } = this,
      { transform: r, width: a, height: o } = this.#s(e, t),
      l = this.svgFactory.create(a, o, !0),
      h = (this.#t = this.svgFactory.createElement("svg:g"));
    (l.append(h),
      h.setAttribute("stroke-width", i.width || 1),
      h.setAttribute("stroke-linecap", "round"),
      h.setAttribute("stroke-linejoin", "round"),
      h.setAttribute("stroke-miterlimit", 10),
      h.setAttribute("stroke", "transparent"),
      h.setAttribute("fill", "transparent"),
      h.setAttribute("transform", r));
    for (const d of s) {
      const u = this.svgFactory.createElement(this.svgElementName);
      (this.#e.push(u), u.setAttribute("points", d.join(",")), h.append(u));
    }
    return (
      !n && this.hasPopupData && ((this.hasOwnCommentButton = !0), this._createPopup()),
      this.container.append(l),
      this._editOnDoubleClick(),
      this.container
    );
  }
  updateEdited(t) {
    super.updateEdited(t);
    const { thickness: e, points: s, rect: i } = t,
      n = this.#t;
    if ((e >= 0 && n.setAttribute("stroke-width", e || 1), s))
      for (let r = 0, a = this.#e.length; r < a; r++) this.#e[r].setAttribute("points", s[r].join(","));
    if (i) {
      const { transform: r, width: a, height: o } = this.#s(this.data.rotation, i);
      (n.parentElement.setAttribute("viewBox", `0 0 ${a} ${o}`), n.setAttribute("transform", r));
    }
  }
  getElementsToTriggerPopup() {
    return this.#e;
  }
  addHighlightArea() {
    this.container.classList.add("highlightArea");
  }
}