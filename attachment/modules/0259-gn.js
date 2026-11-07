
class gn extends Q {
  #t = new AbortController();
  #e = null;
  #s = null;
  constructor(t) {
    super(t, { isRenderable: !!t.data.richMedia });
  }
  render() {
    this.container.classList.add("mediaAnnotation");
    const { filename: t } = this.data.richMedia,
      e = document.createElement("button");
    return (
      (e.className = "mediaPlayButton"),
      (e.type = "button"),
      (e.title = e.ariaLabel = t),
      e.addEventListener("click", () => this.#i(e), { signal: this.#t.signal }),
      this.container.append(e),
      this.container
    );
  }
  async #i(t) {
    const { fileId: e, filename: s, contentType: i } = this.data.richMedia;
    t.disabled = !0;
    let n;
    try {
      n = await this.linkService.getAttachmentContent(e);
    } catch {
      return;
    } finally {
      t.disabled = !1;
    }
    if (!n || !t.isConnected) return;
    const { signal: r } = this.#t,
      a = new Blob([n], { type: i });
    if (!/^(?:video|audio)\//.test(a.type)) return;
    const o = URL.createObjectURL(a);
    this.#e = o;
    const l = a.type.startsWith("audio/"),
      h = document.createElement(l ? "audio" : "video");
    if (
      ((this.#s = h),
      (h.className = "mediaContent"),
      this._setBackgroundColor(h),
      (h.src = o),
      (h.title = s),
      (h.controls = !0),
      (h.autoplay = !0),
      (h.tabIndex = 0),
      l)
    ) {
      let d = !1,
        u = !1;
      const f = () => {
        h.controls = d || u;
      };
      (this.container.addEventListener(
        "pointerenter",
        () => {
          ((d = !0), f());
        },
        { signal: r },
      ),
        this.container.addEventListener(
          "pointerleave",
          () => {
            ((d = !1), f());
          },
          { signal: r },
        ),
        this.container.addEventListener(
          "focusin",
          () => {
            ((u = !0), f());
          },
          { signal: r },
        ),
        this.container.addEventListener(
          "focusout",
          () => {
            ((u = !1), f());
          },
          { signal: r },
        ));
    }
    (h.addEventListener("emptied", () => this.#n(o), { once: !0, signal: r }),
      t.replaceWith(h),
      h.play().catch(() => {}));
  }
  #n(t = this.#e) {
    t && t === this.#e && (URL.revokeObjectURL(t), (this.#e = null));
  }
  destroy() {
    (this.#t.abort(),
      this.#s && (this.#s.pause(), this.#s.removeAttribute("src"), this.#s.load(), (this.#s = null)),
      this.#n());
  }
}