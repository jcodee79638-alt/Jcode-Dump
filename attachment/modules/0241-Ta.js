
class Ta extends Js {
  constructor(t) {
    super(t, { ignoreBorder: t.data.hasAppearance });
  }
  render() {
    const t = super.render();
    t.classList.add("buttonWidgetAnnotation", "pushButton");
    const e = t.lastChild;
    return (
      this.enableScripting &&
        this.hasJSActions &&
        e &&
        (this._setDefaultPropertiesFromJS(e),
        e.addEventListener("updatefromsandbox", (s) => {
          this._dispatchEventFromSandbox({}, s);
        })),
      t
    );
  }
}