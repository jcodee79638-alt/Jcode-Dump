
class St {
  #t = null;
  #e = null;
  #s;
  #i = null;
  #n = !1;
  #a = !1;
  #r = null;
  #o;
  #l = null;
  #h = null;
  static #u = null;
  static get _keyboardManager() {
    return k(
      this,
      "_keyboardManager",
      new bt([
        [["Escape"], St.prototype._hideDropdownFromKeyboard],
        [["Space"], St.prototype._colorSelectFromKeyboard],
        [["ArrowDown", "ArrowRight"], St.prototype._moveToNext],
        [["ArrowUp", "ArrowLeft"], St.prototype._moveToPrevious],
        [["Home"], St.prototype._moveToBeginning],
        [["End"], St.prototype._moveToEnd],
      ]),
    );
  }
  constructor({ editor: t = null, uiManager: e = null }) {
    (t ? ((this.#a = !1), (this.#r = t)) : (this.#a = !0),
      (this.#h = t?._uiManager || e),
      (this.#o = this.#h._eventBus),
      (this.#s = t?.color?.toUpperCase() || this.#h?.highlightColors.values().next().value || "#FFFF98"),
      (St.#u ||= Object.freeze({
        blue: "pdfjs-editor-colorpicker-blue",
        green: "pdfjs-editor-colorpicker-green",
        pink: "pdfjs-editor-colorpicker-pink",
        red: "pdfjs-editor-colorpicker-red",
        yellow: "pdfjs-editor-colorpicker-yellow",
      })));
  }
  renderButton() {
    const t = (this.#t = document.createElement("button"));
    ((t.className = "colorPicker"),
      (t.tabIndex = "0"),
      t.setAttribute("data-l10n-id", "pdfjs-editor-colorpicker-button"),
      (t.ariaHasPopup = "true"),
      this.#r && (t.ariaControls = `${this.#r.id}_colorpicker_dropdown`));
    const e = this.#h._signal;
    (t.addEventListener("click", this.#m.bind(this), { signal: e }),
      t.addEventListener("keydown", this.#g.bind(this), { signal: e }));
    const s = (this.#e = document.createElement("span"));
    return (
      (s.className = "swatch"),
      (s.ariaHidden = "true"),
      (s.style.backgroundColor = this.#s),
      t.append(s),
      t
    );
  }
  renderMainDropdown() {
    const t = (this.#i = this.#d());
    return ((t.ariaOrientation = "horizontal"), (t.ariaLabelledBy = "highlightColorPickerLabel"), t);
  }
  #d() {
    const t = document.createElement("div"),
      e = this.#h._signal;
    (t.addEventListener("contextmenu", kt, { signal: e }),
      (t.className = "dropdown"),
      (t.role = "listbox"),
      (t.ariaMultiSelectable = "false"),
      (t.ariaOrientation = "vertical"),
      t.setAttribute("data-l10n-id", "pdfjs-editor-colorpicker-dropdown"),
      this.#r && (t.id = `${this.#r.id}_colorpicker_dropdown`));
    for (const [s, i] of this.#h.highlightColors) {
      const n = document.createElement("button");
      ((n.tabIndex = "0"),
        (n.role = "option"),
        n.setAttribute("data-color", i),
        (n.title = s),
        n.setAttribute("data-l10n-id", St.#u[s]));
      const r = document.createElement("span");
      (n.append(r),
        (r.className = "swatch"),
        (r.style.backgroundColor = i),
        (n.ariaSelected = i === this.#s),
        n.addEventListener("click", this.#f.bind(this, i), { signal: e }),
        t.append(n));
    }
    return (t.addEventListener("keydown", this.#g.bind(this), { signal: e }), t);
  }
  #f(t, e) {
    (e.stopPropagation(),
      this.#o.dispatch("switchannotationeditorparams", { source: this, type: G.HIGHLIGHT_COLOR, value: t }),
      this.update(t));
  }
  _colorSelectFromKeyboard(t) {
    if (t.target === this.#t) {
      this.#m(t);
      return;
    }
    const e = t.target.getAttribute("data-color");
    e && this.#f(e, t);
  }
  _moveToNext(t) {
    if (!this.#p) {
      this.#m(t);
      return;
    }
    if (t.target === this.#t) {
      this.#i.firstElementChild?.focus();
      return;
    }
    t.target.nextSibling?.focus();
  }
  _moveToPrevious(t) {
    if (t.target === this.#i?.firstElementChild || t.target === this.#t) {
      this.#p && this._hideDropdownFromKeyboard();
      return;
    }
    (this.#p || this.#m(t), t.target.previousSibling?.focus());
  }
  _moveToBeginning(t) {
    if (!this.#p) {
      this.#m(t);
      return;
    }
    this.#i.firstElementChild?.focus();
  }
  _moveToEnd(t) {
    if (!this.#p) {
      this.#m(t);
      return;
    }
    this.#i.lastElementChild?.focus();
  }
  #g(t) {
    St._keyboardManager.exec(this, t);
  }
  #m(t) {
    if (this.#p) {
      this.hideDropdown();
      return;
    }
    if (
      ((this.#n = t.detail === 0),
      this.#l ||
        ((this.#l = new AbortController()),
        window.addEventListener("pointerdown", this.#c.bind(this), {
          signal: this.#h.combinedSignal(this.#l),
        })),
      (this.#t.ariaExpanded = "true"),
      this.#i)
    ) {
      this.#i.classList.remove("hidden");
      return;
    }
    const e = (this.#i = this.#d());
    this.#t.append(e);
  }
  #c(t) {
    this.#i?.contains(t.target) || this.hideDropdown();
  }
  hideDropdown() {
    (this.#i?.classList.add("hidden"), (this.#t.ariaExpanded = "false"), this.#l?.abort(), (this.#l = null));
  }
  get #p() {
    return this.#i && !this.#i.classList.contains("hidden");
  }
  _hideDropdownFromKeyboard() {
    if (!this.#a) {
      if (!this.#p) {
        this.#r?.unselect();
        return;
      }
      (this.hideDropdown(), this.#t.focus({ preventScroll: !0, focusVisible: this.#n }));
    }
  }
  update(t) {
    if ((this.#e && (this.#e.style.backgroundColor = t), !this.#i)) return;
    const e = this.#h.highlightColors.values();
    for (const s of this.#i.children) s.ariaSelected = e.next().value === t.toUpperCase();
  }
  destroy() {
    (this.#t?.remove(), (this.#t = null), (this.#e = null), this.#i?.remove(), (this.#i = null));
  }
}