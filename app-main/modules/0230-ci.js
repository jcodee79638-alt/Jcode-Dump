
async function ci() {
  if (ge || lt || dt || Oe.size || Y.size || Re || Te || Se > 0)
    throw Error("Wait for the current work to finish before installing an update.");
  Re = !0;
  try {
    if ((await A.activity()).busy)
      throw Error("Wait for the current work to finish before installing an update.");
    if (ve.status === "ready") return (await Vt(!0), ve);
    let e = await lr()
      .then(() => A.call("installUpdate", {}, 900000))
      .catch(() => {
        let t = {
          status: "error",
          current: kt,
          message:
            "The update could not finish. Your installation and saved work are kept. Check for updates to retry.",
        };
        return (de({ type: "update", update: t }), t);
      });
    if (e.status === "ready") await Vt(!0);
    return e;
  } finally {
    Re = !1;
  }
}