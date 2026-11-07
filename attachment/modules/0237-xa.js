
class xa extends te {
  constructor(t) {
    const e = t.renderForms || t.data.hasOwnCanvas || (!t.data.hasAppearance && !!t.data.fieldValue);
    super(t, { isRenderable: e });
  }
  setPropertyOnSiblings(t, e, s, i) {
    const n = this.annotationStorage;
    for (const r of this._getElementsByName(t.name, t.id))
      (r.domElement && (r.domElement[e] = s), n.setValue(r.id, { [i]: s }));
  }
  render() {
    const t = this.annotationStorage,
      e = this.data.id;
    this.container.classList.add("textWidgetAnnotation");
    let s = null;
    if (this.renderForms) {
      const i = t.getValue(e, { value: this.data.fieldValue });
      let n = i.value || "";
      const r = t.getValue(e, { charLimit: this.data.maxLen }).charLimit;
      r && n.length > r && (n = n.slice(0, r));
      let a =
        i.formattedValue ||
        this.data.textContent?.join(`
`) ||
        null;
      a && this.data.comb && (a = a.replaceAll(/\s+/g, ""));
      const o = { userValue: n, formattedValue: a, lastCommittedValue: null, commitKey: 1, focused: !1 };
      (this.data.multiLine
        ? ((s = document.createElement("textarea")),
          (s.textContent = a ?? n),
          this.data.doNotScroll && (s.style.overflowY = "hidden"))
        : ((s = document.createElement("input")),
          (s.type = this.data.password ? "password" : "text"),
          s.setAttribute("value", a ?? n),
          this.data.doNotScroll && (s.style.overflowX = "hidden")),
        this.data.hasOwnCanvas &&
          (this.container.classList.add("hasOwnCanvas"),
          t.has(e) && this.container.classList.add("sandboxModified")),
        Jt.add(s),
        (this.contentElement = s),
        s.setAttribute("data-element-id", e),
        (s.disabled = this.data.readOnly),
        (s.name = this.data.fieldName),
        (s.tabIndex = 0));
      const { datetimeFormat: l, datetimeType: h, timeStep: d } = this.data,
        u = !!h && this.enableScripting;
      (l && (s.title = l),
        this._setRequired(s, this.data.required),
        r && (s.maxLength = r),
        s.addEventListener("input", (p) => {
          (t.setValue(e, { value: p.target.value }),
            this.setPropertyOnSiblings(s, "value", p.target.value, "value"),
            (o.formattedValue = null));
        }),
        s.addEventListener("resetform", (p) => {
          const g = this.data.defaultFieldValue ?? "";
          ((s.value = o.userValue = g), (o.formattedValue = null));
        }));
      let f = (p) => {
        const { formattedValue: g } = o;
        (g != null && (p.target.value = g), (p.target.scrollLeft = 0));
      };
      if (this.enableScripting && this.hasJSActions) {
        (s.addEventListener("focus", (g) => {
          if (o.focused) return;
          const { target: m } = g;
          if ((u && ((m.type = h), d && (m.step = d)), o.userValue)) {
            const b = o.userValue;
            if (u)
              if (h === "time") {
                const y = new Date(b),
                  A = [y.getHours(), y.getMinutes(), y.getSeconds()];
                m.value = A.map((w) => w.toString().padStart(2, "0")).join(":");
              } else m.value = new Date(b - va).toISOString().split(h === "date" ? "T" : ".", 1)[0];
            else m.value = b;
          }
          ((o.lastCommittedValue = m.value),
            (o.commitKey = 1),
            this.data.actions?.has("Focus") || (o.focused = !0));
        }),
          s.addEventListener("updatefromsandbox", (g) => {
            this.container.classList.add("sandboxModified");
            const m = {
              value(b) {
                ((o.userValue = b.detail.value ?? ""),
                  u || t.setValue(e, { value: o.userValue.toString() }),
                  (b.target.value = o.userValue));
              },
              formattedValue(b) {
                const { formattedValue: y } = b.detail;
                ((o.formattedValue = y),
                  y != null && b.target !== document.activeElement && (b.target.value = y));
                const A = { formattedValue: y };
                (u && (A.value = y), t.setValue(e, A));
              },
              selRange(b) {
                b.target.setSelectionRange(...b.detail.selRange);
              },
              charLimit: (b) => {
                const { charLimit: y } = b.detail,
                  { target: A } = b;
                if (y === 0) {
                  A.removeAttribute("maxLength");
                  return;
                }
                A.setAttribute("maxLength", y);
                let w = o.userValue;
                !w ||
                  w.length <= y ||
                  ((w = w.slice(0, y)),
                  (A.value = o.userValue = w),
                  t.setValue(e, { value: w }),
                  this.linkService.eventBus?.dispatch("dispatcheventinsandbox", {
                    source: this,
                    detail: {
                      id: e,
                      name: "Keystroke",
                      value: w,
                      willCommit: !0,
                      commitKey: 1,
                      selStart: A.selectionStart,
                      selEnd: A.selectionEnd,
                    },
                  }));
              },
            };
            this._dispatchEventFromSandbox(m, g);
          }),
          s.addEventListener("keydown", (g) => {
            o.commitKey = 1;
            let m = -1;
            if (
              (g.key === "Escape"
                ? (m = 0)
                : g.key === "Enter" && !this.data.multiLine
                  ? (m = 2)
                  : g.key === "Tab" && (o.commitKey = 3),
              m === -1)
            )
              return;
            const { value: b } = g.target;
            o.lastCommittedValue !== b &&
              ((o.lastCommittedValue = b),
              (o.userValue = b),
              this.linkService.eventBus?.dispatch("dispatcheventinsandbox", {
                source: this,
                detail: {
                  id: e,
                  name: "Keystroke",
                  value: b,
                  willCommit: !0,
                  commitKey: m,
                  selStart: g.target.selectionStart,
                  selEnd: g.target.selectionEnd,
                },
              }));
          }));
        const p = f;
        ((f = null),
          s.addEventListener("blur", (g) => {
            if (!o.focused || !g.relatedTarget) return;
            this.data.actions?.has("Blur") || (o.focused = !1);
            const { target: m } = g;
            let { value: b } = m;
            if (u) {
              if (b && h === "time") {
                const y = b.split(":").map((A) => parseInt(A, 10));
                ((b = new Date(2e3, 0, 1, y[0], y[1], y[2] || 0).valueOf()), (m.step = ""));
              } else (b.includes("T") || (b = `${b}T00:00`), (b = new Date(b).valueOf()));
              m.type = "text";
            }
            ((o.userValue = b),
              o.lastCommittedValue !== b &&
                this.linkService.eventBus?.dispatch("dispatcheventinsandbox", {
                  source: this,
                  detail: {
                    id: e,
                    name: "Keystroke",
                    value: b,
                    willCommit: !0,
                    commitKey: o.commitKey,
                    selStart: g.target.selectionStart,
                    selEnd: g.target.selectionEnd,
                  },
                }),
              p(g));
          }),
          this.data.actions?.has("Keystroke") &&
            s.addEventListener("beforeinput", (g) => {
              o.lastCommittedValue = null;
              const { data: m, target: b } = g,
                { value: y, selectionStart: A, selectionEnd: w } = b;
              let v = A,
                S = w;
              switch (g.inputType) {
                case "deleteWordBackward": {
                  const x = /\w/;
                  for (; v > 0 && !x.test(y[v - 1]);) v--;
                  for (; v > 0 && x.test(y[v - 1]);) v--;
                  break;
                }
                case "deleteWordForward": {
                  const x = y.substring(A).match(/^\W*\w*/);
                  x && (S += x[0].length);
                  break;
                }
                case "deleteContentBackward":
                  A === w && (v -= 1);
                  break;
                case "deleteContentForward":
                  A === w && (S += 1);
                  break;
              }
              (g.preventDefault(),
                this.linkService.eventBus?.dispatch("dispatcheventinsandbox", {
                  source: this,
                  detail: {
                    id: e,
                    name: "Keystroke",
                    value: y,
                    change: m || "",
                    willCommit: !1,
                    selStart: v,
                    selEnd: S,
                  },
                }));
            }),
          this._setEventListeners(
            s,
            o,
            [
              ["focus", "Focus"],
              ["blur", "Blur"],
              ["mousedown", "Mouse Down"],
              ["mouseenter", "Mouse Enter"],
              ["mouseleave", "Mouse Exit"],
              ["mouseup", "Mouse Up"],
            ],
            (g) => g.target.value,
          ));
      }
      if ((f && s.addEventListener("blur", f), this.data.comb)) {
        const g = (this.data.rect[2] - this.data.rect[0]) / r;
        (s.classList.add("comb"),
          s.style.setProperty("--comb-width", `calc(${g}px * var(--total-scale-factor))`));
        const m = this.data.textAlignment;
        if (m === 1 || m === 2) {
          const b = () => {
            const y = r - s.value.length;
            s.style.setProperty("--comb-offset", `${m === 1 ? y >> 1 : y}`);
          };
          b();
          for (const y of ["input", "blur", "resetform", "updatefromsandbox"]) s.addEventListener(y, b);
        }
      }
    } else
      ((s = document.createElement("div")),
        (s.textContent = this.data.fieldValue),
        (s.style.verticalAlign = "middle"),
        (s.style.display = "table-cell"),
        this.data.hasOwnCanvas && (s.hidden = !0));
    return (
      this._setTextStyle(s),
      this._setBackgroundColor(s),
      this._setDefaultPropertiesFromJS(s),
      this.container.append(s),
      this.container
    );
  }
}