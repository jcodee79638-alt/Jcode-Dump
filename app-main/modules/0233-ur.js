
function ur(e) {
  if ((clearTimeout(cr), !P.app.isPackaged || ge)) return;
  ((ei = e ? Math.min(ei + 1, 3) : 0),
    (cr = setTimeout(
      () => {
        if (!Qe) {
          _o();
          return;
        }
        if (ve.status === "available" || Re || Te) {
          ur(!1);
          return;
        }
        Kt.checkUpdate().then((t) => ur(t.status === "error"));
      },
      900000 * 2 ** Math.max(0, ei - 1) + Math.random() * 90000,
    )));
}