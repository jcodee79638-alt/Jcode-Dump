
function tl(e) {
  const [n, i] = S({ items: [] }),
    [s, l] = S(!1),
    [a, c] = S(!1),
    d = () => e.settings.collapsedProjects?.[e.project.id] === !0,
    f = () =>
      [...e.recent, ...n().items]
        .filter(
          (y, b, j) =>
            !y.parentId && j.findIndex((w) => w.id === y.id) === b && Ci(y, e.projects)?.id === e.project.id,
        )
        .sort((y, b) => b.updatedAt - y.updatedAt);
  let u = 0,
    h = !1;
  Me(() => {
    ((h = !0), u++);
  });
  async function m(y = !1) {
    const b = ++u;
    (l(!0), c(!1));
    try {
      const j = await window.jac.chats({
        directory: e.project.directory,
        search: e.search,
        archived: e.archived,
        ...(y ? { cursor: n().cursor } : {}),
      });
      if (b !== u || h) return;
      i((w) =>
        y
          ? {
              items: [...w.items, ...j.items.filter((L) => !w.items.some((O) => O.id === L.id))],
              cursor: j.cursor,
            }
          : j,
      );
    } catch {
      b === u && !h && c(!0);
    } finally {
      b === u && !h && l(!1);
    }
  }
  return (
    Ie(() => {
      (e.recent, e.search, e.archived, !e.settings.projectsCollapsed && !d() && m());
    }),
    (() => {
      var y = Gs(),
        b = y.firstChild,
        j = b.firstChild,
        w = j.nextSibling,
        L = w.firstChild,
        O = b.nextSibling,
        _ = O.firstChild;
      return (
        (j.$$click = () =>
          e.save({ collapsedProjects: { ...e.settings.collapsedProjects, [e.project.id]: !d() } })),
        t(j, r(Z, { name: "chevron", size: 13 })),
        (w.$$click = () => e.create(e.project)),
        t(w, r(Z, { name: "folder", size: 17 }), L),
        t(L, () => e.project.name),
        t(
          b,
          r(Xe, {
            class: "project-new",
            name: "plus",
            get label() {
              return `New chat in ${e.project.name}`;
            },
            onClick: () => e.create(e.project),
          }),
          null,
        ),
        t(
          _,
          r(_e, {
            get each() {
              return f();
            },
            get fallback() {
              return (() => {
                var R = Qs();
                return (
                  t(
                    R,
                    (() => {
                      var A = G(() => !!s());
                      return () => (A() ? "Loading chats…" : a() ? "Chats couldn’t load." : "No chats yet");
                    })(),
                  ),
                  R
                );
              })();
            },
            children: (R) =>
              r(Si, {
                chat: R,
                get active() {
                  return e.activeId === R.id;
                },
                open: () => e.open(R),
              }),
          }),
          null,
        ),
        t(
          _,
          r(g, {
            get when() {
              return a();
            },
            get children() {
              var R = Ks();
              return (
                (R.$$click = () => {
                  m();
                }),
                R
              );
            },
          }),
          null,
        ),
        t(
          _,
          r(g, {
            get when() {
              return n().cursor;
            },
            get children() {
              var R = Zs();
              return (
                (R.$$click = () => {
                  m(!0);
                }),
                t(R, () => (s() ? "Loading…" : "More project chats")),
                x(() => (R.disabled = s())),
                R
              );
            },
          }),
          null,
        ),
        x(
          (R) => {
            var A = e.directory === e.project.directory,
              J = `${d() ? "Expand" : "Collapse"} ${e.project.name}`,
              D = !d(),
              B = e.project.directory,
              H = !!d(),
              V = d(),
              E = s();
            return (
              A !== R.e && b.classList.toggle("selected", (R.e = A)),
              J !== R.t && z(j, "aria-label", (R.t = J)),
              D !== R.a && z(j, "aria-expanded", (R.a = D)),
              B !== R.o && z(w, "title", (R.o = B)),
              H !== R.i && O.classList.toggle("is-collapsed", (R.i = H)),
              V !== R.n && (O.inert = R.n = V),
              E !== R.s && z(_, "aria-busy", (R.s = E)),
              R
            );
          },
          { e: void 0, t: void 0, a: void 0, o: void 0, i: void 0, n: void 0, s: void 0 },
        ),
        y
      );
    })()
  );
}