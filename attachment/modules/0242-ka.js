
class ka extends te {
  constructor(t) {
    super(t, { isRenderable: t.renderForms });
  }
  render() {
    this.container.classList.add("choiceWidgetAnnotation");
    const t = this.annotationStorage,
      e = this.data.id,
      s = t.getValue(e, { value: this.data.fieldValue }),
      i = document.createElement("select");
    (Jt.add(i),
      i.setAttribute("data-element-id", e),
      (i.disabled = this.data.readOnly),
      this._setRequired(i, this.data.required),
      (i.name = this.data.fieldName),
      (i.tabIndex = 0));
    let n = this.data.combo && this.data.options.length > 0;
    (this.data.combo || ((i.size = this.data.options.length), this.data.multiSelect && (i.multiple = !0)),
      i.addEventListener("resetform", (d) => {
        const u = this.data.defaultFieldValue;
        for (const f of i.options) f.selected = f.value === u;
      }));
    const r = (d, u) => {
      const f = u.replaceAll(" ", " ");
      ((d.textContent = f), f !== u && d.setAttribute("display-value", u));
    };
    for (const d of this.data.options) {
      const u = document.createElement("option");
      (r(u, d.displayValue),
        (u.value = d.exportValue),
        s.value.includes(d.exportValue) && (u.setAttribute("selected", !0), (n = !1)),
        i.append(u));
    }
    let a = null;
    if (n) {
      const d = document.createElement("option");
      ((d.value = " "),
        d.setAttribute("hidden", !0),
        d.setAttribute("selected", !0),
        i.prepend(d),
        (a = () => {
          (d.remove(), i.removeEventListener("input", a), (a = null));
        }),
        i.addEventListener("input", a));
    }
    const o = (d) => {
      const u = d ? "value" : "textContent",
        { options: f, multiple: p } = i;
      return p
        ? Array.prototype.filter.call(f, (g) => g.selected).map((g) => g[u])
        : f.selectedIndex === -1
          ? null
          : f[f.selectedIndex][u];
    };
    let l = o(!1);
    const h = (d) => {
      const u = d.target.options;
      return Array.prototype.map.call(u, (f) => ({
        displayValue: f.getAttribute("display-value") || f.textContent,
        exportValue: f.value,
      }));
    };
    return (
      this.enableScripting && this.hasJSActions
        ? (i.addEventListener("updatefromsandbox", (d) => {
            const u = {
              value(f) {
                a?.();
                const p = f.detail.value,
                  g = new Set(Array.isArray(p) ? p : [p]);
                for (const m of i.options) m.selected = g.has(m.value);
                (t.setValue(e, { value: o(!0) }), (l = o(!1)));
              },
              multipleSelection(f) {
                i.multiple = !0;
              },
              remove(f) {
                const p = i.options,
                  g = f.detail.remove;
                ((p[g].selected = !1),
                  i.remove(g),
                  p.length > 0 &&
                    Array.prototype.findIndex.call(p, (b) => b.selected) === -1 &&
                    (p[0].selected = !0),
                  t.setValue(e, { value: o(!0), items: h(f) }),
                  (l = o(!1)));
              },
              clear(f) {
                for (; i.length !== 0;) i.remove(0);
                (t.setValue(e, { value: null, items: [] }), (l = o(!1)));
              },
              insert(f) {
                const { index: p, displayValue: g, exportValue: m } = f.detail.insert,
                  b = i.children[p],
                  y = document.createElement("option");
                (r(y, g),
                  (y.value = m),
                  b ? b.before(y) : i.append(y),
                  t.setValue(e, { value: o(!0), items: h(f) }),
                  (l = o(!1)));
              },
              items(f) {
                const { items: p } = f.detail;
                for (; i.length !== 0;) i.remove(0);
                for (const g of p) {
                  const { displayValue: m, exportValue: b } = g,
                    y = document.createElement("option");
                  (r(y, m), (y.value = b), i.append(y));
                }
                (i.options.length > 0 && (i.options[0].selected = !0),
                  t.setValue(e, { value: o(!0), items: h(f) }),
                  (l = o(!1)));
              },
              indices(f) {
                const p = new Set(f.detail.indices);
                for (const g of f.target.options) g.selected = p.has(g.index);
                (t.setValue(e, { value: o(!0) }), (l = o(!1)));
              },
              editable(f) {
                f.target.disabled = !f.detail.editable;
              },
            };
            this._dispatchEventFromSandbox(u, d);
          }),
          i.addEventListener("input", (d) => {
            const u = o(!0),
              f = o(!1);
            (t.setValue(e, { value: u }),
              d.preventDefault(),
              this.linkService.eventBus?.dispatch("dispatcheventinsandbox", {
                source: this,
                detail: {
                  id: e,
                  name: "Keystroke",
                  value: l,
                  change: f,
                  changeEx: u,
                  willCommit: !1,
                  commitKey: 1,
                  keyDown: !1,
                },
              }));
          }),
          this._setEventListeners(
            i,
            null,
            [
              ["focus", "Focus"],
              ["blur", "Blur"],
              ["mousedown", "Mouse Down"],
              ["mouseenter", "Mouse Enter"],
              ["mouseleave", "Mouse Exit"],
              ["mouseup", "Mouse Up"],
              ["input", "Action"],
              ["input", "Validate"],
            ],
            (d) => d.target.value,
          ))
        : i.addEventListener("input", function (d) {
            t.setValue(e, { value: o(!0) });
          }),
      this.data.combo && this._setTextStyle(i),
      this._setBackgroundColor(i),
      this._setDefaultPropertiesFromJS(i),
      this.container.append(i),
      this.container
    );
  }
}