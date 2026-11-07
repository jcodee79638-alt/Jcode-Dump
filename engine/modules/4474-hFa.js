
function hFa(e) {
  let t = e?.provider;
  return DRi({
    title: "Authorization successful",
    body: IRi({
      status: "success",
      headline: "Authorization successful",
      message: t ? `OpenCode is now connected to ${lPe(t)}.` : "OpenCode is now authorized.",
      footnote: "You can close this window.",
    }),
    script: e?.autoClose === !1 ? void 0 : LFa,
  });
}