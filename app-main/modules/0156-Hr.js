
function Hr(e) {
  return (
    Array.isArray(e) &&
    e.length > 0 &&
    e.length <= 32 &&
    e.every(
      (t) =>
        typeof t === "string" &&
        t.length > 0 &&
        t.length <= 2048 &&
        !ua.test(t) &&
        !/(?:^|[=\\/])\.\.(?:[\\/]|$)/.test(t),
    ) &&
    e.join("").length <= 8192 &&
    !/\.(?:cmd|bat)$/i.test(e[0]) &&
    !Js.test(L.default.basename(e[0]))
  );
}