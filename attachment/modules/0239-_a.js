
class _a extends te {
  constructor(t) {
    super(t, { isRenderable: t.renderForms });
  }
  render() {
    const t = this.annotationStorage,
      e = this.data,
      s = e.id;
    let i = t.getValue(s, { value: e.exportValue === e.fieldValue }).value;
    (typeof i == "string" && ((i = i !== "Off"), t.setValue(s, { value: i })),
      this.container.classList.add("buttonWidgetAnnotation", "checkBox"));
    const n = document.createElement("input");
    return (
      Jt.add(n),
      n.setAttribute("data-element-id", s),
      (n.disabled = e.readOnly),
      this._setRequired(n, this.data.required),
      (n.type = "checkbox"),
      (n.name = e.fieldName),
      i && n.setAttribute("checked", !0),
      n.setAttribute("exportValue", e.exportValue),
      (n.tabIndex = 0),
      n.addEventListener("change", (r) => {
        const { name: a, checked: o } = r.target;
        for (const l of this._getElementsByName(a, s)) {
          const h = o && l.exportValue === e.exportValue;
          (l.domElement && (l.domElement.checked = h), t.setValue(l.id, { value: h }));
        }
        t.setValue(s, { value: o });
      }),
      n.addEventListener("resetform", (r) => {
        const a = e.defaultFieldValue || "Off";
        r.target.checked = a === e.exportValue;
      }),
      this.enableScripting &&
        this.hasJSActions &&
        (n.addEventListener("updatefromsandbox", (r) => {
          const a = {
            value(o) {
              ((o.target.checked = o.detail.value !== "Off"), t.setValue(s, { value: o.target.checked }));
            },
          };
          this._dispatchEventFromSandbox(a, r);
        }),
        this._setEventListeners(
          n,
          null,
          [
            ["change", "Validate"],
            ["change", "Action"],
            ["focus", "Focus"],
            ["blur", "Blur"],
            ["mousedown", "Mouse Down"],
            ["mouseenter", "Mouse Enter"],
            ["mouseleave", "Mouse Exit"],
            ["mouseup", "Mouse Up"],
          ],
          (r) => r.target.checked,
        )),
      this._setDefaultPropertiesFromJS(n),
      this.container.append(n),
      this.container
    );
  }
}