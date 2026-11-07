
class Se {
  #t = null;
  #e = null;
  #s;
  #i = null;
  #n = null;
  #a = null;
  #r = null;
  #o = null;
  static #l = null;
  constructor(t) {
    ((this.#s = t),
      (Se.#l ||= Object.freeze({
        freetext: "pdfjs-editor-remove-freetext-button",
        highlight: "pdfjs-editor-remove-highlight-button",
        ink: "pdfjs-editor-remove-ink-button",
        stamp: "pdfjs-editor-remove-stamp-button",
        signature: "pdfjs-editor-remove-signature-button",
      })));
  }
  render() {
    const t = (this.#t = document.createElement("div"));
    (t.classList.add("editToolbar", "hidden"), t.setAttribute("role", "toolbar"));
    const e = this.#s._uiManager._signal;
    e instanceof AbortSignal &&
      !e.aborted &&
      (t.addEventListener("contextmenu", kt, { signal: e }),
      t.addEventListener("pointerdown", Se.#h, { signal: e }));
    const s = (this.#i = document.createElement("div"));
    ((s.className = "buttons"), t.append(s));
    const i = this.#s.toolbarPosition;
    if (i) {
      const { style: n } = t,
        r = this.#s._uiManager.direction === "ltr" ? 1 - i[0] : i[0];
      ((n.insetInlineEnd = `${100 * r}%`),
        (n.top = `calc(${100 * i[1]}% + var(--editor-toolbar-vert-offset))`));
    }
    return t;
  }
  get div() {
    return this.#t;
  }
  static #h(t) {
    t.stopPropagation();
  }
  #u(t) {
    ((this.#s._focusEventsAllowed = !1), rt(t));
  }
  #d(t) {
    ((this.#s._focusEventsAllowed = !0), rt(t));
  }
  #f(t) {
    const e = this.#s._uiManager._signal;
    return !(e instanceof AbortSignal) || e.aborted
      ? !1
      : (t.addEventListener("focusin", this.#u.bind(this), { capture: !0, signal: e }),
        t.addEventListener("focusout", this.#d.bind(this), { capture: !0, signal: e }),
        t.addEventListener("contextmenu", kt, { signal: e }),
        !0);
  }
  hide() {
    (this.#t.classList.add("hidden"), this.#e?.hideDropdown());
  }
  show() {
    (this.#t.classList.remove("hidden"), this.#n?.shown(), this.#a?.shown());
  }
  addDeleteButton() {
    const { editorType: t, _uiManager: e } = this.#s,
      s = document.createElement("button");
    (s.classList.add("basic", "deleteButton"),
      (s.tabIndex = 0),
      s.setAttribute("data-l10n-id", Se.#l[t]),
      this.#f(s) &&
        s.addEventListener(
          "click",
          (i) => {
            e.delete();
          },
          { signal: e._signal },
        ),
      this.#i.append(s));
  }
  get #g() {
    const t = document.createElement("div");
    return ((t.className = "divider"), t);
  }
  async addAltText(t) {
    const e = await t.render();
    (this.#f(e), this.#i.append(e, this.#g), (this.#n = t));
  }
  addComment(t, e = null) {
    if (this.#a) return;
    const s = t.renderForToolbar();
    if (!s) return;
    this.#f(s);
    const i = (this.#r = this.#g);
    (e ? (this.#i.insertBefore(s, e), this.#i.insertBefore(i, e)) : this.#i.append(s, i),
      (this.#a = t),
      (t.toolbar = this));
  }
  addColorPicker(t) {
    if (this.#e) return;
    this.#e = t;
    const e = t.renderButton();
    (this.#f(e), this.#i.append(e, this.#g));
  }
  async addEditSignatureButton(t) {
    const e = (this.#o = await t.renderEditButton(this.#s));
    e && (this.#f(e), this.#i.append(e, this.#g));
  }
  removeButton(t) {
    t === "comment" &&
      (this.#a?.removeToolbarCommentButton(), (this.#a = null), this.#r?.remove(), (this.#r = null));
  }
  async addButton(t, e) {
    switch (t) {
      case "colorPicker":
        e && this.addColorPicker(e);
        break;
      case "altText":
        e && (await this.addAltText(e));
        break;
      case "editSignature":
        e && (await this.addEditSignatureButton(e));
        break;
      case "delete":
        this.addDeleteButton();
        break;
      case "comment":
        e && this.addComment(e);
        break;
    }
  }
  async addButtonBefore(t, e, s) {
    if (!e && t === "comment") return;
    const i = this.#i.querySelector(s);
    i && t === "comment" && this.addComment(e, i);
  }
  updateEditSignatureButton(t) {
    this.#o && (this.#o.title = t);
  }
  remove() {
    (this.#t.remove(), this.#e?.destroy(), (this.#e = null));
  }
}