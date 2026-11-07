
class ya {
  create(t, e, s = !1) {
    if (t <= 0 || e <= 0) throw new Error("Invalid SVG dimensions");
    const i = this._createSVG("svg:svg");
    return (
      i.setAttribute("version", "1.1"),
      s || (i.setAttribute("width", `${t}px`), i.setAttribute("height", `${e}px`)),
      i.setAttribute("preserveAspectRatio", "none"),
      i.setAttribute("viewBox", `0 0 ${t} ${e}`),
      i
    );
  }
  createElement(t) {
    if (typeof t != "string") throw new Error("Invalid SVG element type");
    return this._createSVG(t);
  }
  _createSVG(t) {
    $("Abstract method `_createSVG` called.");
  }
}