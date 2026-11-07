
class D {
  #t = null;
  #e = null;
  #s = null;
  #i = null;
  #n = null;
  #a = !1;
  #r = null;
  #o = "";
  #l = null;
  #h = null;
  #u = null;
  #d = null;
  #f = null;
  #g = "";
  #m = !1;
  #c = null;
  #p = !1;
  #b = !1;
  #y = !1;
  #A = null;
  #v = 0;
  #w = 0;
  #x = null;
  #_ = null;
  isSelected = !1;
  _isCopy = !1;
  _editToolbar = null;
  _initialOptions = Object.create(null);
  _initialData = null;
  _isVisible = !0;
  _uiManager = null;
  _focusEventsAllowed = !0;
  static _l10n = null;
  static _l10nAlert = null;
  static _l10nResizer = null;
  #E = !1;
  #M = D._zIndex++;
  static _borderLineWidth = -1;
  static _colorManager = new Ws();
  static _zIndex = 1;
  static _telemetryTimeout = 1e3;
  static get _resizerKeyboardManager() {
    const t = D.prototype._resizeWithKeyboard,
      e = jt.TRANSLATE_SMALL,
      s = jt.TRANSLATE_BIG;
    return k(
      this,
      "_resizerKeyboardManager",
      new bt([
        [["ArrowLeft"], t, { args: [-e, 0] }],
        [["ctrl+ArrowLeft", "mac+shift+ArrowLeft"], t, { args: [-s, 0] }],
        [["ArrowRight"], t, { args: [e, 0] }],
        [["ctrl+ArrowRight", "mac+shift+ArrowRight"], t, { args: [s, 0] }],
        [["ArrowUp"], t, { args: [0, -e] }],
        [["ctrl+ArrowUp", "mac+shift+ArrowUp"], t, { args: [0, -s] }],
        [["ArrowDown"], t, { args: [0, e] }],
        [["ctrl+ArrowDown", "mac+shift+ArrowDown"], t, { args: [0, s] }],
        [["Escape"], D.prototype._stopResizingWithKeyboard],
      ]),
    );
  }
  constructor(t) {
    ((this.parent = t.parent),
      (this.id = t.id),
      (this.width = this.height = null),
      (this.pageIndex = t.parent.pageIndex),
      (this.name = t.name),
      (this.div = null),
      (this._uiManager = t.uiManager),
      (this.annotationElementId = null),
      (this._willKeepAspectRatio = !1),
      (this._initialOptions.isCentered = t.isCentered),
      (this._structTreeParentId = null),
      (this.annotationElementId = t.annotationElementId || null),
      (this.creationDate = t.creationDate || new Date()),
      (this.modificationDate = t.modificationDate || null),
      (this.canAddComment = !0));
    const {
      rotation: e,
      rawDims: { pageWidth: s, pageHeight: i, pageX: n, pageY: r },
    } = this.parent.viewport;
    ((this.rotation = e),
      (this.pageRotation = (360 + e - this._uiManager.viewParameters.rotation) % 360),
      (this.pageDimensions = [s, i]),
      (this.pageTranslation = [n, r]));
    const [a, o] = this.parentDimensions;
    ((this.x = t.x / a), (this.y = t.y / o), (this.isAttachedToDOM = !1), (this.deleted = !1));
  }
  updatePageIndex(t) {
    this.pageIndex = t;
  }
  get editorType() {
    return Object.getPrototypeOf(this).constructor._type;
  }
  get mode() {
    return Object.getPrototypeOf(this).constructor._editorType;
  }
  static get isDrawer() {
    return !1;
  }
  static get _defaultLineColor() {
    return k(this, "_defaultLineColor", this._colorManager.getHexCode("CanvasText"));
  }
  static deleteAnnotationElement(t) {
    const e = new tr({ id: t._uiManager.getId(), parent: t.parent, uiManager: t._uiManager });
    ((e.annotationElementId = t.annotationElementId),
      (e.deleted = !0),
      e._uiManager.addToAnnotationStorage(e));
  }
  static initialize(t, e) {
    if (
      ((D._l10n ??= t),
      (D._l10nAlert ??= Object.freeze({
        highlight: "pdfjs-editor-highlight-added-alert",
        freetext: "pdfjs-editor-freetext-added-alert",
        ink: "pdfjs-editor-ink-added-alert",
        stamp: "pdfjs-editor-stamp-added-alert",
        signature: "pdfjs-editor-signature-added-alert",
      })),
      (D._l10nResizer ??= Object.freeze({
        topLeft: "pdfjs-editor-resizer-top-left",
        topMiddle: "pdfjs-editor-resizer-top-middle",
        topRight: "pdfjs-editor-resizer-top-right",
        middleRight: "pdfjs-editor-resizer-middle-right",
        bottomRight: "pdfjs-editor-resizer-bottom-right",
        bottomMiddle: "pdfjs-editor-resizer-bottom-middle",
        bottomLeft: "pdfjs-editor-resizer-bottom-left",
        middleLeft: "pdfjs-editor-resizer-middle-left",
      })),
      D._borderLineWidth !== -1)
    )
      return;
    const s = getComputedStyle(document.documentElement);
    D._borderLineWidth = parseFloat(s.getPropertyValue("--outline-width")) || 0;
  }
  static updateDefaultParams(t, e) {}
  static get defaultPropertiesToUpdate() {
    return [];
  }
  static isHandlingMimeForPasting(t) {
    return !1;
  }
  static paste(t, e) {
    $("Not implemented");
  }
  get propertiesToUpdate() {
    return [];
  }
  get _isDraggable() {
    return this.#E;
  }
  set _isDraggable(t) {
    ((this.#E = t), this.div?.classList.toggle("draggable", t));
  }
  get uid() {
    return this.annotationElementId || this.id;
  }
  get isEnterHandled() {
    return !0;
  }
  center() {
    const [t, e] = this.pageDimensions;
    switch (this.parentRotation) {
      case 90:
        ((this.x -= (this.height * e) / (t * 2)), (this.y += (this.width * t) / (e * 2)));
        break;
      case 180:
        ((this.x += this.width / 2), (this.y += this.height / 2));
        break;
      case 270:
        ((this.x += (this.height * e) / (t * 2)), (this.y -= (this.width * t) / (e * 2)));
        break;
      default:
        ((this.x -= this.width / 2), (this.y -= this.height / 2));
        break;
    }
    this.fixAndSetPosition();
  }
  addCommands(t) {
    this._uiManager.addCommands(t);
  }
  get currentLayer() {
    return this._uiManager.currentLayer;
  }
  setInBackground() {
    this.div.style.zIndex = 0;
  }
  setInForeground() {
    this.div.style.zIndex = this.#M;
  }
  setParent(t) {
    (t !== null
      ? ((this.pageIndex = t.pageIndex), (this.pageDimensions = t.pageDimensions))
      : (this.#L(), this.#d?.remove(), (this.#d = null)),
      (this.parent = t));
  }
  focusin(t) {
    this._focusEventsAllowed && (this.#m ? (this.#m = !1) : this.parent.setSelected(this));
  }
  focusout(t) {
    !this._focusEventsAllowed ||
      !this.isAttachedToDOM ||
      t.relatedTarget?.closest(`#${this.id}`) ||
      (t.preventDefault(), this.parent?.isMultipleSelection || this.commitOrRemove());
  }
  commitOrRemove() {
    this.isEmpty() ? this.remove() : this.commit();
  }
  commit() {
    this.isInEditMode() && this.addToAnnotationStorage();
  }
  addToAnnotationStorage() {
    this._uiManager.addToAnnotationStorage(this);
  }
  setAt(t, e, s, i) {
    const [n, r] = this.parentDimensions;
    (([s, i] = this.screenToPageTranslation(s, i)),
      (this.x = (t + s) / n),
      (this.y = (e + i) / r),
      this.fixAndSetPosition());
  }
  _moveAfterPaste(t, e) {
    if (this.isClone) {
      delete this.isClone;
      return;
    }
    const [s, i] = this.parentDimensions;
    (this.setAt(t * s, e * i, this.width * s, this.height * i), this._onTranslated());
  }
  #k([t, e], s, i) {
    (([s, i] = this.screenToPageTranslation(s, i)),
      (this.x += s / t),
      (this.y += i / e),
      this._onTranslating(this.x, this.y),
      this.fixAndSetPosition());
  }
  translate(t, e) {
    this.#k(this.parentDimensions, t, e);
  }
  translateInPage(t, e) {
    ((this.#c ||= [this.x, this.y, this.width, this.height]),
      this.#k(this.pageDimensions, t, e),
      this.div.scrollIntoView({ block: "nearest" }));
  }
  translationDone() {
    this._onTranslated(this.x, this.y);
  }
  drag(t, e) {
    this.#c ||= [this.x, this.y, this.width, this.height];
    const {
      div: s,
      parentDimensions: [i, n],
    } = this;
    if (
      ((this.x += t / i),
      (this.y += e / n),
      this.parent && (this.x < 0 || this.x > 1 || this.y < 0 || this.y > 1))
    ) {
      const { x: d, y: u } = this.div.getBoundingClientRect();
      this.parent.findNewParent(this, d, u) &&
        ((this.x -= Math.floor(this.x)), (this.y -= Math.floor(this.y)));
    }
    let { x: r, y: a } = this;
    const [o, l] = this.getBaseTranslation();
    ((r += o), (a += l));
    const { style: h } = s;
    ((h.left = `${(100 * r).toFixed(2)}%`), (h.top = `${(100 * a).toFixed(2)}%`), this._onTranslating(r, a));
  }
  _onTranslating(t, e) {}
  _onTranslated(t, e) {}
  get _hasBeenMoved() {
    return !!this.#c && (this.#c[0] !== this.x || this.#c[1] !== this.y);
  }
  get _hasBeenResized() {
    return !!this.#c && (this.#c[2] !== this.width || this.#c[3] !== this.height);
  }
  getBaseTranslation() {
    const [t, e] = this.parentDimensions,
      { _borderLineWidth: s } = D,
      i = s / t,
      n = s / e;
    switch (this.rotation) {
      case 90:
        return [-i, n];
      case 180:
        return [i, n];
      case 270:
        return [i, -n];
      default:
        return [-i, -n];
    }
  }
  get _mustFixPosition() {
    return !0;
  }
  fixAndSetPosition(t = this.rotation) {
    const {
      div: { style: e },
      pageDimensions: [s, i],
    } = this;
    let { x: n, y: r, width: a, height: o } = this;
    if (((a *= s), (o *= i), (n *= s), (r *= i), this._mustFixPosition))
      switch (t) {
        case 0:
          ((n = Y(n, 0, s - a)), (r = Y(r, 0, i - o)));
          break;
        case 90:
          ((n = Y(n, 0, s - o)), (r = Y(r, a, i)));
          break;
        case 180:
          ((n = Y(n, a, s)), (r = Y(r, o, i)));
          break;
        case 270:
          ((n = Y(n, o, s)), (r = Y(r, 0, i - a)));
          break;
      }
    ((this.x = n /= s), (this.y = r /= i));
    const [l, h] = this.getBaseTranslation();
    ((n += l),
      (r += h),
      (e.left = `${(100 * n).toFixed(2)}%`),
      (e.top = `${(100 * r).toFixed(2)}%`),
      this.moveInDOM());
  }
  static #T(t, e, s) {
    switch (s) {
      case 90:
        return [e, -t];
      case 180:
        return [-t, -e];
      case 270:
        return [-e, t];
      default:
        return [t, e];
    }
  }
  screenToPageTranslation(t, e) {
    return D.#T(t, e, this.parentRotation);
  }
  pageTranslationToScreen(t, e) {
    return D.#T(t, e, 360 - this.parentRotation);
  }
  #F(t) {
    switch (t) {
      case 90: {
        const [e, s] = this.pageDimensions;
        return [0, -e / s, s / e, 0];
      }
      case 180:
        return [-1, 0, 0, -1];
      case 270: {
        const [e, s] = this.pageDimensions;
        return [0, e / s, -s / e, 0];
      }
      default:
        return [1, 0, 0, 1];
    }
  }
  get parentScale() {
    return this._uiManager.viewParameters.realScale;
  }
  get parentRotation() {
    return (this._uiManager.viewParameters.rotation + this.pageRotation) % 360;
  }
  get parentDimensions() {
    const {
      parentScale: t,
      pageDimensions: [e, s],
    } = this;
    return [e * t, s * t];
  }
  setDims() {
    const {
      div: { style: t },
      width: e,
      height: s,
    } = this;
    ((t.width = `${(100 * e).toFixed(2)}%`), (t.height = `${(100 * s).toFixed(2)}%`));
  }
  getInitialTranslation() {
    return [0, 0];
  }
  #I() {
    if (this.#l) return;
    ((this.#l = document.createElement("div")), this.#l.classList.add("resizers"));
    const t = this._willKeepAspectRatio
        ? ["topLeft", "topRight", "bottomRight", "bottomLeft"]
        : [
            "topLeft",
            "topMiddle",
            "topRight",
            "middleRight",
            "bottomRight",
            "bottomMiddle",
            "bottomLeft",
            "middleLeft",
          ],
      e = this._uiManager._signal;
    for (const s of t) {
      const i = document.createElement("div");
      (this.#l.append(i),
        i.classList.add("resizer", s),
        i.setAttribute("data-resizer-name", s),
        i.addEventListener("pointerdown", this.#O.bind(this, s), { signal: e }),
        i.addEventListener("contextmenu", kt, { signal: e }),
        (i.tabIndex = -1));
    }
    this.div.prepend(this.#l);
  }
  #O(t, e) {
    e.preventDefault();
    const { isMac: s } = j.platform;
    if (e.button !== 0 || (e.ctrlKey && s)) return;
    this.#s?.toggle(!1);
    const i = this._isDraggable;
    ((this._isDraggable = !1), (this.#h = [e.screenX, e.screenY]));
    const n = new AbortController(),
      r = this._uiManager.combinedSignal(n);
    (this.parent.togglePointerEvents(!1),
      window.addEventListener("pointermove", this.#N.bind(this, t), { passive: !0, capture: !0, signal: r }),
      window.addEventListener("touchmove", rt, { passive: !1, signal: r }),
      window.addEventListener("contextmenu", kt, { signal: r }),
      (this.#u = { savedX: this.x, savedY: this.y, savedWidth: this.width, savedHeight: this.height }));
    const a = this.parent.div.style.cursor,
      o = this.div.style.cursor;
    this.div.style.cursor = this.parent.div.style.cursor = window.getComputedStyle(e.target).cursor;
    const l = () => {
      (n.abort(),
        this.parent.togglePointerEvents(!0),
        this.#s?.toggle(!0),
        (this._isDraggable = i),
        (this.parent.div.style.cursor = a),
        (this.div.style.cursor = o),
        this.#D());
    };
    (window.addEventListener("pointerup", l, { signal: r }),
      window.addEventListener("blur", l, { signal: r }));
  }
  #R(t, e, s, i) {
    ((this.width = s),
      (this.height = i),
      (this.x = t),
      (this.y = e),
      this.setDims(),
      this.fixAndSetPosition(),
      this._onResized());
  }
  _onResized() {}
  #D() {
    if (!this.#u) return;
    const { savedX: t, savedY: e, savedWidth: s, savedHeight: i } = this.#u;
    this.#u = null;
    const n = this.x,
      r = this.y,
      a = this.width,
      o = this.height;
    (n === t && r === e && a === s && o === i) ||
      this.addCommands({
        cmd: this.#R.bind(this, n, r, a, o),
        undo: this.#R.bind(this, t, e, s, i),
        mustExec: !0,
      });
  }
  static _round(t) {
    return Math.round(t * 1e4) / 1e4;
  }
  #N(t, e) {
    const [s, i] = this.parentDimensions,
      n = this.x,
      r = this.y,
      a = this.width,
      o = this.height,
      l = D.MIN_SIZE / s,
      h = D.MIN_SIZE / i,
      d = this.#F(this.rotation),
      u = (I, F) => [d[0] * I + d[2] * F, d[1] * I + d[3] * F],
      f = this.#F(360 - this.rotation),
      p = (I, F) => [f[0] * I + f[2] * F, f[1] * I + f[3] * F];
    let g,
      m,
      b = !1,
      y = !1;
    switch (t) {
      case "topLeft":
        ((b = !0), (g = (I, F) => [0, 0]), (m = (I, F) => [I, F]));
        break;
      case "topMiddle":
        ((g = (I, F) => [I / 2, 0]), (m = (I, F) => [I / 2, F]));
        break;
      case "topRight":
        ((b = !0), (g = (I, F) => [I, 0]), (m = (I, F) => [0, F]));
        break;
      case "middleRight":
        ((y = !0), (g = (I, F) => [I, F / 2]), (m = (I, F) => [0, F / 2]));
        break;
      case "bottomRight":
        ((b = !0), (g = (I, F) => [I, F]), (m = (I, F) => [0, 0]));
        break;
      case "bottomMiddle":
        ((g = (I, F) => [I / 2, F]), (m = (I, F) => [I / 2, 0]));
        break;
      case "bottomLeft":
        ((b = !0), (g = (I, F) => [0, F]), (m = (I, F) => [I, 0]));
        break;
      case "middleLeft":
        ((y = !0), (g = (I, F) => [0, F / 2]), (m = (I, F) => [I, F / 2]));
        break;
    }
    const A = g(a, o),
      w = m(a, o);
    let v = u(...w);
    const S = D._round(n + v[0]),
      x = D._round(r + v[1]);
    let _ = 1,
      E = 1,
      P,
      C;
    if (e.fromKeyboard) ({ deltaX: P, deltaY: C } = e);
    else {
      const { screenX: I, screenY: F } = e,
        [et, it] = this.#h;
      (([P, C] = this.screenToPageTranslation(I - et, F - it)), (this.#h[0] = I), (this.#h[1] = F));
    }
    if ((([P, C] = p(P / s, C / i)), b)) {
      const I = Math.hypot(a, o);
      _ = E = Math.max(
        Math.min(Math.hypot(w[0] - A[0] - P, w[1] - A[1] - C) / I, 1 / a, 1 / o),
        l / a,
        h / o,
      );
    } else y ? (_ = Y(Math.abs(w[0] - A[0] - P), l, 1) / a) : (E = Y(Math.abs(w[1] - A[1] - C), h, 1) / o);
    const R = D._round(a * _),
      L = D._round(o * E);
    v = u(...m(R, L));
    const O = S - v[0],
      W = x - v[1];
    ((this.#c ||= [this.x, this.y, this.width, this.height]),
      (this.width = R),
      (this.height = L),
      (this.x = O),
      (this.y = W),
      this.setDims(),
      this.fixAndSetPosition(),
      this._onResizing());
  }
  _onResizing() {}
  altTextFinish() {
    this.#s?.finish();
  }
  get toolbarButtons() {
    return null;
  }
  async addEditToolbar() {
    if (this._editToolbar || this.#b) return this._editToolbar;
    ((this._editToolbar = new Se(this)), this.div.append(this._editToolbar.render()));
    const { toolbarButtons: t } = this;
    if (t) for (const [e, s] of t) await this._editToolbar.addButton(e, s);
    return (
      this.hasComment || this._editToolbar.addButton("comment", this.addCommentButton()),
      this._editToolbar.addButton("delete"),
      this._editToolbar
    );
  }
  addCommentButtonInToolbar() {
    this._editToolbar?.addButtonBefore("comment", this.addCommentButton(), ".deleteButton");
  }
  removeCommentButtonFromToolbar() {
    this._editToolbar?.removeButton("comment");
  }
  removeEditToolbar() {
    (this._editToolbar?.remove(), (this._editToolbar = null), this.#s?.destroy());
  }
  addContainer(t) {
    const e = this._editToolbar?.div;
    e ? e.before(t) : this.div.append(t);
  }
  getClientDimensions() {
    return this.div.getBoundingClientRect();
  }
  createAltText() {
    return (
      this.#s ||
        (Ot.initialize(D._l10n),
        (this.#s = new Ot(this)),
        this.#t && ((this.#s.data = this.#t), (this.#t = null))),
      this.#s
    );
  }
  get altTextData() {
    return this.#s?.data;
  }
  set altTextData(t) {
    this.#s && (this.#s.data = t);
  }
  get guessedAltText() {
    return this.#s?.guessedText;
  }
  async setGuessedAltText(t) {
    await this.#s?.setGuessedText(t);
  }
  serializeAltText(t) {
    return this.#s?.serialize(t);
  }
  hasAltText() {
    return !!this.#s && !this.#s.isEmpty();
  }
  hasAltTextData() {
    return this.#s?.hasData() ?? !1;
  }
  focusCommentButton() {
    this.#i?.focusButton();
  }
  addCommentButton() {
    return this.canAddComment ? (this.#i ||= new Le(this)) : null;
  }
  addStandaloneCommentButton() {
    if (this._uiManager.hasCommentManager()) {
      if (this.#n) {
        this._uiManager.isEditingMode() && this.#n.classList.remove("hidden");
        return;
      }
      this.hasComment && ((this.#n = this.#i.renderForStandalone()), this.div.append(this.#n));
    }
  }
  removeStandaloneCommentButton() {
    (this.#i.removeStandaloneCommentButton(), (this.#n = null));
  }
  hideStandaloneCommentButton() {
    this.#n?.classList.add("hidden");
  }
  get comment() {
    if (!this.#i) return null;
    const {
      data: { richText: t, text: e, date: s, deleted: i },
    } = this.#i;
    return {
      text: e,
      richText: t,
      date: s,
      deleted: i,
      color: this.getNonHCMColor(),
      opacity: this.opacity ?? 1,
    };
  }
  set comment(t) {
    ((this.#i ||= new Le(this)),
      typeof t == "object" && t !== null ? this.#i.restoreData(t) : (this.#i.data = t),
      this.hasComment
        ? (this.removeCommentButtonFromToolbar(),
          this.addStandaloneCommentButton(),
          this._uiManager.updateComment(this))
        : (this.addCommentButtonInToolbar(),
          this.removeStandaloneCommentButton(),
          this._uiManager.removeComment(this)));
  }
  setCommentData({ comment: t, popupRef: e, richText: s }) {
    if (!e || ((this.#i ||= new Le(this)), this.#i.setInitialText(t, s), !this.annotationElementId)) return;
    const i = this._uiManager.getAndRemoveDataFromAnnotationStorage(this.annotationElementId);
    i && this.updateFromAnnotationLayer(i);
  }
  get hasEditedComment() {
    return this.#i?.hasBeenEdited();
  }
  get hasDeletedComment() {
    return this.#i?.isDeleted();
  }
  get hasComment() {
    return !!this.#i && !this.#i.isEmpty() && !this.#i.isDeleted();
  }
  async editComment(t) {
    ((this.#i ||= new Le(this)), this.#i.edit(t));
  }
  toggleComment(t, e = void 0) {
    this.hasComment && this._uiManager.toggleComment(this, t, e);
  }
  setSelectedCommentButton(t) {
    this.#i.setSelectedButton(t);
  }
  addComment(t) {
    if (this.hasEditedComment) {
      const [, , , i] = t.rect,
        [n] = this.pageDimensions,
        [r] = this.pageTranslation,
        a = r + n + 1,
        o = i - 100,
        l = a + 180;
      t.popup = { contents: this.comment.text, deleted: this.comment.deleted, rect: [a, o, l, i] };
    }
  }
  updateFromAnnotationLayer({ popup: { contents: t, deleted: e } }) {
    this.#i.data = e ? null : t;
  }
  get parentBoundingClientRect() {
    return this.parent.boundingClientRect;
  }
  render() {
    const t = (this.div = document.createElement("div"));
    (t.setAttribute("data-editor-rotation", (360 - this.rotation) % 360),
      (t.className = this.name),
      t.setAttribute("id", this.id),
      (t.tabIndex = this.#a ? -1 : 0),
      t.setAttribute("role", "application"),
      this.defaultL10nId && t.setAttribute("data-l10n-id", this.defaultL10nId),
      this._isVisible || t.classList.add("hidden"),
      this.setInForeground(),
      this.#H());
    const [e, s] = this.parentDimensions;
    this.parentRotation % 180 !== 0 &&
      ((t.style.maxWidth = `${((100 * s) / e).toFixed(2)}%`),
      (t.style.maxHeight = `${((100 * e) / s).toFixed(2)}%`));
    const [i, n] = this.getInitialTranslation();
    return (
      this.translate(i, n),
      Xi(this, t, ["keydown", "pointerdown", "dblclick"]),
      this.#$(),
      this.addStandaloneCommentButton(),
      this._uiManager._editorUndoBar?.hide(),
      t
    );
  }
  #j() {
    ((this.#u = { savedX: this.x, savedY: this.y, savedWidth: this.width, savedHeight: this.height }),
      this.#s?.toggle(!1),
      this.parent.togglePointerEvents(!1));
  }
  #B(t, e, s) {
    let n = 0.7 * (s / e) + 1 - 0.7;
    if (n === 1) return;
    const r = this.#F(this.rotation),
      a = (S, x) => [r[0] * S + r[2] * x, r[1] * S + r[3] * x],
      [o, l] = this.parentDimensions,
      h = this.x,
      d = this.y,
      u = this.width,
      f = this.height,
      p = D.MIN_SIZE / o,
      g = D.MIN_SIZE / l;
    n = Math.max(Math.min(n, 1 / u, 1 / f), p / u, g / f);
    const m = D._round(u * n),
      b = D._round(f * n);
    if (m === u && b === f) return;
    this.#c ||= [h, d, u, f];
    const y = a(u / 2, f / 2),
      A = D._round(h + y[0]),
      w = D._round(d + y[1]),
      v = a(m / 2, b / 2);
    ((this.x = A - v[0]),
      (this.y = w - v[1]),
      (this.width = m),
      (this.height = b),
      this.setDims(),
      this.fixAndSetPosition(),
      this._onResizing());
  }
  #G() {
    (this.#s?.toggle(!0), this.parent.togglePointerEvents(!0), this.#D());
  }
  pointerdown(t) {
    const { isMac: e } = j.platform;
    if (t.button !== 0 || (t.ctrlKey && e)) {
      t.preventDefault();
      return;
    }
    if (((this.#m = !0), this._isDraggable)) {
      this.#S(t);
      return;
    }
    this.#C(t);
  }
  #C(t) {
    const { isMac: e } = j.platform;
    (t.ctrlKey && !e) || t.shiftKey || (t.metaKey && e)
      ? this.parent.toggleSelected(this)
      : this.parent.setSelected(this);
  }
  #S(t) {
    const { isSelected: e } = this;
    this._uiManager.setUpDragSession();
    let s = !1;
    const i = new AbortController(),
      n = this._uiManager.combinedSignal(i),
      r = { capture: !0, passive: !1, signal: n },
      a = (l) => {
        (i.abort(),
          (this.#r = null),
          (this.#m = !1),
          this._uiManager.endDragSession() || this.#C(l),
          s && this._onStopDragging());
      };
    e &&
      ((this.#v = t.clientX),
      (this.#w = t.clientY),
      (this.#r = t.pointerId),
      (this.#o = t.pointerType),
      window.addEventListener(
        "pointermove",
        (l) => {
          s || ((s = !0), this._uiManager.toggleComment(this, !0, !1), this._onStartDragging());
          const { clientX: h, clientY: d, pointerId: u } = l;
          if (u !== this.#r) {
            rt(l);
            return;
          }
          const [f, p] = this.screenToPageTranslation(h - this.#v, d - this.#w);
          ((this.#v = h),
            (this.#w = d),
            this._uiManager.dragSelectedEditors(f, p),
            this.div.scrollIntoView({ block: "nearest" }));
        },
        r,
      ),
      window.addEventListener("touchmove", rt, r),
      window.addEventListener(
        "pointerdown",
        (l) => {
          (l.pointerType === this.#o && (this.#_ || l.isPrimary) && a(l), rt(l));
        },
        r,
      ));
    const o = (l) => {
      if (!this.#r || this.#r === l.pointerId) {
        a(l);
        return;
      }
      rt(l);
    };
    (window.addEventListener("pointerup", o, { signal: n }),
      window.addEventListener("blur", o, { signal: n }));
  }
  _onStartDragging() {}
  _onStopDragging() {}
  moveInDOM() {
    (this.#A && clearTimeout(this.#A),
      (this.#A = setTimeout(() => {
        ((this.#A = null), this.parent?.moveEditorInDOM(this));
      }, 0)));
  }
  _setParentAndPosition(t, e, s) {
    (t.changeParent(this), (this.x = e), (this.y = s), this.fixAndSetPosition(), this._onTranslated());
  }
  getRect(t, e, s = this.rotation) {
    const i = this.parentScale,
      [n, r] = this.pageDimensions,
      [a, o] = this.pageTranslation,
      l = t / i,
      h = e / i,
      d = this.x * n,
      u = this.y * r,
      f = this.width * n,
      p = this.height * r;
    switch (s) {
      case 0:
        return [d + l + a, r - u - h - p + o, d + l + f + a, r - u - h + o];
      case 90:
        return [d + h + a, r - u + l + o, d + h + p + a, r - u + l + f + o];
      case 180:
        return [d - l - f + a, r - u + h + o, d - l + a, r - u + h + p + o];
      case 270:
        return [d - h - p + a, r - u - l - f + o, d - h + a, r - u - l + o];
      default:
        throw new Error("Invalid rotation");
    }
  }
  getRectInCurrentCoords(t, e) {
    const [s, i, n, r] = t,
      a = n - s,
      o = r - i;
    switch (this.rotation) {
      case 0:
        return [s, e - r, a, o];
      case 90:
        return [s, e - i, o, a];
      case 180:
        return [n, e - i, a, o];
      case 270:
        return [n, e - r, o, a];
      default:
        throw new Error("Invalid rotation");
    }
  }
  getPDFRect() {
    return this.getRect(0, 0);
  }
  getNonHCMColor() {
    return this.color && D._colorManager.convert(this._uiManager.getNonHCMColor(this.color));
  }
  onUpdatedColor() {
    this.#i?.onUpdatedColor();
  }
  getData() {
    const {
      comment: { text: t, color: e, date: s, opacity: i, deleted: n, richText: r },
      uid: a,
      pageIndex: o,
      creationDate: l,
      modificationDate: h,
    } = this;
    return {
      id: a,
      pageIndex: o,
      rect: this.getPDFRect(),
      richText: r,
      contentsObj: { str: t },
      creationDate: l,
      modificationDate: s || h,
      popupRef: !n,
      color: e,
      opacity: i,
    };
  }
  onceAdded(t) {}
  isEmpty() {
    return !1;
  }
  enableEditMode() {
    return this.isInEditMode() ? !1 : (this.parent.setEditingState(!1), (this.#b = !0), !0);
  }
  disableEditMode() {
    return this.isInEditMode() ? (this.parent.setEditingState(!0), (this.#b = !1), !0) : !1;
  }
  isInEditMode() {
    return this.#b;
  }
  shouldGetKeyboardEvents() {
    return this.#y;
  }
  needsToBeRebuilt() {
    return this.div && !this.isAttachedToDOM;
  }
  get isOnScreen() {
    const { top: t, left: e, bottom: s, right: i } = this.getClientDimensions(),
      { innerHeight: n, innerWidth: r } = window;
    return e < r && i > 0 && t < n && s > 0;
  }
  #H() {
    if (this.#f || !this.div) return;
    this.#f = new AbortController();
    const t = this._uiManager.combinedSignal(this.#f);
    (this.div.addEventListener("focusin", this.focusin.bind(this), { signal: t }),
      this.div.addEventListener("focusout", this.focusout.bind(this), { signal: t }));
  }
  #$() {
    this.#_ ||
      !this.div ||
      !this.isResizable ||
      !this._uiManager._supportsPinchToZoom ||
      (this.#_ = new Yi({
        container: this.div,
        isPinchingDisabled: () => !this.isSelected,
        onPinchStart: this.#j.bind(this),
        onPinching: this.#B.bind(this),
        onPinchEnd: this.#G.bind(this),
        signal: this._uiManager._signal,
      }));
  }
  rebuild() {
    (this.#H(), this.#$());
  }
  rotate(t) {}
  resize() {}
  serializeDeleted() {
    return {
      id: this.annotationElementId,
      deleted: !0,
      pageIndex: this.pageIndex,
      popupRef: this._initialData?.popupRef || "",
    };
  }
  serialize(t = !1, e = null) {
    return {
      annotationType: this.mode,
      pageIndex: this.pageIndex,
      rect: this.getPDFRect(),
      rotation: this.rotation,
      structTreeParentId: this._structTreeParentId,
      popupRef: this._initialData?.popupRef || "",
    };
  }
  static async deserialize(t, e, s) {
    const i = new this.prototype.constructor({
      parent: e,
      id: s.getId(),
      uiManager: s,
      annotationElementId: t.annotationElementId,
      creationDate: t.creationDate,
      modificationDate: t.modificationDate,
    });
    ((i.rotation = t.rotation), (i.#t = t.accessibilityData), (i._isCopy = t.isCopy || !1));
    const [n, r] = i.pageDimensions,
      [a, o, l, h] = i.getRectInCurrentCoords(t.rect, r);
    return ((i.x = a / n), (i.y = o / r), (i.width = l / n), (i.height = h / r), i);
  }
  get hasBeenModified() {
    return !!this.annotationElementId && (this.deleted || this.serialize() !== null);
  }
  remove() {
    if (
      (this.#f?.abort(),
      (this.#f = null),
      this.isEmpty() || this.commit(),
      this.#_?.destroy(),
      (this.#_ = null),
      this.parent ? this.parent.remove(this) : this._uiManager.removeEditor(this),
      this.hideCommentPopup(),
      this.#A && (clearTimeout(this.#A), (this.#A = null)),
      this.#L(),
      this.removeEditToolbar(),
      this.#x)
    ) {
      for (const t of this.#x.values()) clearTimeout(t);
      this.#x = null;
    }
    ((this.parent = null), this.#d?.remove(), (this.#d = null));
  }
  get isResizable() {
    return !1;
  }
  makeResizable() {
    this.isResizable && (this.#I(), this.#l.classList.remove("hidden"));
  }
  get toolbarPosition() {
    return null;
  }
  get commentButtonPosition() {
    return this._uiManager.direction === "ltr" ? [1, 0] : [0, 0];
  }
  get commentButtonPositionInPage() {
    const {
        commentButtonPosition: [t, e],
      } = this,
      [s, i, n, r] = this.getPDFRect();
    return [D._round(s + (n - s) * t), D._round(i + (r - i) * (1 - e))];
  }
  get commentButtonColor() {
    return this._uiManager.makeCommentColor(this.getNonHCMColor(), this.opacity);
  }
  get commentPopupPosition() {
    return this.#i.commentPopupPositionInLayer;
  }
  set commentPopupPosition(t) {
    this.#i.commentPopupPositionInLayer = t;
  }
  hasDefaultPopupPosition() {
    return this.#i.hasDefaultPopupPosition();
  }
  get commentButtonWidth() {
    return this.#i.commentButtonWidth;
  }
  get elementBeforePopup() {
    return this.div;
  }
  setCommentButtonStates(t) {
    this.#i?.setCommentButtonStates(t);
  }
  keydown(t) {
    if (!this.isResizable || t.target !== this.div || t.key !== "Enter") return;
    (this._uiManager.setSelected(this),
      (this.#u = { savedX: this.x, savedY: this.y, savedWidth: this.width, savedHeight: this.height }));
    const e = this.#l.children;
    if (!this.#e) {
      this.#e = Array.from(e);
      const r = this.#V.bind(this),
        a = this.#q.bind(this),
        o = this._uiManager._signal;
      for (const l of this.#e) {
        const h = l.getAttribute("data-resizer-name");
        (l.setAttribute("role", "spinbutton"),
          l.addEventListener("keydown", r, { signal: o }),
          l.addEventListener("blur", a, { signal: o }),
          l.addEventListener("focus", this.#Y.bind(this, h), { signal: o }),
          l.setAttribute("data-l10n-id", D._l10nResizer[h]));
      }
    }
    const s = this.#e[0];
    let i = 0;
    for (const r of e) {
      if (r === s) break;
      i++;
    }
    const n = (((360 - this.rotation + this.parentRotation) % 360) / 90) * (this.#e.length / 4);
    if (n !== i) {
      if (n < i) for (let a = 0; a < i - n; a++) this.#l.append(this.#l.firstElementChild);
      else if (n > i)
        for (let a = 0; a < n - i; a++) this.#l.firstElementChild.before(this.#l.lastElementChild);
      let r = 0;
      for (const a of e) {
        const l = this.#e[r++].getAttribute("data-resizer-name");
        a.setAttribute("data-l10n-id", D._l10nResizer[l]);
      }
    }
    (this.#K(0),
      (this.#y = !0),
      this.#l.firstElementChild.focus({ focusVisible: !0 }),
      t.preventDefault(),
      t.stopImmediatePropagation());
  }
  #V(t) {
    D._resizerKeyboardManager.exec(this, t);
  }
  #q(t) {
    this.#y && t.relatedTarget?.parentNode !== this.#l && this.#L();
  }
  #Y(t) {
    this.#g = this.#y ? t : "";
  }
  #K(t) {
    if (this.#e) for (const e of this.#e) e.tabIndex = t;
  }
  _resizeWithKeyboard(t, e) {
    this.#y && this.#N(this.#g, { deltaX: t, deltaY: e, fromKeyboard: !0 });
  }
  #L() {
    ((this.#y = !1), this.#K(-1), this.#D());
  }
  _stopResizingWithKeyboard() {
    (this.#L(), this.div.focus());
  }
  select() {
    if (this.isSelected && this._editToolbar) {
      this._editToolbar.show();
      return;
    }
    if (
      ((this.isSelected = !0),
      this.makeResizable(),
      this.div?.classList.add("selectedEditor"),
      !this._editToolbar)
    ) {
      this.addEditToolbar().then(() => {
        this.div?.classList.contains("selectedEditor") && this._editToolbar?.show();
      });
      return;
    }
    (this._editToolbar?.show(), this.#s?.toggleAltTextBadge(!1));
  }
  focus() {
    this.div &&
      !this.div.contains(document.activeElement) &&
      setTimeout(() => this.div?.focus({ preventScroll: !0 }), 0);
  }
  unselect() {
    this.isSelected &&
      ((this.isSelected = !1),
      this.#l?.classList.add("hidden"),
      this.div?.classList.remove("selectedEditor"),
      this.div?.contains(document.activeElement) &&
        this._uiManager.currentLayer.div.focus({ preventScroll: !0 }),
      this._editToolbar?.hide(),
      this.#s?.toggleAltTextBadge(!0),
      this.hideCommentPopup());
  }
  hideCommentPopup() {
    this.hasComment && this._uiManager.toggleComment(null);
  }
  updateParams(t, e) {}
  disableEditing() {}
  enableEditing() {}
  get canChangeContent() {
    return !1;
  }
  enterInEditMode() {
    this.canChangeContent && (this.enableEditMode(), this.div.focus());
  }
  dblclick(t) {
    t.target.nodeName !== "BUTTON" &&
      (this.enterInEditMode(),
      this.parent.updateToolbar({ mode: this.constructor._editorType, editId: this.uid }));
  }
  getElementForAltText() {
    return this.div;
  }
  get contentDiv() {
    return this.div;
  }
  get isEditing() {
    return this.#p;
  }
  set isEditing(t) {
    ((this.#p = t),
      this.parent &&
        (t
          ? (this.parent.setSelected(this), this.parent.setActiveEditor(this))
          : this.parent.setActiveEditor(null)));
  }
  static get MIN_SIZE() {
    return 16;
  }
  static canCreateNewEmptyEditor() {
    return !0;
  }
  get telemetryInitialData() {
    return { action: "added" };
  }
  get telemetryFinalData() {
    return null;
  }
  _reportTelemetry(t, e = !1) {
    if (e) {
      this.#x ||= new Map();
      const { action: s } = t;
      let i = this.#x.get(s);
      (i && clearTimeout(i),
        (i = setTimeout(() => {
          (this._reportTelemetry(t), this.#x.delete(s), this.#x.size === 0 && (this.#x = null));
        }, D._telemetryTimeout)),
        this.#x.set(s, i));
      return;
    }
    ((t.type ||= this.editorType),
      this._uiManager._eventBus.dispatch("reporttelemetry", {
        source: this,
        details: { type: "editing", data: t },
      }));
  }
  show(t = this._isVisible) {
    (this.div.classList.toggle("hidden", !t), (this._isVisible = t));
  }
  enable() {
    (this.div && (this.div.tabIndex = 0), (this.#a = !1));
  }
  disable() {
    (this.div && (this.div.tabIndex = -1), (this.#a = !0));
  }
  updateFakeAnnotationElement(t) {
    if (!this.#d && !this.deleted) {
      this.#d = t.addFakeAnnotation(this);
      return;
    }
    if (this.deleted) {
      (this.#d.remove(), (this.#d = null));
      return;
    }
    (this.hasEditedComment || this._hasBeenMoved || this._hasBeenResized) &&
      this.#d.updateEdited({ rect: this.getPDFRect(), popup: this.comment });
  }
  renderAnnotationElement(t) {
    if (this.deleted) return (t.hide(), null);
    let e = t.container.querySelector(".annotationContent");
    if (!e)
      ((e = document.createElement("div")),
        e.classList.add("annotationContent", this.editorType),
        t.container.prepend(e));
    else if (e.nodeName === "CANVAS") {
      const s = e;
      ((e = document.createElement("div")),
        e.classList.add("annotationContent", this.editorType),
        s.before(e));
    }
    return e;
  }
  resetAnnotationElement(t) {
    const { firstElementChild: e } = t.container;
    e?.nodeName === "DIV" && e.classList.contains("annotationContent") && e.remove();
  }
}