
class ji {
  static get _allowedHtmlElements() {
    return k(
      this,
      "_allowedHtmlElements",
      new Set([
        "a",
        "b",
        "br",
        "button",
        "div",
        "i",
        "img",
        "input",
        "label",
        "li",
        "ol",
        "option",
        "p",
        "select",
        "span",
        "sub",
        "sup",
        "textarea",
        "ul",
      ]),
    );
  }
  static get _allowedSvgElements() {
    return k(this, "_allowedSvgElements", new Set(["ellipse", "line", "path", "rect", "svg"]));
  }
  static get _allowedRichTextElements() {
    return k(
      this,
      "_allowedRichTextElements",
      new Set(["a", "b", "br", "div", "i", "li", "ol", "p", "span", "sub", "sup", "ul"]),
    );
  }
  static get _allowedRichTextAttributes() {
    return k(this, "_allowedRichTextAttributes", new Set(["class", "dir", "style"]));
  }
  static get _allowedRichTextStyles() {
    return k(
      this,
      "_allowedRichTextStyles",
      new Set([
        "color",
        "font",
        "fontFamily",
        "fontSize",
        "fontStretch",
        "fontStyle",
        "fontWeight",
        "kerningMode",
        "letterSpacing",
        "lineHeight",
        "margin",
        "marginBottom",
        "marginLeft",
        "marginRight",
        "marginTop",
        "orphans",
        "paddingLeft",
        "paddingRight",
        "breakAfter",
        "breakBefore",
        "breakInside",
        "tabInterval",
        "tabStop",
        "textAlign",
        "textDecoration",
        "textIndent",
        "transform",
        "verticalAlign",
        "widows",
      ]),
    );
  }
  static setupStorage(t, e, s, i, n) {
    const r = i.getValue(e, { value: null });
    switch (s.name) {
      case "textarea":
        if ((r.value !== null && (t.textContent = r.value), n === "print")) break;
        t.addEventListener("input", (a) => {
          i.setValue(e, { value: a.target.value });
        });
        break;
      case "input":
        if (s.attributes.type === "radio" || s.attributes.type === "checkbox") {
          if (
            (r.value === s.attributes.xfaOn
              ? t.setAttribute("checked", !0)
              : r.value === s.attributes.xfaOff && t.removeAttribute("checked"),
            n === "print")
          )
            break;
          t.addEventListener("change", (a) => {
            i.setValue(e, {
              value: a.target.checked ? a.target.getAttribute("xfaOn") : a.target.getAttribute("xfaOff"),
            });
          });
        } else {
          if ((r.value !== null && t.setAttribute("value", r.value), n === "print")) break;
          t.addEventListener("input", (a) => {
            i.setValue(e, { value: a.target.value });
          });
        }
        break;
      case "select":
        if (r.value !== null) {
          t.setAttribute("value", r.value);
          for (const a of s.children)
            a.attributes.value === r.value
              ? (a.attributes.selected = !0)
              : Object.hasOwn(a.attributes, "selected") && delete a.attributes.selected;
        }
        t.addEventListener("input", (a) => {
          const o = a.target.options,
            l = o.selectedIndex === -1 ? "" : o[o.selectedIndex].value;
          i.setValue(e, { value: l });
        });
        break;
    }
  }
  static setAttributes({ html: t, element: e, storage: s = null, intent: i, linkService: n }) {
    const { attributes: r } = e,
      a = t instanceof HTMLAnchorElement;
    r.type === "radio" && (r.name = `${r.name}-${i}`);
    for (const [o, l] of Object.entries(r))
      if (!(l == null || $n.test(o)) && !(i === "richText" && !this._allowedRichTextAttributes.has(o)))
        switch (o) {
          case "class":
            l.length && t.setAttribute(o, l.join(" "));
            break;
          case "dataId":
            break;
          case "id":
            t.setAttribute("data-element-id", l);
            break;
          case "style":
            if (i === "richText") {
              const h = this._allowedRichTextStyles;
              for (const [d, u] of Object.entries(l)) h.has(d) && !Gn.test(u) && (t.style[d] = u);
            } else Object.assign(t.style, l);
            break;
          case "textContent":
            t.textContent = l;
            break;
          default:
            (!a || (o !== "href" && o !== "newWindow")) && t.setAttribute(o, l);
        }
    (a && n?.addLinkAttributes(t, r.href, r.newWindow),
      s && r.dataId && this.setupStorage(t, r.dataId, e, s));
  }
  static #t(t, e, s) {
    return s === "richText"
      ? !e && this._allowedRichTextElements.has(t)
        ? document.createElement(t)
        : null
      : e
        ? e === ct && this._allowedSvgElements.has(t)
          ? document.createElementNS(ct, t)
          : null
        : this._allowedHtmlElements.has(t)
          ? document.createElement(t)
          : null;
  }
  static render(t) {
    const e = t.annotationStorage,
      s = t.linkService,
      i = t.xfaHtml,
      n = t.intent || "display",
      r = this.#t(i.name, i.attributes?.xmlns, n) ?? document.createElement("div");
    i.attributes && this.setAttributes({ html: r, element: i, intent: n, linkService: s });
    const a = n !== "richText",
      o = t.div;
    if ((o.append(r), t.viewport)) {
      const d = `matrix(${t.viewport.transform.join(",")})`;
      o.style.transform = d;
    }
    a && o.setAttribute("class", "xfaLayer xfaFont");
    const l = [];
    if (i.children.length === 0) {
      if (i.value) {
        const d = document.createTextNode(i.value);
        (r.append(d), a && Ce.shouldBuildText(i.name) && l.push(d));
      }
      return { textDivs: l };
    }
    const h = [[i, -1, r]];
    for (; h.length > 0;) {
      const [d, u, f] = h.at(-1);
      if (u + 1 === d.children.length) {
        h.pop();
        continue;
      }
      const p = d.children[++h.at(-1)[1]];
      if (p === null) continue;
      const { name: g } = p;
      if (g === "#text") {
        const b = document.createTextNode(p.value);
        (l.push(b), f.append(b));
        continue;
      }
      const m = this.#t(g, p.attributes?.xmlns, n);
      if (m) {
        if (
          (f.append(m),
          p.attributes && this.setAttributes({ html: m, element: p, storage: e, intent: n, linkService: s }),
          p.children?.length > 0)
        )
          h.push([p, -1, m]);
        else if (p.value) {
          const b = document.createTextNode(p.value);
          (a && Ce.shouldBuildText(g) && l.push(b), m.append(b));
        }
      }
    }
    for (const d of o.querySelectorAll(".xfaNonInteractive input, .xfaNonInteractive textarea"))
      d.setAttribute("readOnly", !0);
    return { textDivs: l };
  }
  static update(t) {
    const e = `matrix(${t.viewport.transform.join(",")})`;
    ((t.div.style.transform = e), (t.div.hidden = !1));
  }
  static getPageViewport(t, { scale: e = 1, rotation: s = 0 }) {
    const { width: i, height: n } = t.attributes.style;
    return new Me({ viewBox: [0, 0, parseInt(i, 10), parseInt(n, 10)], userUnit: 1, scale: e, rotation: s });
  }
}