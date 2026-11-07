
class Le {
  #t = null;
  #e = null;
  #s = !1;
  #i = null;
  #n = null;
  #a = null;
  #r = null;
  #o = null;
  #l = !1;
  #h = null;
  constructor(t) {
    this.#i = t;
  }
  renderForToolbar() {
    const t = (this.#e = document.createElement("button"));
    return ((t.className = "comment"), this.#u(t, !1));
  }
  renderForStandalone() {
    const t = (this.#t = document.createElement("button"));
    t.className = "annotationCommentButton";
    const e = this.#i.commentButtonPosition;
    if (e) {
      const { style: s } = t;
      ((s.insetInlineEnd = `calc(${100 * (this.#i._uiManager.direction === "ltr" ? 1 - e[0] : e[0])}% - var(--comment-button-dim))`),
        (s.top = `calc(${100 * e[1]}% - var(--comment-button-dim))`));
      const i = this.#i.commentButtonColor;
      i && (s.backgroundColor = i);
    }
    return this.#u(t, !0);
  }
  focusButton() {
    setTimeout(() => {
      (this.#t ?? this.#e)?.focus();
    }, 0);
  }
  onUpdatedColor() {
    if (!this.#t) return;
    const t = this.#i.commentButtonColor;
    (t && (this.#t.style.backgroundColor = t), this.#i._uiManager.updatePopupColor(this.#i));
  }
  get commentButtonWidth() {
    return (this.#t?.getBoundingClientRect().width ?? 0) / this.#i.parent.boundingClientRect.width;
  }
  get commentPopupPositionInLayer() {
    if (this.#h) return this.#h;
    if (!this.#t) return null;
    const { x: t, y: e, height: s } = this.#t.getBoundingClientRect(),
      { x: i, y: n, width: r, height: a } = this.#i.parent.boundingClientRect;
    return [(t - i) / r, (e + s - n) / a];
  }
  set commentPopupPositionInLayer(t) {
    this.#h = t;
  }
  hasDefaultPopupPosition() {
    return this.#h === null;
  }
  removeStandaloneCommentButton() {
    (this.#t?.remove(), (this.#t = null));
  }
  removeToolbarCommentButton() {
    (this.#e?.remove(), (this.#e = null));
  }
  setCommentButtonStates({ selected: t, hasPopup: e }) {
    this.#t && (this.#t.classList.toggle("selected", t), (this.#t.ariaExpanded = e));
  }
  #u(t, e) {
    if (!this.#i._uiManager.hasCommentManager()) return null;
    ((t.tabIndex = "0"),
      (t.ariaHasPopup = "dialog"),
      e
        ? ((t.ariaControls = "commentPopup"), t.setAttribute("data-l10n-id", "pdfjs-show-comment-button"))
        : ((t.ariaControlsElements = [this.#i._uiManager.getCommentDialogElement()]),
          t.setAttribute("data-l10n-id", "pdfjs-editor-add-comment-button")));
    const s = this.#i._uiManager._signal;
    if (!(s instanceof AbortSignal) || s.aborted) return t;
    (t.addEventListener("contextmenu", kt, { signal: s }),
      e &&
        (t.addEventListener(
          "focusin",
          (n) => {
            ((this.#i._focusEventsAllowed = !1), rt(n));
          },
          { capture: !0, signal: s },
        ),
        t.addEventListener(
          "focusout",
          (n) => {
            ((this.#i._focusEventsAllowed = !0), rt(n));
          },
          { capture: !0, signal: s },
        )),
      t.addEventListener("pointerdown", (n) => n.stopPropagation(), { signal: s }));
    const i = (n) => {
      (n.preventDefault(), t === this.#e ? this.edit() : this.#i.toggleComment(!0));
    };
    return (
      t.addEventListener("click", i, { capture: !0, signal: s }),
      t.addEventListener(
        "keydown",
        (n) => {
          n.target === t && n.key === "Enter" && ((this.#s = !0), i(n));
        },
        { signal: s },
      ),
      t.addEventListener(
        "pointerenter",
        () => {
          this.#i.toggleComment(!1, !0);
        },
        { signal: s },
      ),
      t.addEventListener(
        "pointerleave",
        () => {
          this.#i.toggleComment(!1, !1);
        },
        { signal: s },
      ),
      t
    );
  }
  edit(t) {
    const e = this.commentPopupPositionInLayer;
    let s, i;
    if (e) [s, i] = e;
    else {
      [s, i] = this.#i.commentButtonPosition;
      const { width: h, height: d, x: u, y: f } = this.#i;
      ((s = u + s * h), (i = f + i * d));
    }
    const n = this.#i.parent.boundingClientRect,
      { x: r, y: a, width: o, height: l } = n;
    this.#i._uiManager.editComment(this.#i, r + s * o, a + i * l, { ...t, parentDimensions: n });
  }
  finish() {
    this.#e && (this.#e.focus({ focusVisible: this.#s }), (this.#s = !1));
  }
  isDeleted() {
    return this.#l || this.#r === "";
  }
  isEmpty() {
    return this.#r === null;
  }
  hasBeenEdited() {
    return this.isDeleted() || this.#r !== this.#n;
  }
  serialize() {
    return this.data;
  }
  get data() {
    return { text: this.#r, richText: this.#a, date: this.#o, deleted: this.isDeleted() };
  }
  set data(t) {
    if ((t !== this.#r && (this.#a = null), t === null)) {
      ((this.#r = ""), (this.#l = !0));
      return;
    }
    ((this.#r = t), (this.#o = new Date()), (this.#l = !1));
  }
  restoreData({ text: t, richText: e, date: s }) {
    ((this.#r = t), (this.#a = e), (this.#o = s), (this.#l = !1));
  }
  setInitialText(t, e = null) {
    ((this.#n = t), (this.data = t), (this.#o = null), (this.#a = e));
  }
  shown() {}
  destroy() {
    (this.#e?.remove(),
      (this.#e = null),
      this.#t?.remove(),
      (this.#t = null),
      (this.#r = ""),
      (this.#a = null),
      (this.#o = null),
      (this.#i = null),
      (this.#s = !1),
      (this.#l = !1));
  }
}