
const Mn = (e) =>
  e < 1024
    ? `${e} B`
    : e < 1024 * 1024
      ? `${(e / 1024).toFixed(1)} KiB`
      : `${(e / 1024 / 1024).toFixed(1)} MiB`;