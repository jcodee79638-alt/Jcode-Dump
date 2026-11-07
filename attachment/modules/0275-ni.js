
class ni extends ei {
  constructor(t = null) {
    (super(), super.updateProperties(t));
  }
  updateSVGProperty(t, e) {
    t !== "thickness" && super.updateSVGProperty(t, e);
  }
  clone() {
    const t = new ni();
    return (t.updateAll(this), t);
  }
}