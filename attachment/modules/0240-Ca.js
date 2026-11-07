
class Ca extends te {
  constructor(t) {
    super(t, { isRenderable: t.renderForms });
  }
  render() {
    this.container.classList.add("buttonWidgetAnnotation", "radioButton");
    const t = this.annotationStorage,
      e = this.data,
      s = e.id;
    let i = t.getValue(s, { value: e.buttonValue !== null && e.fieldValue === e.buttonValue }).value;
    if ((typeof i == "string" && ((i = i !== e.buttonValue), t.setValue(s, { value: i })), i))
      for (const r of this._getElementsByName(e.fieldName, s)) t.setValue(r.id, { value: !1 });
    const n = document.createElement("input");
    if (
      (Jt.add(n),
      n.setAttribute("data-element-id", s),
      (n.disabled = e.readOnly),
      this._setRequired(n, this.data.required),
      (n.type = "radio"),
      (n.name = e.fieldName),
      i && n.setAttribute("checked", !0),
      (n.tabIndex = 0),
      n.addEventListener("change", (r) => {
        const { name: a, checked: o } = r.target;
        for (const l of this._getElementsByName(a, s)) t.setValue(l.id, { value: !1 });
        t.setValue(s, { value: o });
      }),
      n.addEventListener("resetform", (r) => {
        const a = e.defaultFieldValue;
        r.target.checked = a != null && a === e.buttonValue;
      }),
      this.enableScripting && this.hasJSActions)
    ) {
      const r = e.buttonValue;
      (n.addEventListener("updatefromsandbox", (a) => {
        const o = {
          value: (l) => {
            const h = r === l.detail.value;
            for (const d of this._getElementsByName(l.target.name)) {
              const u = h && d.id === s;
              (d.domElement && (d.domElement.checked = u), t.setValue(d.id, { value: u }));
            }
          },
        };
        this._dispatchEventFromSandbox(o, a);
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
          (a) => a.target.checked,
        ));
    }
    return (this._setDefaultPropertiesFromJS(n), this.container.append(n), this.container);
  }
}