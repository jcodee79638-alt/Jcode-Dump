
function ji(e) {
  const [n, i] = S(!1),
    s = () => /\.html?$/i.test(e.diff.path) && e.diff.before !== void 0 && e.diff.after !== void 0,
    l = (a) => {
      const c = document.createElement("template");
      return (
        (c.innerHTML = a),
        c.content
          .querySelectorAll("script,meta,base,link,iframe,frame,object,embed,portal")
          .forEach((d) => d.remove()),
        c.content.querySelectorAll("*").forEach((d) => {
          Array.from(d.attributes)
            .filter(
              (f) =>
                ["href", "action", "formaction", "srcset", "ping"].includes(f.localName) ||
                f.name.startsWith("on") ||
                (["src", "poster"].includes(f.name) && !f.value.startsWith("data:")),
            )
            .forEach((f) => d.removeAttribute(f.name));
        }),
        `<!doctype html><meta charset="utf-8"><meta http-equiv="Content-Security-Policy" content="${dl}"><meta name="referrer" content="no-referrer">${c.innerHTML}`
      );
    };
  return [
    r(g, {
      get when() {
        return s();
      },
      get children() {
        var a = al(),
          c = a.firstChild,
          d = c.firstChild,
          f = d.nextSibling;
        return (
          (d.$$click = () => i(!1)),
          t(d, r(Z, { name: "code", size: 15 }), null),
          t(d, () => $.code, null),
          (f.$$click = () => i(!0)),
          t(f, r(Z, { name: "eye", size: 15 }), null),
          t(f, () => $.visual, null),
          t(
            a,
            r(g, {
              get when() {
                return n();
              },
              get children() {
                var u = il();
                return (t(u, () => $.visualDetail), u);
              },
            }),
            null,
          ),
          x(
            (u) => {
              var h = !n(),
                m = !n(),
                y = !!n(),
                b = n();
              return (
                h !== u.e && d.classList.toggle("selected", (u.e = h)),
                m !== u.t && z(d, "aria-pressed", (u.t = m)),
                y !== u.a && f.classList.toggle("selected", (u.a = y)),
                b !== u.o && z(f, "aria-pressed", (u.o = b)),
                u
              );
            },
            { e: void 0, t: void 0, a: void 0, o: void 0 },
          ),
          a
        );
      },
    }),
    r(g, {
      get when() {
        return G(() => !!n())() && s();
      },
      get fallback() {
        return (() => {
          var a = ll();
          return (
            t(
              a,
              r(_e, {
                get each() {
                  return _s(e.diff.patch);
                },
                get fallback() {
                  return (() => {
                    var c = ol();
                    return (t(c, () => $.noPatch), c);
                  })();
                },
                children: (c) =>
                  (() => {
                    var d = cl(),
                      f = d.firstChild,
                      u = f.nextSibling,
                      h = u.nextSibling;
                    return (
                      t(f, () => c.before),
                      t(u, () => c.after),
                      t(h, () => c.text),
                      x(() => Be(d, `diff-line ${c.kind}`)),
                      d
                    );
                  })(),
              }),
            ),
            a
          );
        })();
      },
      get children() {
        var a = sl(),
          c = a.firstChild,
          d = c.firstChild,
          f = d.nextSibling,
          u = c.nextSibling,
          h = u.firstChild,
          m = h.nextSibling;
        return (
          t(d, () => $.before),
          t(h, () => $.after),
          x(
            (y) => {
              var b = $.before,
                j = l(e.diff.before),
                w = $.after,
                L = l(e.diff.after);
              return (
                b !== y.e && z(f, "title", (y.e = b)),
                j !== y.t && z(f, "srcdoc", (y.t = j)),
                w !== y.a && z(m, "title", (y.a = w)),
                L !== y.o && z(m, "srcdoc", (y.o = L)),
                y
              );
            },
            { e: void 0, t: void 0, a: void 0, o: void 0 },
          ),
          a
        );
      },
    }),
  ];
}
Oe(["click"]);