
function Ro() {
  if (Re || Te || ge || ve.status === "ready") return Promise.resolve(ve);
  return (yo ??= A.call("checkUpdate")
    .then((e) => (ve = e))
    .catch(
      () => (
        de({
          type: "update",
          update: {
            status: "error",
            current: kt,
            message: "Jac Code could not verify its latest update. Check your connection and try again.",
          },
        }),
        ve
      ),
    )
    .finally(() => {
      yo = void 0;
    }));
}