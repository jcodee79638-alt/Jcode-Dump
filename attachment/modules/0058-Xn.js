
class Xn {
  static get commentForegroundColor() {
    const t = document.createElement("span");
    t.classList.add("comment", "sidebar");
    const { style: e } = t;
    ((e.width = e.height = "0"),
      (e.display = "none"),
      (e.color = "var(--comment-fg-color)"),
      document.body.append(t));
    const { color: s } = window.getComputedStyle(t);
    return (t.remove(), k(this, "commentForegroundColor", Ie(s)));
  }
}