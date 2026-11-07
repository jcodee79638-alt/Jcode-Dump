
class ai extends ei {
  constructor() {
    (super(), super.updateProperties({ fill: D._defaultLineColor, "stroke-width": 0 }));
  }
  clone() {
    const t = new ai();
    return (t.updateAll(this), t);
  }
}