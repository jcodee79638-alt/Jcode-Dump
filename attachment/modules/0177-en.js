
function en({ responseHeaders: c, isHttp: t, rangeChunkSize: e, disableRange: s }) {
  const i = { contentLength: 0, isRangeSupported: !1 },
    n = parseInt(c.get("Content-Length"), 10);
  return (
    !Number.isInteger(n) ||
      ((i.contentLength = n), n <= 2 * e) ||
      s ||
      !t ||
      c.get("Accept-Ranges") !== "bytes" ||
      ((c.get("Content-Encoding") || "identity") === "identity" && (i.isRangeSupported = !0)),
    i
  );
}