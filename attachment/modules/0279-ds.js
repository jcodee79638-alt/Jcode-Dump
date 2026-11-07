
class ds extends ei {
  constructor(t) {
    (super(),
      (this._viewParameters = t),
      super.updateProperties({
        fill: "none",
        stroke: D._defaultLineColor,
        "stroke-opacity": 1,
        "stroke-width": 1,
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        "stroke-miterlimit": 10,
      }));
  }
  updateSVGProperty(t, e) {
    (t === "stroke-width" && ((e ??= this["stroke-width"]), (e *= this._viewParameters.realScale)),
      super.updateSVGProperty(t, e));
  }
  clone() {
    const t = new ds(this._viewParameters);
    return (t.updateAll(this), t);
  }
}