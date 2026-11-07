
class jt {
  #t = new AbortController();
  #e = null;
  #s = null;
  #i = new Map();
  #n = new Map();
  #a = null;
  #r = null;
  #o = null;
  #l = null;
  #h = null;
  #u = new Zn();
  #d = null;
  #f = null;
  #g = null;
  #m = 0;
  #c = new Set();
  #p = null;
  #b = null;
  #y = new Set();
  _editorUndoBar = null;
  #A = !1;
  #v = !1;
  #w = !1;
  #x = null;
  #_ = null;
  #E = null;
  #M = null;
  #k = !1;
  #T = null;
  #F = new Jn();
  #I = !1;
  #O = !1;
  #R = !1;
  #D = null;
  #N = null;
  #j = null;
  #B = null;
  #G = null;
  #C = B.NONE;
  #S = new Set();
  #H = null;
  #$ = null;
  #V = null;
  #q = null;
  #Y = null;
  #K = {
    isEditing: !1,
    isEmpty: !0,
    hasSomethingToUndo: !1,
    hasSomethingToRedo: !1,
    hasSelectedEditor: !1,
    hasSelectedText: !1,
  };
  #L = [0, 0];
  #W = null;
  #X = null;
  #tt = null;
  #et = null;
  #U = null;
  static TRANSLATE_SMALL = 1;
  static TRANSLATE_BIG = 10;
  static get _keyboardManager() {
    const t = jt.prototype,
      e = (r) =>
        r.#X.contains(document.activeElement) &&
        document.activeElement.tagName !== "BUTTON" &&
        r.hasSomethingToControl(),
      s = (r, { target: a }) => {
        if (a instanceof HTMLInputElement) {
          const { type: o } = a;
          return o !== "text" && o !== "number";
        }
        return !0;
      },
      i = this.TRANSLATE_SMALL,
      n = this.TRANSLATE_BIG;
    return k(
      this,
      "_keyboardManager",
      new bt([
        [["ctrl+a", "mac+meta+a"], t.selectAll, { checker: s }],
        [["ctrl+z", "mac+meta+z"], t.undo, { checker: s }],
        [
          ["ctrl+y", "ctrl+shift+z", "mac+meta+shift+z", "ctrl+shift+Z", "mac+meta+shift+Z"],
          t.redo,
          { checker: s },
        ],
        [
          [
            "Backspace",
            "alt+Backspace",
            "ctrl+Backspace",
            "shift+Backspace",
            "mac+Backspace",
            "mac+alt+Backspace",
            "mac+ctrl+Backspace",
            "Delete",
            "ctrl+Delete",
            "shift+Delete",
            "mac+Delete",
          ],
          t.delete,
          { checker: s },
        ],
        [
          ["Enter"],
          t.addNewEditorFromKeyboard,
          {
            checker: (r, { target: a }) =>
              !(a instanceof HTMLButtonElement) && r.#X.contains(a) && !r.isEnterHandled,
          },
        ],
        [
          ["Space"],
          t.addNewEditorFromKeyboard,
          {
            checker: (r, { target: a }) =>
              !(a instanceof HTMLButtonElement) && r.#X.contains(document.activeElement),
          },
        ],
        [["Escape"], t.unselectAll],
        [["ArrowLeft"], t.translateSelectedEditors, { args: [-i, 0], checker: e }],
        [
          ["ctrl+ArrowLeft", "mac+shift+ArrowLeft"],
          t.translateSelectedEditors,
          { args: [-n, 0], checker: e },
        ],
        [["ArrowRight"], t.translateSelectedEditors, { args: [i, 0], checker: e }],
        [
          ["ctrl+ArrowRight", "mac+shift+ArrowRight"],
          t.translateSelectedEditors,
          { args: [n, 0], checker: e },
        ],
        [["ArrowUp"], t.translateSelectedEditors, { args: [0, -i], checker: e }],
        [["ctrl+ArrowUp", "mac+shift+ArrowUp"], t.translateSelectedEditors, { args: [0, -n], checker: e }],
        [["ArrowDown"], t.translateSelectedEditors, { args: [0, i], checker: e }],
        [["ctrl+ArrowDown", "mac+shift+ArrowDown"], t.translateSelectedEditors, { args: [0, n], checker: e }],
      ]),
    );
  }
  constructor(t, e, s, i, n, r, a, o, l, h, d, u, f, p, g, m) {
    const b = (this._signal = this.#t.signal);
    ((this.#X = t),
      (this.#tt = e),
      (this.#et = s),
      (this.#o = i),
      (this.#d = n),
      (this.#$ = r),
      (this.#Y = o),
      (this._eventBus = a));
    const y = { signal: b, ...gs };
    (a.on("editingaction", this.onEditingAction.bind(this), y),
      a.on("pagechanging", this.onPageChanging.bind(this), y),
      a.on("scalechanging", this.onScaleChanging.bind(this), y),
      a.on("rotationchanging", this.onRotationChanging.bind(this), y),
      a.on("setpreference", this.onSetPreference.bind(this), y),
      a.on("switchannotationeditorparams", (A) => this.updateParams(A.type, A.value), y),
      window.addEventListener(
        "pointerdown",
        () => {
          this.#O = !0;
        },
        { capture: !0, signal: b },
      ),
      window.addEventListener(
        "pointerup",
        () => {
          this.#O = !1;
        },
        { capture: !0, signal: b },
      ),
      window.addEventListener("beforeunload", this.endCurrentEditing.bind(this), { capture: !0, signal: b }),
      this.#lt(),
      this.#pt(),
      this.#it(),
      (this.#l = o.annotationStorage),
      (this.#x = o.filterFactory),
      (this.#V = l),
      (this.#M = h || null),
      (this.#A = d),
      (this.#v = u),
      (this.#w = f),
      (this.#G = p || null),
      (this.viewParameters = { realScale: fe.PDF_TO_CSS_UNITS, rotation: 0 }),
      (this.isShiftKeyDown = !1),
      (this._editorUndoBar = g || null),
      (this._supportsPinchToZoom = m !== !1),
      n?.setSidebarUiManager(this));
  }
  destroy() {
    (this.#U?.resolve(), (this.#U = null), this.#t?.abort(), (this.#t = null), (this._signal = null));
    for (const t of this.#n.values()) t.destroy();
    (this.#n.clear(),
      this.#i.clear(),
      this.#y.clear(),
      this.#B?.clear(),
      (this.#e = null),
      this.#S.clear(),
      this.#u.destroy(),
      this.#o?.destroy(),
      this.#d?.destroy(),
      this.#$?.destroy(),
      this.#T?.hide(),
      (this.#T = null),
      this.#j?.destroy(),
      (this.#j = null),
      (this.#s = null),
      this.#_ && (clearTimeout(this.#_), (this.#_ = null)),
      this.#W && (clearTimeout(this.#W), (this.#W = null)),
      this._editorUndoBar?.destroy(),
      (this.#Y = null));
  }
  combinedSignal(t) {
    return AbortSignal.any([this._signal, t.signal]);
  }
  get mlManager() {
    return this.#G;
  }
  get useNewAltTextFlow() {
    return this.#v;
  }
  get useNewAltTextWhenAddingImage() {
    return this.#w;
  }
  get hcmFilter() {
    return k(
      this,
      "hcmFilter",
      this.#V ? this.#x.addHCMFilter(this.#V.foreground, this.#V.background) : "none",
    );
  }
  get direction() {
    return k(this, "direction", getComputedStyle(this.#X).direction);
  }
  get _highlightColors() {
    return k(
      this,
      "_highlightColors",
      this.#M
        ? new Map(
            this.#M
              .split(",")
              .map((t) => ((t = t.split("=").map((e) => e.trim())), (t[1] = t[1].toUpperCase()), t)),
          )
        : null,
    );
  }
  get highlightColors() {
    const { _highlightColors: t } = this;
    if (!t) return k(this, "highlightColors", null);
    const e = new Map(),
      s = !!this.#V;
    for (const [i, n] of t) {
      const r = i.endsWith("_HCM");
      if (s && r) {
        e.set(i.replace("_HCM", ""), n);
        continue;
      }
      !s && !r && e.set(i, n);
    }
    return k(this, "highlightColors", e);
  }
  get highlightColorNames() {
    return k(
      this,
      "highlightColorNames",
      this.highlightColors ? new Map(Array.from(this.highlightColors, (t) => t.reverse())) : null,
    );
  }
  getNonHCMColor(t) {
    if (!this._highlightColors) return t;
    const e = this.highlightColorNames.get(t);
    return this._highlightColors.get(e) || t;
  }
  getNonHCMColorName(t) {
    return this.highlightColorNames.get(t) || t;
  }
  setCurrentDrawingSession(t) {
    (t ? (this.unselectAll(), this.disableUserSelect(!0)) : this.disableUserSelect(!1), (this.#g = t));
  }
  setMainHighlightColorPicker(t) {
    this.#j = t;
  }
  editAltText(t, e = !1) {
    this.#o?.editAltText(this, t, e);
  }
  hasCommentManager() {
    return !!this.#d;
  }
  editComment(t, e, s, i) {
    this.#d?.showDialog(this, t, e, s, i);
  }
  selectComment(t, e) {
    this.#n.get(t)?.getEditorByUID(e)?.toggleComment(!0, !0);
  }
  updateComment(t) {
    this.#d?.updateComment(t.getData());
  }
  updatePopupColor(t) {
    this.#d?.updatePopupColor(t);
  }
  removeComment(t) {
    this.#d?.removeComments([t.uid]);
  }
  deleteComment(t, e) {
    const s = () => {
        t.comment = e;
      },
      i = () => {
        (this._editorUndoBar?.show(s, "comment"), this.toggleComment(null), (t.comment = null));
      };
    this.addCommands({ cmd: i, undo: s, mustExec: !0 });
  }
  toggleComment(t, e, s = void 0) {
    this.#d?.toggleCommentPopup(t, e, s);
  }
  makeCommentColor(t, e) {
    return (t && this.#d?.makeCommentColor(t, e)) || null;
  }
  getCommentDialogElement() {
    return this.#d?.dialogElement || null;
  }
  async waitForEditorsRendered(t) {
    if (this.#n.has(t - 1)) return;
    const { resolve: e, promise: s } = Promise.withResolvers(),
      i = (n) => {
        n.pageNumber === t && (this._eventBus.off("editorsrendered", i), e());
      };
    (this._eventBus.on("editorsrendered", i, gs), await s);
  }
  getSignature(t) {
    this.#$?.getSignature({ uiManager: this, editor: t });
  }
  get signatureManager() {
    return this.#$;
  }
  switchToMode(t, e) {
    (this._eventBus.on("annotationeditormodechanged", e, { once: !0, signal: this._signal, ...gs }),
      this._eventBus.dispatch("showannotationeditorui", { source: this, mode: t }));
  }
  setPreference(t, e) {
    this._eventBus.dispatch("setpreference", { source: this, name: t, value: e });
  }
  onSetPreference({ name: t, value: e }) {
    t === "enableNewAltTextWhenAddingImage" && (this.#w = e);
  }
  onPageChanging({ pageNumber: t }) {
    this.#m = t - 1;
  }
  deletePage(t) {
    for (const e of this.getEditors(t)) e.remove();
    (this.#n.delete(t), this.#m === t && (this.#m = 0));
  }
  focusMainContainer() {
    this.#X.focus();
  }
  findParent(t, e) {
    for (const s of this.#n.values()) {
      const { x: i, y: n, width: r, height: a } = s.div.getBoundingClientRect();
      if (t >= i && t <= i + r && e >= n && e <= n + a) return s;
    }
    return null;
  }
  disableUserSelect(t = !1) {
    this.#tt.classList.toggle("noUserSelect", t);
  }
  addShouldRescale(t) {
    this.#y.add(t);
  }
  removeShouldRescale(t) {
    this.#y.delete(t);
  }
  onScaleChanging({ scale: t }) {
    (this.commitOrRemove(), (this.viewParameters.realScale = t * fe.PDF_TO_CSS_UNITS));
    for (const e of this.#y) e.onScaleChanging();
    this.#g?.onScaleChanging();
  }
  onRotationChanging({ pagesRotation: t }) {
    (this.commitOrRemove(), (this.viewParameters.rotation = t));
  }
  #Z({ anchorNode: t }) {
    return t.nodeType === Node.TEXT_NODE ? t.parentElement : t;
  }
  #st(t) {
    const { currentLayer: e } = this;
    if (e.hasTextLayer(t)) return e;
    for (const s of this.#n.values()) if (s.hasTextLayer(t)) return s;
    return null;
  }
  highlightSelection(t = "", e = !1) {
    const s = document.getSelection();
    if (!s || s.isCollapsed) return;
    const { anchorNode: i, anchorOffset: n, focusNode: r, focusOffset: a } = s,
      o = s.toString(),
      h = this.#Z(s).closest(".textLayer"),
      d = this.getSelectionBoxes(h);
    if (!d) return;
    s.empty();
    const u = this.#st(h),
      f = this.#C === B.NONE,
      p = () => {
        const g = u?.createAndAddNewEditor({ x: 0, y: 0 }, !1, {
          methodOfCreation: t,
          boxes: d,
          anchorNode: i,
          anchorOffset: n,
          focusNode: r,
          focusOffset: a,
          text: o,
        });
        (f && this.showAllEditors("highlight", !0, !0), e && g?.editComment());
      };
    if (f) {
      this.switchToMode(B.HIGHLIGHT, p);
      return;
    }
    p();
  }
  commentSelection(t = "") {
    this.highlightSelection(t, !0);
  }
  endCurrentEditing() {
    (this.commitOrRemove(), this.currentLayer?.endDrawingSession(!1));
  }
  #at() {
    const t = document.getSelection();
    if (!t || t.isCollapsed) return;
    const s = this.#Z(t).closest(".textLayer"),
      i = this.getSelectionBoxes(s);
    i && ((this.#T ||= new qn(this)), this.#T.show(s, i, this.direction === "ltr"));
  }
  getAndRemoveDataFromAnnotationStorage(t) {
    if (!this.#l) return null;
    const e = `${ue}${t}`,
      s = this.#l.getRawValue(e);
    return (s && this.#l.remove(e), s);
  }
  addToAnnotationStorage(t) {
    !t.isEmpty() && this.#l && !this.#l.has(t.id) && this.#l.setValue(t.id, t);
  }
  a11yAlert(t, e = null) {
    const s = this.#et;
    s &&
      (s.setAttribute("data-l10n-id", t),
      e ? s.setAttribute("data-l10n-args", JSON.stringify(e)) : s.removeAttribute("data-l10n-args"));
  }
  #ot() {
    const t = document.getSelection();
    if (!t || t.isCollapsed) {
      this.#H && (this.#T?.hide(), (this.#H = null), this.#P({ hasSelectedText: !1 }));
      return;
    }
    const { anchorNode: e } = t;
    if (e === this.#H) return;
    const i = this.#Z(t).closest(".textLayer");
    if (!i) {
      this.#H && (this.#T?.hide(), (this.#H = null), this.#P({ hasSelectedText: !1 }));
      return;
    }
    if (
      (this.#T?.hide(),
      (this.#H = e),
      this.#P({ hasSelectedText: !0 }),
      !(this.#C !== B.HIGHLIGHT && this.#C !== B.NONE) &&
        (this.#C === B.HIGHLIGHT && this.showAllEditors("highlight", !0, !0),
        (this.#k = this.isShiftKeyDown),
        !this.isShiftKeyDown))
    ) {
      const n = this.#C === B.HIGHLIGHT ? this.#st(i) : null;
      if ((n?.toggleDrawing(), this.#O)) {
        const r = new AbortController(),
          a = this.combinedSignal(r),
          o = (l) => {
            (l.type === "pointerup" && l.button !== 0) ||
              (r.abort(), n?.toggleDrawing(!0), l.type === "pointerup" && this.#Q("main_toolbar"));
          };
        (window.addEventListener("pointerup", o, { signal: a }),
          window.addEventListener("blur", o, { signal: a }));
      } else (n?.toggleDrawing(!0), this.#Q("main_toolbar"));
    }
  }
  #Q(t = "") {
    this.#C === B.HIGHLIGHT ? this.highlightSelection(t) : this.#A && this.#at();
  }
  #lt() {
    document.addEventListener("selectionchange", this.#ot.bind(this), { signal: this._signal });
  }
  #ht() {
    if (this.#E) return;
    this.#E = new AbortController();
    const t = this.combinedSignal(this.#E);
    (window.addEventListener("focus", this.focus.bind(this), { signal: t }),
      window.addEventListener("blur", this.blur.bind(this), { signal: t }));
  }
  #ct() {
    (this.#E?.abort(), (this.#E = null));
  }
  blur() {
    if (
      ((this.isShiftKeyDown = !1), this.#k && ((this.#k = !1), this.#Q("main_toolbar")), !this.hasSelection)
    )
      return;
    const { activeElement: t } = document;
    for (const e of this.#S)
      if (e.div.contains(t)) {
        ((this.#N = [e, t]), (e._focusEventsAllowed = !1));
        break;
      }
  }
  focus() {
    if (!this.#N) return;
    const [t, e] = this.#N;
    ((this.#N = null),
      e.addEventListener(
        "focusin",
        () => {
          t._focusEventsAllowed = !0;
        },
        { once: !0, signal: this._signal },
      ),
      e.focus());
  }
  #it() {
    if (this.#D) return;
    this.#D = new AbortController();
    const t = this.combinedSignal(this.#D);
    (window.addEventListener("keydown", this.keydown.bind(this), { signal: t }),
      window.addEventListener("keyup", this.keyup.bind(this), { signal: t }));
  }
  #dt() {
    (this.#D?.abort(), (this.#D = null));
  }
  #ut() {
    if (this.#f) return;
    this.#f = new AbortController();
    const t = this.combinedSignal(this.#f);
    (document.addEventListener("copy", this.copy.bind(this), { signal: t }),
      document.addEventListener("cut", this.cut.bind(this), { signal: t }),
      document.addEventListener("paste", this.paste.bind(this), { signal: t }));
  }
  #ft() {
    (this.#f?.abort(), (this.#f = null));
  }
  #pt() {
    const t = this._signal;
    (document.addEventListener("dragover", this.dragOver.bind(this), { signal: t }),
      document.addEventListener("drop", this.drop.bind(this), { signal: t }));
  }
  addEditListeners() {
    (this.#it(), this.setEditingState(!0));
  }
  removeEditListeners() {
    (this.#dt(), this.setEditingState(!1));
  }
  dragOver(t) {
    for (const { type: e } of t.dataTransfer.items)
      for (const s of this.#b)
        if (s.isHandlingMimeForPasting(e)) {
          ((t.dataTransfer.dropEffect = "copy"), t.preventDefault());
          return;
        }
  }
  drop(t) {
    for (const e of t.dataTransfer.items)
      for (const s of this.#b)
        if (s.isHandlingMimeForPasting(e.type)) {
          (s.paste(e, this.currentLayer), t.preventDefault());
          return;
        }
  }
  copy(t) {
    if ((t.preventDefault(), this.#e?.commitOrRemove(), !this.hasSelection)) return;
    const e = [];
    for (const s of this.#S) {
      const i = s.serialize(!0);
      i && e.push(i);
    }
    e.length !== 0 && t.clipboardData.setData("application/pdfjs", JSON.stringify(e));
  }
  cut(t) {
    (this.copy(t), this.delete());
  }
  async paste(t) {
    t.preventDefault();
    const { clipboardData: e } = t;
    for (const n of e.items)
      for (const r of this.#b)
        if (r.isHandlingMimeForPasting(n.type)) {
          r.paste(n, this.currentLayer);
          return;
        }
    let s = e.getData("application/pdfjs");
    if (!s) return;
    try {
      s = JSON.parse(s);
    } catch (n) {
      H(`paste: "${n.message}".`);
      return;
    }
    if (!Array.isArray(s)) return;
    this.unselectAll();
    const i = this.currentLayer;
    try {
      const n = [];
      for (const o of s) {
        const l = await i.deserialize(o);
        if (!l) return;
        n.push(l);
      }
      const r = () => {
          for (const o of n) this.#nt(o);
          this.#rt(n);
        },
        a = () => {
          for (const o of n) o.remove();
        };
      this.addCommands({ cmd: r, undo: a, mustExec: !0 });
    } catch (n) {
      H(`paste: "${n.message}".`);
    }
  }
  keydown(t) {
    (!this.isShiftKeyDown && t.key === "Shift" && (this.isShiftKeyDown = !0),
      this.#C !== B.NONE && !this.isEditorHandlingKeyboard && jt._keyboardManager.exec(this, t));
  }
  keyup(t) {
    this.isShiftKeyDown &&
      t.key === "Shift" &&
      ((this.isShiftKeyDown = !1), this.#k && ((this.#k = !1), this.#Q("main_toolbar")));
  }
  onEditingAction({ name: t }) {
    switch (t) {
      case "undo":
      case "redo":
      case "delete":
      case "selectAll":
        this[t]();
        break;
      case "highlightSelection":
        this.highlightSelection("context_menu");
        break;
      case "commentSelection":
        this.commentSelection("context_menu");
        break;
    }
  }
  updatePageIndex(t, e) {
    for (const i of this.#r.get(t) || []) i.pageIndex = e;
    const s = this.#a.get(t);
    s && ((s.pageIndex = e), this.#n.set(e, s), this.#I ? s.enable() : s.disable());
  }
  startUpdatePages() {
    ((this.#a = new Map(this.#n)), this.#n.clear());
    const t = (this.#r = new Map()),
      e = (s) => {
        t.getOrInsertComputed(s.pageIndex, pe).push(s);
      };
    for (const s of this.#i.values()) e(s);
    for (const [s, i] of this.#l)
      s.startsWith(ue) && !this.#i.has(s) && Number.isInteger(i?.pageIndex) && e(i);
  }
  endUpdatePages() {
    ((this.#a = null), (this.#r = null));
  }
  clonePage(t, e) {
    for (const s of this.getEditors(t)) {
      const i = s.serialize(s.mode !== B.HIGHLIGHT);
      i &&
        ((i.pageIndex = e),
        (i.id = this.getId()),
        (i.isClone = !0),
        delete i.popupRef,
        this.#l.setValue(i.id, i));
    }
  }
  findClonesForPage(t) {
    const e = [],
      { pageIndex: s } = t;
    for (const [i, n] of this.#l)
      n.pageIndex === s &&
        n.isClone &&
        (this.#l.remove(i),
        e.push(
          t.deserialize(n).then((r) => {
            r && ((r.isClone = !0), t.addOrRebuild(r));
          }),
        ));
    return Promise.all(e);
  }
  #P(t) {
    Object.entries(t).some(([s, i]) => this.#K[s] !== i) &&
      (this._eventBus.dispatch("editingstateschanged", { source: this, details: Object.assign(this.#K, t) }),
      this.#C === B.HIGHLIGHT && t.hasSelectedEditor === !1 && this.#z([[G.HIGHLIGHT_FREE, !0]]));
  }
  #z(t) {
    this._eventBus.dispatch("annotationeditorparamschanged", { source: this, details: t });
  }
  setEditingState(t) {
    t
      ? (this.#ht(),
        this.#ut(),
        this.#P({
          isEditing: this.#C !== B.NONE,
          isEmpty: this.#J(),
          hasSomethingToUndo: this.#u.hasSomethingToUndo(),
          hasSomethingToRedo: this.#u.hasSomethingToRedo(),
          hasSelectedEditor: !1,
        }))
      : (this.#ct(), this.#ft(), this.#P({ isEditing: !1 }), this.disableUserSelect(!1));
  }
  registerEditorTypes(t) {
    if (!this.#b) {
      this.#b = t;
      for (const e of this.#b) this.#z(e.defaultPropertiesToUpdate);
    }
  }
  getId() {
    return this.#F.id;
  }
  get currentLayer() {
    return this.#n.get(this.#m);
  }
  getLayer(t) {
    return this.#n.get(t);
  }
  get currentPageIndex() {
    return this.#m;
  }
  addLayer(t) {
    (this.#n.set(t.pageIndex, t), this.#I ? t.enable() : t.disable());
  }
  removeLayer(t) {
    this.#n.delete(t.pageIndex);
  }
  async updateMode(t, e = null, s = !1, i = !1, n = !1, r = !1) {
    if (this.#C !== t && !(this.#U && (await this.#U.promise, !this.#U))) {
      if (
        ((this.#U = Promise.withResolvers()),
        this.#g?.commitOrRemove(),
        this.#C === B.POPUP && this.#d?.hideSidebar(),
        this.#d?.destroyPopup(),
        (this.#C = t),
        t === B.NONE)
      ) {
        (this.setEditingState(!1), this.#mt());
        for (const a of this.#i.values()) a.hideStandaloneCommentButton();
        (this._editorUndoBar?.hide(), this.toggleComment(null), this.#U.resolve());
        return;
      }
      for (const a of this.#i.values()) a.addStandaloneCommentButton();
      (t === B.SIGNATURE && (await this.#$?.loadSignatures()),
        s && z.clearPointerType(),
        this.setEditingState(!0),
        await this.#gt(),
        this.unselectAll());
      for (const a of this.#n.values()) a.updateMode(t);
      if (t === B.POPUP) {
        this.#s ||= await this.#Y.getAnnotationsByType(new Set(this.#b.map((l) => l._editorType)));
        const a = new Set(),
          o = [];
        for (const l of this.#i.values()) {
          const { annotationElementId: h, hasComment: d, deleted: u } = l;
          (h && a.add(h), d && !u && o.push(l.getData()));
        }
        for (const l of this.#s) {
          const { id: h, popupRef: d, contentsObj: u } = l;
          d && u?.str && !a.has(h) && !this.#c.has(h) && o.push(l);
        }
        this.#d?.showSidebar(o);
      }
      if (!e) {
        (i && this.addNewEditorFromKeyboard(), this.#U.resolve());
        return;
      }
      for (const a of this.#i.values())
        a.uid === e
          ? (this.setSelected(a), r ? a.editComment() : n ? a.enterInEditMode() : a.focus())
          : a.unselect();
      this.#U.resolve();
    }
  }
  addNewEditorFromKeyboard() {
    this.currentLayer.canCreateNewEmptyEditor() && this.currentLayer.addNewEditor();
  }
  updateToolbar(t) {
    t.mode !== this.#C && this._eventBus.dispatch("switchannotationeditormode", { source: this, ...t });
  }
  updateParams(t, e) {
    if (this.#b) {
      switch (t) {
        case G.CREATE:
          this.currentLayer.addNewEditor(e);
          return;
        case G.HIGHLIGHT_SHOW_ALL:
          (this._eventBus.dispatch("reporttelemetry", {
            source: this,
            details: { type: "editing", data: { type: "highlight", action: "toggle_visibility" } },
          }),
            (this.#q ||= new Map()).set(t, e),
            this.showAllEditors("highlight", e));
          break;
      }
      if (this.hasSelection) for (const s of this.#S) s.updateParams(t, e);
      else for (const s of this.#b) s.updateDefaultParams(t, e);
    }
  }
  showAllEditors(t, e, s = !1) {
    for (const n of this.#i.values()) n.editorType === t && n.show(e);
    (this.#q?.get(G.HIGHLIGHT_SHOW_ALL) ?? !0) !== e && this.#z([[G.HIGHLIGHT_SHOW_ALL, e]]);
  }
  enableWaiting(t = !1) {
    if (this.#R !== t) {
      this.#R = t;
      for (const e of this.#n.values())
        (t ? e.disableClick() : e.enableClick(), e.div.classList.toggle("waiting", t));
    }
  }
  async #gt() {
    if (!this.#I) {
      this.#I = !0;
      const t = [];
      for (const e of this.#n.values()) t.push(e.enable());
      await Promise.all(t);
      for (const e of this.#i.values()) e.enable();
    }
  }
  #mt() {
    if ((this.unselectAll(), this.#I)) {
      this.#I = !1;
      for (const t of this.#n.values()) t.disable();
      for (const t of this.#i.values()) t.disable();
    }
  }
  *getEditors(t) {
    for (const e of this.#i.values()) e.pageIndex === t && (yield e);
  }
  getEditor(t) {
    return this.#i.get(t);
  }
  addEditor(t) {
    this.#i.set(t.id, t);
  }
  removeEditor(t) {
    (t.div.contains(document.activeElement) &&
      (this.#_ && clearTimeout(this.#_),
      (this.#_ = setTimeout(() => {
        (this.focusMainContainer(), (this.#_ = null));
      }, 0))),
      this.#i.delete(t.id),
      t.annotationElementId && this.#B?.delete(t.annotationElementId),
      this.unselect(t),
      (!t.annotationElementId || !this.#c.has(t.annotationElementId)) && this.#l?.remove(t.id));
  }
  addDeletedAnnotationElement(t) {
    (this.#c.add(t.annotationElementId), this.addChangedExistingAnnotation(t), (t.deleted = !0));
  }
  isDeletedAnnotationElement(t) {
    return this.#c.has(t);
  }
  removeDeletedAnnotationElement(t) {
    (this.#c.delete(t.annotationElementId), this.removeChangedExistingAnnotation(t), (t.deleted = !1));
  }
  #nt(t) {
    const e = this.#n.get(t.pageIndex);
    e ? e.addOrRebuild(t) : (this.addEditor(t), this.addToAnnotationStorage(t));
  }
  setActiveEditor(t) {
    this.#e !== t && ((this.#e = t), t && this.#z(t.propertiesToUpdate));
  }
  get #bt() {
    let t = null;
    for (t of this.#S);
    return t;
  }
  updateUI(t) {
    this.#bt === t && this.#z(t.propertiesToUpdate);
  }
  updateUIForDefaultProperties(t) {
    this.#z(t.defaultPropertiesToUpdate);
  }
  toggleSelected(t) {
    if (this.#S.has(t)) {
      (this.#S.delete(t), t.unselect(), this.#P({ hasSelectedEditor: this.hasSelection }));
      return;
    }
    (this.#S.add(t), t.select(), this.#z(t.propertiesToUpdate), this.#P({ hasSelectedEditor: !0 }));
  }
  setSelected(t) {
    (this.updateToolbar({ mode: t.mode, editId: t.uid }), this.#g?.commitOrRemove());
    for (const e of this.#S) e !== t && e.unselect();
    (this.#d?.destroyPopup(),
      this.#S.clear(),
      this.#S.add(t),
      t.select(),
      this.#z(t.propertiesToUpdate),
      this.#P({ hasSelectedEditor: !0 }));
  }
  get firstSelectedEditor() {
    return this.#S.values().next().value;
  }
  unselect(t) {
    (t.unselect(), this.#S.delete(t), this.#P({ hasSelectedEditor: this.hasSelection }));
  }
  get hasSelection() {
    return this.#S.size !== 0;
  }
  get isEnterHandled() {
    return this.#S.size === 1 && this.firstSelectedEditor.isEnterHandled;
  }
  undo() {
    (this.#u.undo(),
      this.#P({
        hasSomethingToUndo: this.#u.hasSomethingToUndo(),
        hasSomethingToRedo: !0,
        isEmpty: this.#J(),
      }),
      this._editorUndoBar?.hide());
  }
  redo() {
    (this.#u.redo(),
      this.#P({
        hasSomethingToUndo: !0,
        hasSomethingToRedo: this.#u.hasSomethingToRedo(),
        isEmpty: this.#J(),
      }));
  }
  addCommands(t) {
    (this.#u.add(t), this.#P({ hasSomethingToUndo: !0, hasSomethingToRedo: !1, isEmpty: this.#J() }));
  }
  cleanUndoStack(t) {
    this.#u.cleanType(t);
  }
  #J() {
    if (this.#i.size === 0) return !0;
    if (this.#i.size === 1) for (const t of this.#i.values()) return t.isEmpty();
    return !1;
  }
  delete() {
    this.commitOrRemove();
    const t = this.currentLayer?.endDrawingSession(!0);
    if (!this.hasSelection && !t) return;
    const e = t ? [t] : [...this.#S],
      s = () => {
        this._editorUndoBar?.show(i, e.length === 1 ? e[0].editorType : e.length);
        for (const n of e) n.remove();
      },
      i = () => {
        for (const n of e) this.#nt(n);
      };
    this.addCommands({ cmd: s, undo: i, mustExec: !0 });
  }
  commitOrRemove() {
    this.#e?.commitOrRemove();
  }
  hasSomethingToControl() {
    return this.#e || this.hasSelection;
  }
  #rt(t) {
    for (const e of this.#S) e.unselect();
    this.#S.clear();
    for (const e of t) e.isEmpty() || (this.#S.add(e), e.select());
    this.#P({ hasSelectedEditor: this.hasSelection });
  }
  selectAll() {
    for (const t of this.#S) t.commit();
    this.#rt(this.#i.values());
  }
  unselectAll() {
    if (
      !(this.#e && (this.#e.commitOrRemove(), this.#C !== B.NONE)) &&
      !this.#g?.commitOrRemove() &&
      (this.#d?.destroyPopup(), !!this.hasSelection)
    ) {
      for (const t of this.#S) t.unselect();
      (this.#S.clear(), this.#P({ hasSelectedEditor: !1 }));
    }
  }
  translateSelectedEditors(t, e, s = !1) {
    if ((s || this.commitOrRemove(), !this.hasSelection)) return;
    ((this.#L[0] += t), (this.#L[1] += e));
    const [i, n] = this.#L,
      r = [...this.#S],
      a = 1e3;
    (this.#W && clearTimeout(this.#W),
      (this.#W = setTimeout(() => {
        ((this.#W = null),
          (this.#L[0] = this.#L[1] = 0),
          this.addCommands({
            cmd: () => {
              for (const o of r) this.#i.has(o.id) && (o.translateInPage(i, n), o.translationDone());
            },
            undo: () => {
              for (const o of r) this.#i.has(o.id) && (o.translateInPage(-i, -n), o.translationDone());
            },
            mustExec: !1,
          }));
      }, a)));
    for (const o of r) (o.translateInPage(t, e), o.translationDone());
  }
  setUpDragSession() {
    if (this.hasSelection) {
      (this.disableUserSelect(!0), (this.#p = new Map()));
      for (const t of this.#S)
        this.#p.set(t, {
          savedX: t.x,
          savedY: t.y,
          savedPageIndex: t.pageIndex,
          newX: 0,
          newY: 0,
          newPageIndex: -1,
        });
    }
  }
  endDragSession() {
    if (!this.#p) return !1;
    this.disableUserSelect(!1);
    const t = this.#p;
    this.#p = null;
    let e = !1;
    for (const [{ x: i, y: n, pageIndex: r }, a] of t)
      ((a.newX = i),
        (a.newY = n),
        (a.newPageIndex = r),
        (e ||= i !== a.savedX || n !== a.savedY || r !== a.savedPageIndex));
    if (!e) return !1;
    const s = (i, n, r, a) => {
      if (this.#i.has(i.id)) {
        const o = this.#n.get(a);
        o ? i._setParentAndPosition(o, n, r) : ((i.pageIndex = a), (i.x = n), (i.y = r));
      }
    };
    return (
      this.addCommands({
        cmd: () => {
          for (const [i, { newX: n, newY: r, newPageIndex: a }] of t) s(i, n, r, a);
        },
        undo: () => {
          for (const [i, { savedX: n, savedY: r, savedPageIndex: a }] of t) s(i, n, r, a);
        },
        mustExec: !0,
      }),
      !0
    );
  }
  dragSelectedEditors(t, e) {
    if (this.#p) for (const s of this.#p.keys()) s.drag(t, e);
  }
  rebuild(t) {
    if (t.parent === null) {
      const e = this.getLayer(t.pageIndex);
      e
        ? (e.changeParent(t), e.addOrRebuild(t))
        : (this.addEditor(t), this.addToAnnotationStorage(t), t.rebuild());
    } else t.parent.addOrRebuild(t);
  }
  get isEditorHandlingKeyboard() {
    return (
      this.getActive()?.shouldGetKeyboardEvents() ||
      (this.#S.size === 1 && this.firstSelectedEditor.shouldGetKeyboardEvents())
    );
  }
  isActive(t) {
    return this.#e === t;
  }
  getActive() {
    return this.#e;
  }
  getMode() {
    return this.#C;
  }
  isEditingMode() {
    return this.#C !== B.NONE;
  }
  get imageManager() {
    return k(this, "imageManager", new Vs());
  }
  getSelectionBoxes(t) {
    if (!t) return null;
    const e = document.getSelection();
    for (let l = 0, h = e.rangeCount; l < h; l++)
      if (!t.contains(e.getRangeAt(l).commonAncestorContainer)) return null;
    const { x: s, y: i, width: n, height: r } = t.getBoundingClientRect();
    let a;
    switch (t.getAttribute("data-main-rotation")) {
      case "90":
        a = (l, h, d, u) => ({ x: (h - i) / r, y: 1 - (l + d - s) / n, width: u / r, height: d / n });
        break;
      case "180":
        a = (l, h, d, u) => ({ x: 1 - (l + d - s) / n, y: 1 - (h + u - i) / r, width: d / n, height: u / r });
        break;
      case "270":
        a = (l, h, d, u) => ({ x: 1 - (h + u - i) / r, y: (l - s) / n, width: u / r, height: d / n });
        break;
      default:
        a = (l, h, d, u) => ({ x: (l - s) / n, y: (h - i) / r, width: d / n, height: u / r });
        break;
    }
    const o = [];
    for (let l = 0, h = e.rangeCount; l < h; l++) {
      const d = e.getRangeAt(l);
      if (!d.collapsed)
        for (const { x: u, y: f, width: p, height: g } of d.getClientRects())
          p === 0 || g === 0 || o.push(a(u, f, p, g));
    }
    return o.length === 0 ? null : o;
  }
  addChangedExistingAnnotation({ annotationElementId: t, id: e }) {
    (this.#h ||= new Map()).set(t, e);
  }
  removeChangedExistingAnnotation({ annotationElementId: t }) {
    this.#h?.delete(t);
  }
  renderAnnotationElement(t) {
    const e = this.#h?.get(t.data.id);
    if (!e) return;
    const s = this.#l.getRawValue(e);
    s && ((this.#C === B.NONE && !s.hasBeenModified) || s.renderAnnotationElement(t));
  }
  setMissingCanvas(t, e, s) {
    const i = this.#B?.get(t);
    i && (i.setCanvas(e, s), this.#B.delete(t));
  }
  addMissingCanvas(t, e) {
    (this.#B ||= new Map()).set(t, e);
  }
}