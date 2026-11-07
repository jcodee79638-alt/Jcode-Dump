
function Ot(e) {
  return (
    typeof e === "string" &&
    !!e &&
    e.length <= 512 &&
    !/[\\:<>"|?*\x00-\x1f]/.test(e) &&
    !W.default.isAbsolute(e) &&
    e
      .split("/")
      .every(
        (t) =>
          !!t &&
          t !== "." &&
          t !== ".." &&
          !/[. ]$/.test(t) &&
          !/^(?:con|prn|aux|nul|com[1-9]|lpt[1-9])(?:\.|$)/i.test(t),
      )
  );
}