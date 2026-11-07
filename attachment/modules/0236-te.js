
class te extends Q {
  render() {
    return this.container;
  }
  _getKeyModifier(t) {
    return j.platform.isMac ? t.metaKey : t.ctrlKey;
  }
  _setEventListener(t, e, s, i, n) {
    s.includes("mouse")
      ? t.addEventListener(s, (r) => {
          this.linkService.eventBus?.dispatch("dispatcheventinsandbox", {
            source: this,
            detail: {
              id: this.data.id,
              name: i,
              value: n(r),
              shift: r.shiftKey,
              modifier: this._getKeyModifier(r),
            },
          });
        })
      : t.addEventListener(s, (r) => {
          if (s === "blur") {
            if (!e.focused || !r.relatedTarget) return;
            e.focused = !1;
          } else if (s === "focus") {
            if (e.focused) return;
            e.focused = !0;
          }
          n &&
            this.linkService.eventBus?.dispatch("dispatcheventinsandbox", {
              source: this,
              detail: { id: this.data.id, name: i, value: n(r) },
            });
        });
  }
  _setEventListeners(t, e, s, i) {
    const { actions: n } = this.data;
    for (const [r, a] of s)
      (a === "Action" || n?.has(a)) &&
        ((a === "Focus" || a === "Blur") && (e ||= { focused: !1 }),
        this._setEventListener(t, e, r, a, i),
        a === "Focus" && !n?.has("Blur")
          ? this._setEventListener(t, e, "blur", "Blur", null)
          : a === "Blur" && !n?.has("Focus") && this._setEventListener(t, e, "focus", "Focus", null));
  }
  _setTextStyle(t) {
    const e = ["left", "center", "right"],
      { fontColor: s } = this.data.defaultAppearanceData,
      i = this.data.defaultAppearanceData.fontSize || Aa,
      n = t.style;
    let r;
    const a = 2,
      o = (l) => Math.round(10 * l) / 10;
    if (this.data.multiLine) {
      const l = Math.abs(this.data.rect[3] - this.data.rect[1] - a),
        h = Math.round(l / (1.35 * i)) || 1,
        d = l / h;
      r = Math.min(i, o(d / 1.35));
    } else {
      const l = Math.abs(this.data.rect[3] - this.data.rect[1] - a);
      r = Math.min(i, o(l / 1.35));
    }
    ((n.fontSize = `calc(${r}px * var(--total-scale-factor))`),
      (n.color = T.makeHexColor(...s)),
      this.data.textAlignment !== null && !this.data.comb && (n.textAlign = e[this.data.textAlignment]));
  }
  _setRequired(t, e) {
    (e ? t.setAttribute("required", !0) : t.removeAttribute("required"), t.setAttribute("aria-required", e));
  }
}