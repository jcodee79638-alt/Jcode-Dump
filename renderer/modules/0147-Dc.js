
function Dc(e) {
  const [n, i] = S([]),
    [s, l] = S(!1),
    [a, c] = S("");
  let d = 0;
  return (
    Ie(() => {
      const f = e.sessionId,
        u = e.directory;
      let h = !1;
      const m = () => {
        const b = ++d;
        (l(!0),
          c(""),
          window.jac
            .chatAttachmentReferences({ id: f, directory: u })
            .then((j) => {
              !h && b === d && i(j.slice(0, 100));
            })
            .catch(() => {
              !h && b === d && (i([]), c("Saved attachment originals could not be loaded."));
            })
            .finally(() => {
              !h && b === d && l(!1);
            }));
      };
      (i([]), m());
      const y = window.jac.subscribe((b) => {
        ((b.type === "message" && b.sessionId === f && b.message.role === "user") ||
          (b.type === "refresh" && (!b.sessionId || b.sessionId === f))) &&
          m();
      });
      Me(() => {
        ((h = !0), d++, y());
      });
    }),
    (() => {
      var f = Mc();
      return (
        f.firstChild,
        t(
          f,
          r(g, {
            get when() {
              return s();
            },
            get children() {
              return qc();
            },
          }),
          null,
        ),
        t(
          f,
          r(g, {
            get when() {
              return a();
            },
            get children() {
              var u = Pi();
              return (t(u, a), u);
            },
          }),
          null,
        ),
        t(
          f,
          r(g, {
            get when() {
              return G(() => !s() && !n().length)() && !a();
            },
            get children() {
              return Lc();
            },
          }),
          null,
        ),
        t(
          f,
          r(_e, {
            get each() {
              return n();
            },
            children: (u) =>
              r(Ri, {
                get attachment() {
                  return { id: u.attachmentId, filename: u.filename, mime: "text/plain", size: 0 };
                },
                get onReference() {
                  return e.draft;
                },
              }),
          }),
          null,
        ),
        f
      );
    })()
  );
}
Oe(["click"]);