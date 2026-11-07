
function Zbt(e, t) {
  let r = t?.provider;
  return DRi({
    title: "Authorization failed",
    body: IRi({
      status: "error",
      headline: "Authorization failed",
      message: r
        ? `OpenCode couldn't finish connecting to ${lPe(r)}.`
        : "OpenCode couldn't complete authorization.",
      detail: e,
      footnote: "Close this window and try again from OpenCode.",
    }),
  });
}