
function Qa(e) {
  const n = Pe(() => xi(e.state, e.thinking, e.stopped)),
    i = () => n() === "permission" || n() === "question" || n() === "capacity",
    s = () =>
      n() === "reconnecting"
        ? "Reconnecting"
        : n() === "responding"
          ? "Responding"
          : n() === "thinking"
            ? "Thinking"
            : "Working",
    l = () => (e.thinking === "xhigh" ? "XHigh" : e.thinking === "high" ? "High" : "Low");
  return r(g, {
    get when() {
      return G(() => n() !== "hidden")() && (e.compact || (n() !== "tool" && n() !== "responding"));
    },
    get children() {
      return r(g, {
        get when() {
          return i();
        },
        get fallback() {
          return (() => {
            var a = Ga(),
              c = a.firstChild,
              d = c.nextSibling,
              f = d.firstChild;
            return (
              t(f, s),
              t(
                d,
                r(g, {
                  get when() {
                    return n() === "thinking";
                  },
                  get children() {
                    var u = Za();
                    return (t(u, l), x(() => z(u, "aria-label", `Thinking effort: ${l()}`)), u);
                  },
                }),
                null,
              ),
              x(() => z(a, "data-activity", n())),
              a
            );
          })();
        },
        get children() {
          var a = Ka(),
            c = a.firstChild;
          return (
            t(
              a,
              r(Z, {
                get name() {
                  return G(() => n() === "permission")() ? "shield" : n() === "capacity" ? "history" : "chat";
                },
                size: 16,
              }),
              c,
            ),
            t(
              c,
              (() => {
                var d = G(() => n() === "permission");
                return () =>
                  d()
                    ? "Waiting for permission"
                    : G(() => n() === "capacity")()
                      ? G(() => !!e.state.queuePosition)()
                        ? "Position " + e.state.queuePosition + " in queue"
                        : "Waiting for an available slot"
                      : "Waiting for your answer";
              })(),
            ),
            a
          );
        },
      });
    },
  });
}