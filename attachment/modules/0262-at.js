
class at extends D {
  #t = "";
  #e = `${this.id}-editor`;
  #s = null;
  #i;
  _colorPicker = null;
  static _freeTextDefaultContent = "";
  static _internalPadding = 0;
  static _defaultColor = null;
  static _defaultFontSize = 10;
  static get _keyboardManager() {
    const t = at.prototype,
      e = (n) => n.isEmpty(),
      s = jt.TRANSLATE_SMALL,
      i = jt.TRANSLATE_BIG;
    return k(
      this,
      "_keyboardManager",
      new bt([
        [["ctrl+s", "mac+meta+s", "ctrl+p", "mac+meta+p"], t.commitOrRemove, { bubbles: !0 }],
        [["ctrl+Enter", "mac+meta+Enter"], t.commitOrRemove],
        [["Escape"], t.commitOrRemove],
        [["ArrowLeft"], t._translateEmpty, { args: [-s, 0], checker: e }],
        [["ctrl+ArrowLeft", "mac+shift+ArrowLeft"], t._translateEmpty, { args: [-i, 0], checker: e }],
        [["ArrowRight"], t._translateEmpty, { args: [s, 0], checker: e }],
        [["ctrl+ArrowRight", "mac+shift+ArrowRight"], t._translateEmpty, { args: [i, 0], checker: e }],
        [["ArrowUp"], t._translateEmpty, { args: [0, -s], checker: e }],
        [["ctrl+ArrowUp", "mac+shift+ArrowUp"], t._translateEmpty, { args: [0, -i], checker: e }],
        [["ArrowDown"], t._translateEmpty, { args: [0, s], checker: e }],
        [["ctrl+ArrowDown", "mac+shift+ArrowDown"], t._translateEmpty, { args: [0, i], checker: e }],
      ]),
    );
  }
  static _type = "freetext";
  static _editorType = B.FREETEXT;
  constructor(t) {
    (super({ ...t, name: "freeTextEditor" }),
      (this.color = t.color || at._defaultColor || D._defaultLineColor),
      (this.#i = t.fontSize || at._defaultFontSize),
      this.annotationElementId || this._uiManager.a11yAlert(D._l10nAlert.freetext),
      (this.canAddComment = !1));
  }
  static initialize(t, e) {
    D.initialize(t, e);
    const s = getComputedStyle(document.documentElement);
    this._internalPadding = parseFloat(s.getPropertyValue("--freetext-padding"));
  }
  static updateDefaultParams(t, e) {
    switch (t) {
      case G.FREETEXT_SIZE:
        at._defaultFontSize = e;
        break;
      case G.FREETEXT_COLOR:
        at._defaultColor = e;
        break;
    }
  }
  updateParams(t, e) {
    switch (t) {
      case G.FREETEXT_SIZE:
        this.#n(e);
        break;
      case G.FREETEXT_COLOR:
        this.#a(e);
        break;
    }
  }
  static get defaultPropertiesToUpdate() {
    return [
      [G.FREETEXT_SIZE, at._defaultFontSize],
      [G.FREETEXT_COLOR, at._defaultColor || D._defaultLineColor],
    ];
  }
  get propertiesToUpdate() {
    return [
      [G.FREETEXT_SIZE, this.#i],
      [G.FREETEXT_COLOR, this.color],
    ];
  }
  get toolbarButtons() {
    return ((this._colorPicker ||= new Pe(this)), [["colorPicker", this._colorPicker]]);
  }
  get colorType() {
    return G.FREETEXT_COLOR;
  }
  #n(t) {
    const e = (i) => {
        ((this.editorDiv.style.fontSize = `calc(${i}px * var(--total-scale-factor))`),
          this.translate(0, -(i - this.#i) * this.parentScale),
          (this.#i = i),
          this.#o());
      },
      s = this.#i;
    this.addCommands({
      cmd: e.bind(this, t),
      undo: e.bind(this, s),
      post: this._uiManager.updateUI.bind(this._uiManager, this),
      mustExec: !0,
      type: G.FREETEXT_SIZE,
      overwriteIfSameType: !0,
      keepUndo: !0,
    });
  }
  onUpdatedColor() {
    ((this.editorDiv.style.color = this.color),
      this._colorPicker?.update(this.color),
      super.onUpdatedColor());
  }
  #a(t) {
    const e = (i) => {
        ((this.color = i), this.onUpdatedColor());
      },
      s = this.color;
    this.addCommands({
      cmd: e.bind(this, t),
      undo: e.bind(this, s),
      post: this._uiManager.updateUI.bind(this._uiManager, this),
      mustExec: !0,
      type: G.FREETEXT_COLOR,
      overwriteIfSameType: !0,
      keepUndo: !0,
    });
  }
  _translateEmpty(t, e) {
    this._uiManager.translateSelectedEditors(t, e, !0);
  }
  getInitialTranslation() {
    const t = this.parentScale;
    return [-at._internalPadding * t, -(at._internalPadding + this.#i) * t];
  }
  rebuild() {
    this.parent && (super.rebuild(), this.div !== null && (this.isAttachedToDOM || this.parent.add(this)));
  }
  enableEditMode() {
    if (!super.enableEditMode()) return !1;
    (this.overlayDiv.classList.remove("enabled"),
      (this.editorDiv.contentEditable = !0),
      (this._isDraggable = !1),
      this.div.removeAttribute("aria-activedescendant"),
      (this.#s = new AbortController()));
    const t = this._uiManager.combinedSignal(this.#s);
    return (
      this.editorDiv.addEventListener("keydown", this.editorDivKeydown.bind(this), { signal: t }),
      this.editorDiv.addEventListener("focus", this.editorDivFocus.bind(this), { signal: t }),
      this.editorDiv.addEventListener("blur", this.editorDivBlur.bind(this), { signal: t }),
      this.editorDiv.addEventListener("input", this.editorDivInput.bind(this), { signal: t }),
      this.editorDiv.addEventListener("paste", this.editorDivPaste.bind(this), { signal: t }),
      !0
    );
  }
  disableEditMode() {
    return super.disableEditMode()
      ? (this.overlayDiv.classList.add("enabled"),
        (this.editorDiv.contentEditable = !1),
        this.div.setAttribute("aria-activedescendant", this.#e),
        (this._isDraggable = !0),
        this.#s?.abort(),
        (this.#s = null),
        this.div.focus({ preventScroll: !0 }),
        (this.isEditing = !1),
        this.parent.div.classList.add("freetextEditing"),
        !0)
      : !1;
  }
  focusin(t) {
    this._focusEventsAllowed && (super.focusin(t), t.target !== this.editorDiv && this.editorDiv.focus());
  }
  onceAdded(t) {
    this.width ||
      (this.enableEditMode(),
      t && this.editorDiv.focus(),
      this._initialOptions?.isCentered && this.center(),
      (this._initialOptions = null));
  }
  isEmpty() {
    return !this.editorDiv || this.editorDiv.innerText.trim() === "";
  }
  remove() {
    ((this.isEditing = !1),
      this.parent && (this.parent.setEditingState(!0), this.parent.div.classList.add("freetextEditing")),
      super.remove());
  }
  #r() {
    const t = [];
    this.editorDiv.normalize();
    let e = null;
    for (const s of this.editorDiv.childNodes)
      (e?.nodeType === Node.TEXT_NODE && s.nodeName === "BR") || (t.push(at.#l(s)), (e = s));
    return t.join(`
`);
  }
  #o() {
    const [t, e] = this.parentDimensions;
    let s;
    if (this.isAttachedToDOM) s = this.div.getBoundingClientRect();
    else {
      const { currentLayer: i, div: n } = this,
        r = n.style.display,
        a = n.classList.contains("hidden");
      (n.classList.remove("hidden"),
        (n.style.display = "hidden"),
        i.div.append(this.div),
        (s = n.getBoundingClientRect()),
        n.remove(),
        (n.style.display = r),
        n.classList.toggle("hidden", a));
    }
    (this.rotation % 180 === this.parentRotation % 180
      ? ((this.width = s.width / t), (this.height = s.height / e))
      : ((this.width = s.height / t), (this.height = s.width / e)),
      this.fixAndSetPosition());
  }
  commit() {
    if (!this.isInEditMode()) return;
    (super.commit(), this.disableEditMode());
    const t = this.#t,
      e = (this.#t = this.#r().trimEnd());
    if (t === e) return;
    const s = (i) => {
      if (((this.#t = i), !i)) {
        this.remove();
        return;
      }
      (this.#h(), this._uiManager.rebuild(this), this.#o());
    };
    (this.addCommands({
      cmd: () => {
        s(e);
      },
      undo: () => {
        s(t);
      },
      mustExec: !1,
    }),
      this.#o());
  }
  shouldGetKeyboardEvents() {
    return this.isInEditMode();
  }
  enterInEditMode() {
    (this.enableEditMode(), this.editorDiv.focus());
  }
  keydown(t) {
    t.target === this.div && t.key === "Enter" && (this.enterInEditMode(), t.preventDefault());
  }
  editorDivKeydown(t) {
    at._keyboardManager.exec(this, t);
  }
  editorDivFocus(t) {
    this.isEditing = !0;
  }
  editorDivBlur(t) {
    this.isEditing = !1;
  }
  editorDivInput(t) {
    this.parent.div.classList.toggle("freetextEditing", this.isEmpty());
  }
  disableEditing() {
    (this.editorDiv.setAttribute("role", "comment"), this.editorDiv.removeAttribute("aria-multiline"));
  }
  enableEditing() {
    (this.editorDiv.setAttribute("role", "textbox"), this.editorDiv.setAttribute("aria-multiline", !0));
  }
  get canChangeContent() {
    return !0;
  }
  render() {
    if (this.div) return this.div;
    let t, e;
    ((this._isCopy || this.annotationElementId) && ((t = this.x), (e = this.y)),
      super.render(),
      (this.editorDiv = document.createElement("div")),
      (this.editorDiv.className = "internal"),
      this.editorDiv.setAttribute("id", this.#e),
      this.editorDiv.setAttribute("data-l10n-id", "pdfjs-free-text2"),
      this.editorDiv.setAttribute("data-l10n-attrs", "default-content"),
      this.enableEditing(),
      (this.editorDiv.contentEditable = !0));
    const { style: s } = this.editorDiv;
    if (
      ((s.fontSize = `calc(${this.#i}px * var(--total-scale-factor))`),
      (s.color = this.color),
      this.div.append(this.editorDiv),
      (this.overlayDiv = document.createElement("div")),
      this.overlayDiv.classList.add("overlay", "enabled"),
      this.div.append(this.overlayDiv),
      this._isCopy || this.annotationElementId)
    ) {
      const [i, n] = this.parentDimensions;
      if (this.annotationElementId) {
        const { position: r } = this._initialData;
        let [a, o] = this.getInitialTranslation();
        [a, o] = this.pageTranslationToScreen(a, o);
        const [l, h] = this.pageDimensions,
          [d, u] = this.pageTranslation;
        let f, p;
        switch (this.rotation) {
          case 0:
            ((f = t + (r[0] - d) / l), (p = e + this.height - (r[1] - u) / h));
            break;
          case 90:
            ((f = t + (r[0] - d) / l), (p = e - (r[1] - u) / h), ([a, o] = [o, -a]));
            break;
          case 180:
            ((f = t - this.width + (r[0] - d) / l), (p = e - (r[1] - u) / h), ([a, o] = [-a, -o]));
            break;
          case 270:
            ((f = t + (r[0] - d - this.height * h) / l),
              (p = e + (r[1] - u - this.width * l) / h),
              ([a, o] = [-o, a]));
            break;
        }
        this.setAt(f * i, p * n, a, o);
      } else this._moveAfterPaste(t, e);
      (this.#h(), (this._isDraggable = !0), (this.editorDiv.contentEditable = !1));
    } else ((this._isDraggable = !1), (this.editorDiv.contentEditable = !0));
    return this.div;
  }
  static #l(t) {
    return (t.nodeType === Node.TEXT_NODE ? t.nodeValue : t.innerText).replaceAll(Ge, "");
  }
  editorDivPaste(t) {
    const e = t.clipboardData || window.clipboardData,
      { types: s } = e;
    if (s.length === 1 && s[0] === "text/plain") return;
    t.preventDefault();
    const i = at.#d(e.getData("text") || "").replaceAll(
      Ge,
      `
`,
    );
    if (!i) return;
    const n = window.getSelection();
    if (!n.rangeCount) return;
    (this.editorDiv.normalize(), n.deleteFromDocument());
    const r = n.getRangeAt(0);
    if (
      !i.includes(`
`)
    ) {
      (r.insertNode(document.createTextNode(i)), this.editorDiv.normalize(), n.collapseToStart());
      return;
    }
    const { startContainer: a, startOffset: o } = r,
      l = [],
      h = [];
    if (a.nodeType === Node.TEXT_NODE) {
      const f = a.parentElement;
      if ((h.push(a.nodeValue.slice(o).replaceAll(Ge, "")), f !== this.editorDiv)) {
        let p = l;
        for (const g of this.editorDiv.childNodes) {
          if (g === f) {
            p = h;
            continue;
          }
          p.push(at.#l(g));
        }
      }
      l.push(a.nodeValue.slice(0, o).replaceAll(Ge, ""));
    } else if (a === this.editorDiv) {
      let f = l,
        p = 0;
      for (const g of this.editorDiv.childNodes) (p++ === o && (f = h), f.push(at.#l(g)));
    }
    ((this.#t = `${l.join(`
`)}${i}${h.join(`
`)}`),
      this.#h());
    const d = new Range();
    let u = Math.sumPrecise(l.map((f) => f.length));
    for (const { firstChild: f } of this.editorDiv.childNodes)
      if (f.nodeType === Node.TEXT_NODE) {
        const p = f.nodeValue.length;
        if (u <= p) {
          (d.setStart(f, u), d.setEnd(f, u));
          break;
        }
        u -= p;
      }
    (n.removeAllRanges(), n.addRange(d));
  }
  #h() {
    if ((this.editorDiv.replaceChildren(), !!this.#t))
      for (const t of this.#t.split(`
`)) {
        const e = document.createElement("div");
        (e.append(t ? document.createTextNode(t) : document.createElement("br")), this.editorDiv.append(e));
      }
  }
  #u() {
    return this.#t.replaceAll(" ", " ");
  }
  static #d(t) {
    return t.replaceAll(" ", " ");
  }
  get contentDiv() {
    return this.editorDiv;
  }
  getPDFRect() {
    const t = at._internalPadding * this.parentScale;
    return this.getRect(t, t);
  }
  static async deserialize(t, e, s) {
    let i = null;
    if (t instanceof dn) {
      const {
        data: {
          defaultAppearanceData: { fontSize: r, fontColor: a },
          rect: o,
          rotation: l,
          id: h,
          popupRef: d,
          richText: u,
          contentsObj: f,
          creationDate: p,
          modificationDate: g,
        },
        textContent: m,
        textPosition: b,
        parent: {
          page: { pageNumber: y },
        },
      } = t;
      if (!m?.length) return null;
      i = t = {
        annotationType: B.FREETEXT,
        color: Array.from(a),
        fontSize: r,
        value: m.join(`
`),
        position: b,
        pageIndex: y - 1,
        rect: o.slice(0),
        rotation: l,
        annotationElementId: h,
        id: h,
        deleted: !1,
        popupRef: d,
        comment: f?.str || null,
        richText: u,
        creationDate: p,
        modificationDate: g,
      };
    }
    const n = await super.deserialize(t, e, s);
    return (
      (n.#i = t.fontSize),
      (n.color = T.makeHexColor(...t.color)),
      (n.#t = at.#d(t.value)),
      (n._initialData = i),
      t.comment && n.setCommentData(t),
      n
    );
  }
  serialize(t = !1) {
    if (this.isEmpty()) return null;
    if (this.deleted) return this.serializeDeleted();
    const e = D._colorManager.convert(
        this.isAttachedToDOM ? getComputedStyle(this.editorDiv).color : this.color,
      ),
      s = Object.assign(super.serialize(t), { color: e, fontSize: this.#i, value: this.#u() });
    return (
      this.addComment(s),
      t
        ? ((s.isCopy = !0), s)
        : this.annotationElementId && !this.#f(s)
          ? null
          : ((s.id = this.annotationElementId), s)
    );
  }
  #f(t) {
    const { value: e, fontSize: s, color: i, pageIndex: n } = this._initialData;
    return (
      this.hasEditedComment ||
      this._hasBeenMoved ||
      t.value !== e ||
      t.fontSize !== s ||
      t.color.some((r, a) => r !== i[a]) ||
      t.pageIndex !== n
    );
  }
  renderAnnotationElement(t) {
    const e = super.renderAnnotationElement(t);
    if (!e) return null;
    const { style: s } = e;
    ((s.fontSize = `calc(${this.#i}px * var(--total-scale-factor))`),
      (s.color = this.color),
      e.replaceChildren());
    for (const i of this.#t.split(`
`)) {
      const n = document.createElement("div");
      (n.append(i ? document.createTextNode(i) : document.createElement("br")), e.append(n));
    }
    return (
      t.updateEdited({
        rect: this.getPDFRect(),
        popup:
          this._uiManager.hasCommentManager() || this.hasEditedComment ? this.comment : { text: this.#t },
      }),
      e
    );
  }
  resetAnnotationElement(t) {
    (super.resetAnnotationElement(t), t.resetEdited());
  }
}