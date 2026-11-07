
class oi extends ds {
  constructor(t) {
    (super(t), super.updateProperties({ stroke: D._defaultLineColor, "stroke-width": 1 }));
  }
  clone() {
    const t = new oi(this._viewParameters);
    return (t.updateAll(this), t);
  }
}