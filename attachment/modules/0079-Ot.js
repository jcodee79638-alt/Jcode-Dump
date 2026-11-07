
class Ot {
  #t = null;
  #e = !1;
  #s = null;
  #i = null;
  #n = null;
  #a = null;
  #r = !1;
  #o = null;
  #l = null;
  #h = null;
  #u = null;
  #d = !1;
  static #f = null;
  static _l10n = null;
  constructor(t) {
    ((this.#l = t),
      (this.#d = t._uiManager.useNewAltTextFlow),
      (Ot.#f ||= Object.freeze({
        added: "pdfjs-editor-new-alt-text-added-button",
        "added-label": "pdfjs-editor-new-alt-text-added-button-label",
        missing: "pdfjs-editor-new-alt-text-missing-button",
        "missing-label": "pdfjs-editor-new-alt-text-missing-button-label",
        review: "pdfjs-editor-new-alt-text-to-review-button",
        "review-label": "pdfjs-editor-new-alt-text-to-review-button-label",
      })));
  }
  static initialize(t) {
    Ot._l10n ??= t;
  }
  async render() {
    const t = (this.#s = document.createElement("button"));
    ((t.className = "altText"), (t.tabIndex = "0"));
    const e = (this.#i = document.createElement("span"));
    (t.append(e),
      this.#d
        ? (t.classList.add("new"),
          t.setAttribute("data-l10n-id", Ot.#f.missing),
          e.setAttribute("data-l10n-id", Ot.#f["missing-label"]))
        : (t.setAttribute("data-l10n-id", "pdfjs-editor-alt-text-button"),
          e.setAttribute("data-l10n-id", "pdfjs-editor-alt-text-button-label")));
    const s = this.#l._uiManager._signal;
    (t.addEventListener("contextmenu", kt, { signal: s }),
      t.addEventListener("pointerdown", (n) => n.stopPropagation(), { signal: s }));
    const i = (n) => {
      (n.preventDefault(),
        this.#l._uiManager.editAltText(this.#l),
        this.#d &&
          this.#l._reportTelemetry({
            action: "pdfjs.image.alt_text.image_status_label_clicked",
            data: { label: this.#g },
          }));
    };
    return (
      t.addEventListener("click", i, { capture: !0, signal: s }),
      t.addEventListener(
        "keydown",
        (n) => {
          n.target === t && n.key === "Enter" && ((this.#r = !0), i(n));
        },
        { signal: s },
      ),
      await this.#m(),
      t
    );
  }
  get #g() {
    return (this.#t && "added") || (this.#t === null && this.guessedText && "review") || "missing";
  }
  finish() {
    this.#s && (this.#s.focus({ focusVisible: this.#r }), (this.#r = !1));
  }
  isEmpty() {
    return this.#d ? this.#t === null : !this.#t && !this.#e;
  }
  hasData() {
    return this.#d ? this.#t !== null || !!this.#h : this.isEmpty();
  }
  get guessedText() {
    return this.#h;
  }
  async setGuessedText(t) {
    this.#t === null &&
      ((this.#h = t),
      (this.#u = await Ot._l10n.get("pdfjs-editor-new-alt-text-generated-alt-text-with-disclaimer", {
        generatedAltText: t,
      })),
      this.#m());
  }
  toggleAltTextBadge(t = !1) {
    if (!this.#d || this.#t) {
      (this.#o?.remove(), (this.#o = null));
      return;
    }
    if (!this.#o) {
      const e = (this.#o = document.createElement("div"));
      ((e.className = "noAltTextBadge"), this.#l.div.append(e));
    }
    this.#o.classList.toggle("hidden", !t);
  }
  serialize(t) {
    let e = this.#t;
    return (
      !t && this.#h === e && (e = this.#u),
      { altText: e, decorative: this.#e, guessedText: this.#h, textWithDisclaimer: this.#u }
    );
  }
  get data() {
    return { altText: this.#t, decorative: this.#e };
  }
  set data({ altText: t, decorative: e, guessedText: s, textWithDisclaimer: i, cancel: n = !1 }) {
    (s && ((this.#h = s), (this.#u = i)),
      !(this.#t === t && this.#e === e) && (n || ((this.#t = t), (this.#e = e)), this.#m()));
  }
  toggle(t = !1) {
    this.#s && (!t && this.#a && (clearTimeout(this.#a), (this.#a = null)), (this.#s.disabled = !t));
  }
  shown() {
    this.#l._reportTelemetry({
      action: "pdfjs.image.alt_text.image_status_label_displayed",
      data: { label: this.#g },
    });
  }
  destroy() {
    (this.#s?.remove(),
      (this.#s = null),
      (this.#i = null),
      (this.#n = null),
      this.#o?.remove(),
      (this.#o = null));
  }
  async #m() {
    const t = this.#s;
    if (!t) return;
    if (this.#d) {
      if (
        (t.classList.toggle("done", !!this.#t),
        t.setAttribute("data-l10n-id", Ot.#f[this.#g]),
        this.#i?.setAttribute("data-l10n-id", Ot.#f[`${this.#g}-label`]),
        !this.#t)
      ) {
        this.#n?.remove();
        return;
      }
    } else {
      if (!this.#t && !this.#e) {
        (t.classList.remove("done"), this.#n?.remove());
        return;
      }
      (t.classList.add("done"), t.setAttribute("data-l10n-id", "pdfjs-editor-alt-text-edit-button"));
    }
    let e = this.#n;
    if (!e) {
      ((this.#n = e = document.createElement("span")),
        (e.className = "tooltip"),
        e.setAttribute("role", "tooltip"),
        (e.id = `alt-text-tooltip-${this.#l.id}`));
      const i = 100,
        n = this.#l._uiManager._signal;
      (n.addEventListener(
        "abort",
        () => {
          (clearTimeout(this.#a), (this.#a = null));
        },
        { once: !0 },
      ),
        t.addEventListener(
          "mouseenter",
          () => {
            this.#a = setTimeout(() => {
              ((this.#a = null),
                this.#n.classList.add("show"),
                this.#l._reportTelemetry({ action: "alt_text_tooltip" }));
            }, i);
          },
          { signal: n },
        ),
        t.addEventListener(
          "mouseleave",
          () => {
            (this.#a && (clearTimeout(this.#a), (this.#a = null)), this.#n?.classList.remove("show"));
          },
          { signal: n },
        ));
    }
    (this.#e
      ? e.setAttribute("data-l10n-id", "pdfjs-editor-alt-text-decorative-tooltip")
      : (e.removeAttribute("data-l10n-id"), (e.textContent = this.#t)),
      e.parentNode || t.append(e),
      this.#l.getElementForAltText()?.setAttribute("aria-describedby", e.id));
  }
}