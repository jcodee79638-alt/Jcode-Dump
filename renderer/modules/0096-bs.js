
function bs(e) {
  const n = Pe(() => Xa(e.state.messages)),
    i = Pe(() => n().map((s) => s.id));
  return r(_e, {
    get each() {
      return i();
    },
    children: (s) =>
      r(ws, {
        get turn() {
          return n().find((l) => l.id === s);
        },
        get state() {
          return e.state;
        },
        get thinking() {
          return e.thinking;
        },
        get current() {
          return s === i().at(-1);
        },
        get stopped() {
          return e.stopped;
        },
        get openChild() {
          return e.openChild;
        },
        get expanded() {
          return e.expanded;
        },
        get setExpanded() {
          return e.setExpanded;
        },
      }),
  });
}