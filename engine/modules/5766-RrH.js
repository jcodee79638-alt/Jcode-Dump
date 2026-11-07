
var RrH,
  zZi,
  wCr = (e = "") =>
    `default-src 'self'; script-src 'self' 'wasm-unsafe-eval'${e ? ` 'sha256-${e}'` : ""}; style-src 'self' 'unsafe-inline'; img-src 'self' data: https: blob:; font-src 'self' data:; media-src 'self' data:; connect-src * data: blob:`,
  JCA;