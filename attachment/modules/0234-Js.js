
class Js extends Q {
  constructor(t, e = null) {
    (super(t, { isRenderable: !0, ignoreBorder: !!e?.ignoreBorder, createQuadrilaterals: !0 }),
      (this.isTooltipOnly = t.data.isTooltipOnly));
  }
  render() {
    const { data: t, linkService: e } = this,
      s = document.createElement("a");
    s.setAttribute("data-element-id", t.id);
    let i = !1;
    return (
      t.url
        ? (e.addLinkAttributes(s, t.url, t.newWindow), (i = !0))
        : t.action
          ? (this._bindNamedAction(s, t.action, t.overlaidText), (i = !0))
          : t.attachment
            ? (this.#e(s, t.attachmentId, t.attachment, t.overlaidText, t.attachmentDest), (i = !0))
            : t.setOCGState
              ? (this.#s(s, t.setOCGState, t.overlaidText), (i = !0))
              : t.dest
                ? (this._bindLink(s, t.dest, t.overlaidText), (i = !0))
                : (t.actions &&
                    (t.actions.has("Action") || t.actions.has("Mouse Up") || t.actions.has("Mouse Down")) &&
                    this.enableScripting &&
                    this.hasJSActions &&
                    (this._bindJSAction(s, t), (i = !0)),
                  t.resetForm
                    ? (this._bindResetFormAction(s, t.resetForm), (i = !0))
                    : this.isTooltipOnly && !i && (this._bindLink(s, ""), (i = !0))),
      this.container.classList.add("linkAnnotation"),
      i && ((this.contentElement = s), this.container.append(s)),
      this.container
    );
  }
  #t() {
    this.container.setAttribute("data-internal-link", "");
  }
  _bindLink(t, e, s = "") {
    ((t.href = this.linkService.getDestinationHash(e)),
      (t.onclick = () => (e && this.linkService.goToDestination(e), !1)),
      (e || e === "") && this.#t(),
      s && (t.title = s));
  }
  _bindNamedAction(t, e, s = "") {
    ((t.href = this.linkService.getAnchorUrl("")),
      (t.onclick = () => (this.linkService.executeNamedAction(e), !1)),
      s && (t.title = s),
      this.#t());
  }
  #e(t, e, s, i = "", n = null) {
    ((t.href = this.linkService.getAnchorUrl("")),
      s.description ? (t.title = s.description) : i && (t.title = i));
    const r = async () => {
      const a = await this.linkService.getAttachmentContent(e);
      a && this.downloadManager?.openOrDownloadData(a, s.filename, n);
    };
    ((t.onclick = () => (r(), !1)), this.#t());
  }
  #s(t, e, s = "") {
    ((t.href = this.linkService.getAnchorUrl("")),
      (t.onclick = () => (this.linkService.executeSetOCGState(e), !1)),
      s && (t.title = s),
      this.#t());
  }
  _bindJSAction(t, { actions: e, id: s, overlaidText: i }) {
    t.href = this.linkService.getAnchorUrl("");
    const n = new Map([
      ["Action", "onclick"],
      ["Mouse Up", "onmouseup"],
      ["Mouse Down", "onmousedown"],
    ]);
    for (const r of e.keys()) {
      const a = n.get(r);
      a &&
        (t[a] = () => (
          this.linkService.eventBus?.dispatch("dispatcheventinsandbox", {
            source: this,
            detail: { id: s, name: r },
          }),
          !1
        ));
    }
    (i && (t.title = i), (t.onclick ||= () => !1), this.#t());
  }
  _bindResetFormAction(t, e) {
    const s = t.onclick;
    if ((s || (t.href = this.linkService.getAnchorUrl("")), this.#t(), !this._fieldObjects)) {
      (H(
        '_bindResetFormAction - "resetForm" action not supported, ensure that the `fieldObjects` parameter is provided.',
      ),
        s || (t.onclick = () => !1));
      return;
    }
    t.onclick = () => {
      s?.();
      const { fields: i, refs: n, include: r } = e,
        a = [];
      if (i.length !== 0 || n.length !== 0) {
        const h = new Set(n);
        for (const u of i) {
          const f = this._fieldObjects.get(u) || [];
          for (const { id: p } of f) h.add(p);
        }
        const d = new Map();
        for (const u of this._fieldObjects.values()) for (const { id: f, kidIds: p } of u) p && d.set(f, p);
        for (const u of h) for (const f of d.get(u) || []) h.add(f);
        for (const u of this._fieldObjects.values()) for (const f of u) h.has(f.id) === r && a.push(f);
      } else for (const h of this._fieldObjects.values()) a.push(...h);
      const o = this.annotationStorage,
        l = [];
      for (const h of a) {
        const { id: d } = h;
        switch ((l.push(d), h.type)) {
          case "text": {
            const f = h.defaultValue || "";
            o.setValue(d, { value: f });
            break;
          }
          case "checkbox":
          case "radiobutton": {
            const f = h.defaultValue === h.exportValues;
            o.setValue(d, { value: f });
            break;
          }
          case "combobox":
          case "listbox": {
            const f = h.defaultValue || "";
            o.setValue(d, { value: f });
            break;
          }
          default:
            continue;
        }
        const u = document.querySelector(`[data-element-id="${d}"]`);
        if (u) {
          if (!Jt.has(u)) {
            H(`_bindResetFormAction - element not allowed: ${d}`);
            continue;
          }
        } else continue;
        u.dispatchEvent(new Event("resetform"));
      }
      return (
        this.enableScripting &&
          this.linkService.eventBus?.dispatch("dispatcheventinsandbox", {
            source: this,
            detail: { id: "app", ids: l, name: "ResetForm" },
          }),
        !1
      );
    };
  }
}