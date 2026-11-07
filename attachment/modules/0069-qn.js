
class qn {
  #t = null;
  #e = null;
  #s;
  constructor(t) {
    this.#s = t;
  }
  #i() {
    const t = (this.#e = document.createElement("div"));
    ((t.className = "editToolbar"), t.setAttribute("role", "toolbar"), (t.dir = this.#s.direction));
    const e = this.#s._signal;
    e instanceof AbortSignal && !e.aborted && t.addEventListener("contextmenu", kt, { signal: e });
    const s = (this.#t = document.createElement("div"));
    return (
      (s.className = "buttons"),
      t.append(s),
      this.#s.hasCommentManager() &&
        this.#a(
          "commentButton",
          "pdfjs-comment-floating-button",
          "pdfjs-comment-floating-button-label",
          () => {
            this.#s.commentSelection("floating_button");
          },
        ),
      this.#a(
        "highlightButton",
        "pdfjs-highlight-floating-button1",
        "pdfjs-highlight-floating-button-label",
        () => {
          this.#s.highlightSelection("floating_button");
        },
      ),
      t
    );
  }
  #n(t, e) {
    let s = 0,
      i = 0;
    for (const n of t) {
      const r = n.y + n.height;
      if (r < s) continue;
      const a = n.x + (e ? n.width : 0);
      if (r > s) {
        ((i = a), (s = r));
        continue;
      }
      e ? a > i && (i = a) : a < i && (i = a);
    }
    return [e ? 1 - i : i, s];
  }
  show(t, e, s) {
    const [i, n] = this.#n(e, s),
      { style: r } = (this.#e ||= this.#i());
    (t.append(this.#e),
      (r.insetInlineEnd = `${100 * i}%`),
      (r.top = `calc(${100 * n}% + var(--editor-toolbar-vert-offset))`));
  }
  hide() {
    this.#e.remove();
  }
  #a(t, e, s, i) {
    const n = document.createElement("button");
    (n.classList.add("basic", t), (n.tabIndex = 0), n.setAttribute("data-l10n-id", e));
    const r = document.createElement("span");
    (n.append(r), (r.className = "visuallyHidden"), r.setAttribute("data-l10n-id", s));
    const a = this.#s._signal;
    (a instanceof AbortSignal &&
      !a.aborted &&
      (n.addEventListener("contextmenu", kt, { signal: a }), n.addEventListener("click", i, { signal: a })),
      this.#t.append(n));
  }
}