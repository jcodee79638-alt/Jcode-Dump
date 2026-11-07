
async function za(e) {
  if (Date.now() > ar || e.length > 8000) return;
  let t = new URL(e);
  if (
    t.username ||
    t.password ||
    t.hash ||
    (t.protocol !== "https:" &&
      !(t.protocol === "http:" && ["localhost", "127.0.0.1", "[::1]"].includes(t.hostname)))
  )
    return;
  if (
    (
      await P.dialog.showMessageBox(R, {
        type: "question",
        buttons: ["Cancel", "Open sign-in"],
        defaultId: 0,
        cancelId: 0,
        message: `Sign in to ${t.hostname}?`,
        detail:
          "This MCP server requested authorization in your browser. Only continue if you trust this service and the access it requests.",
      })
    ).response === 1 &&
    Date.now() <= ar
  )
    await P.shell.openExternal(t.href);
}