
class Pe {
  #t = null;
  #e = !1;
  #s = null;
  #i = null;
  static #n = null;
  constructor(t) {
    ((this.#s = t),
      (this.#i = t._uiManager),
      (Pe.#n ||= Object.freeze({
        freetext: "pdfjs-editor-color-picker-free-text-input",
        ink: "pdfjs-editor-color-picker-ink-input",
      })));
  }
  renderButton() {
    if (this.#t) return this.#t;
    const {
        editorType: t,
        colorType: e,
        colorAndOpacityType: s,
        opacityType: i,
        color: n,
        opacity: r,
      } = this.#s,
      a = (this.#e = j.isAlphaColorInputSupported && i !== void 0),
      o = (this.#t = document.createElement("input"));
    if (((o.type = "color"), a)) {
      o.setAttribute("alpha", "");
      const l = T.hexNums[Math.round((r ?? 1) * 255)];
      o.value = (n || "#000000") + l;
    } else o.value = n || "#000000";
    return (
      (o.className = "basicColorPicker"),
      (o.tabIndex = 0),
      o.setAttribute("data-l10n-id", Pe.#n[t]),
      o.addEventListener(
        "input",
        () => {
          if (a) {
            const l = ge(o.value);
            if (!l) return;
            const [h, d, u, f] = l,
              p = T.makeHexColor(h, d, u);
            s !== void 0
              ? this.#i.updateParams(s, { color: p, opacity: f })
              : (this.#i.updateParams(e, p), this.#i.updateParams(i, f));
          } else this.#i.updateParams(e, o.value);
        },
        { signal: this.#i._signal },
      ),
      o
    );
  }
  update(t) {
    if (this.#t)
      if (this.#e) {
        const e = T.hexNums[Math.round(this.#s.opacity * 255)];
        this.#t.value = t + e;
      } else this.#t.value = t;
  }
  updateOpacity(t) {
    if (!this.#t || !this.#e) return;
    const e = T.hexNums[Math.round(t * 255)];
    this.#t.value = this.#s.color + e;
  }
  destroy() {
    (this.#t?.remove(), (this.#t = null));
  }
  hideDropdown() {}
}